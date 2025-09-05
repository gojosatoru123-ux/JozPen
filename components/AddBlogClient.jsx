'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { useEditor, EditorContent } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

import Highlight from "@tiptap/extension-highlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import RichTextToolbar from '@/components/RichTextToolbar';
import Loader from './Loader';
import MessageSlab from './MessageSlab';

const lowlight = createLowlight(common);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const AddBlogClient = ({ session, initialContent = null, isUpdate = false }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [content, setContent] = useState(initialContent ? initialContent.blogs.content : '');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null)
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Heading,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Blockquote,
            BulletList,
            ListItem,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            CodeBlock,
            HorizontalRule,
            OrderedList,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Bold,
            Italic,
            Underline,
            Strike,
            Subscript,
            Superscript,
            Highlight.configure({ multicolor: true }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
                protocols: ["http", "https"],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(":")
                            ? new URL(url)
                            : new URL(`${ctx.defaultProtocol}://${url}`);

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false;
                        }

                        // disallowed protocols
                        const disallowedProtocols = ["ftp", "file", "mailto"];
                        const protocol = parsedUrl.protocol.replace(":", "");

                        if (disallowedProtocols.includes(protocol)) {
                            return false;
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map((p) =>
                            typeof p === "string" ? p : p.scheme,
                        );

                        if (!allowedProtocols.includes(protocol)) {
                            return false;
                        }

                        // disallowed domains
                        const disallowedDomains = [
                            "example-phishing.com",
                            "malicious-site.net",
                        ];
                        const domain = parsedUrl.hostname;

                        if (disallowedDomains.includes(domain)) {
                            return false;
                        }

                        // all checks have passed
                        return true;
                    } catch {
                        return false;
                    }
                },
                shouldAutoLink: (url) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(":")
                            ? new URL(url)
                            : new URL(`https://${url}`);

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = [
                            "example-no-autolink.com",
                            "another-no-autolink.com",
                        ];
                        const domain = parsedUrl.hostname;

                        return !disallowedDomains.includes(domain);
                    } catch {
                        return false;
                    }
                },
            }),
            Image,
            Dropcursor,
        ],
        content: initialContent ? initialContent.blogs.content : '',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            handleKeyDown(view, event) {
                const isCtrlOrCmd = event.metaKey || event.ctrlKey;

                if (event.key === "ArrowDown" && isCtrlOrCmd) {
                    view.dom.dataset.forceShow = "true"; // set custom flag on editor DOM
                    setShow(true);
                    return true;
                }

                return false;
            },

            handleDOMEvents: {
                mouseup(view) {
                    // Prevent flicker caused by mouseup after Cmd+ArrowDown
                    if (view.dom.dataset.forceShow === "true") {
                        view.dom.dataset.forceShow = "false";
                        return false;
                    }

                    const isTextSelected = !view.state.selection.empty;
                    setShow(isTextSelected);
                    return false;
                },

                keyup(view) {
                    // Prevent flicker caused by keyup after Cmd+ArrowDown
                    if (view.dom.dataset.forceShow === "true") {
                        view.dom.dataset.forceShow = "false";
                        return false;
                    }

                    const isTextSelected = !view.state.selection.empty;
                    setShow(isTextSelected);
                    return false;
                },
            }
        }

    });

    const handleSubmit = async (e) => {
        try {
            if (uploading) return;
            setUploading(true);
            setLoading(true);
            setError(null);
            e.preventDefault();
            const form = new FormData(e.target);
            form.append('content', content);
            if (thumbnail) form.append('thumbnail', thumbnail);
            let res;

            if (isUpdate) {
                res = await fetch(`/api/blog/update?id=${initialContent.blogs.id}`, {
                    method: 'PUT',
                    body: form,
                });
            } else {
                res = await fetch('/api/blog/add', {
                    method: 'POST',
                    body: form,
                });
            }


            const result = await res.json();
            if (result.success) {
                setError({ message: "Knowledge Added Successfully", type: 'success', url: `/profile/${session?.id}` });
            } else {
                setError({ message: result.error, type: 'error', url: null });
            }
        }
        catch (error) {
            setError({ message: error.message, type: 'error', url: null });
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    if (!editor) {
        return <p>Loading editor...</p>;
    }

    return (
        <>
            {show && <RichTextToolbar editor={editor} />}
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}

            <form onSubmit={handleSubmit} className="blog-form p-4">
                {isUpdate && <h2 className='tag flex justify-center'>Update Article</h2>}
                <label htmlFor="title" className="blog-form_label">Title</label>
                <Input name="title" id="title" placeholder="Title" defaultValue={initialContent ? initialContent.blogs.title : null} className="blog-form_input" required />

                <label htmlFor="slug" className="blog-form_label">Slug</label>
                <Input name="slug" id="slug" placeholder="Slug" defaultValue={initialContent ? initialContent.blogs.slug : null} className="blog-form_input" required />

                <label htmlFor="excerpt" className="blog-form_label">Excerpt</label>
                <Textarea name="excerpt" id="excerpt" defaultValue={initialContent ? initialContent.blogs.excerpt : null} placeholder="Excerpt" className="blog-form_textarea" />

                <div data-color-mode="light">
                    <label htmlFor="content" className="blog-form_label">
                        Content
                    </label>
                    <p className='text-gray-400'>ctrl+ArrowDown or select text to format</p>
                    <EditorContent
                        editor={editor}
                        className="min-h-[360px] border-2 p-2 rounded blog-form_editor tiptap"
                    />
                </div>

                <label htmlFor="tags" className="blog-form_label">Tags</label>
                <Input name="tags" id="tags" placeholder="Tags (comma-separated)" defaultValue={initialContent ? initialContent.blogs.tags : null} className="blog-form_input" />

                <label htmlFor="categories" className="blog-form_label">Categories</label>
                <select name="categories"
                    id="categories"
                    defaultValue={initialContent ? initialContent.blogs.categories : ""}
                    className="border-[3px] border-black px-5 py-5 text-[18px] w-full rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                    <option value="" disabled>
                        -- Select an option --
                    </option>
                    <option value="Literature">Literature</option>
                    <option value="Technology">Technology</option>
                    <option value="Science">Science</option>
                    <option value="Programming">Programming</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Lifestyle">LifeStyle</option>
                    <option value="Business">Business</option>
                </select>

                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="thumbnail-upload" className="blog-form_label">
                        Upload Thumbnail
                    </label>

                    <input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    />

                    <label
                        htmlFor="thumbnail-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"
                            />
                        </svg>
                        Choose Image
                    </label>
                    <p className='text-gray-400'>Max File Size 4 MB-jpeg, png, gif allowed only</p>
                </div>

                <img src={thumbnail ? URL.createObjectURL(thumbnail) : initialContent ? initialContent.blogs.thumbnailUrl : null} alt="Thumbnail" className="object-cover rounded my-2 p-4 w-40 h-40" />

                <Button type="submit" className="blog-form_btn cursor-pointer my-4">{isUpdate?"Update Blog":"Submit Blog"}</Button>
            </form>

            {loading && <Loader />}
        </>
    );
}


export default AddBlogClient;