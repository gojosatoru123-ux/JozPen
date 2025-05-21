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
    const [content, setContent] = useState('');
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
                if (event.key === "ArrowDown") {
                    setShow(!show);
                    return true;
                } else {
                    setShow(false);
                }
                return false;
            },
        },
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

            if(isUpdate){
                res = await fetch(`/api/blog/update?id=${initialContent.blogs.id}`, {
                    method: 'PUT',
                    body: form,
                });
            }else{
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
                    <EditorContent
                        editor={editor}
                        className="min-h-[360px] border-2 p-2 rounded blog-form_editor tiptap"
                    />
                </div>

                <label htmlFor="tags" className="blog-form_label">Tags</label>
                <Input name="tags" id="tags" placeholder="Tags (comma-separated)" defaultValue={initialContent ? initialContent.blogs.tags : null} className="blog-form_input" />

                <label htmlFor="categories" className="blog-form_label">Categories</label>
                <Input name="categories" id="categories" placeholder="Categories" defaultValue={initialContent ? initialContent.blogs.categories : null} className="blog-form_input" />

                <label className="blog-form_label">Thumbnail Image:
                    <Input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
                </label>
                <img src={thumbnail ? URL.createObjectURL(thumbnail) : initialContent ? initialContent.blogs.thumbnailUrl : null} alt="Thumbnail" className="object-cover rounded my-2 p-4 w-40 h-40" />

                <Button type="submit" className="blog-form_btn my-4">Submit Blog</Button>
            </form>

            {loading && <Loader />}
        </>
    );
}


export default AddBlogClient;