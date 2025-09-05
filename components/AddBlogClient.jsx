'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

import { EditorContent, useEditor } from "@tiptap/react";

import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

import RichTextToolbar from '@/components/RichTextToolbar';
import Highlight from "@tiptap/extension-highlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
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
            // if (thumbnail) form.append('thumbnail', thumbnail);
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

        <form
        onSubmit={handleSubmit}
        className="blog-form bg-white dark:bg-black shadow-2xl rounded-2xl p-6 sm:p-8 space-y-8 max-w-4xl mx-auto"
        >
        {/* Form Header */}
        <div className="text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
            {isUpdate ? 'Update Article' : 'Create a New Article'}
            </h1>
            <p className="mt-2 text-lg text-gray-800 dark:text-gray-700">
            Fill out the details below to {isUpdate ? 'update your' : 'publish a new'} article.
            </p>
        </div>

        {/* Section 1: Core Information */}
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div>
                <label htmlFor="title" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Title
                </label>
                <Input
                name="title"
                id="title"
                placeholder="e.g., The Future of AI"
                defaultValue={initialContent?.blogs.title}
                className="form-input"
                required
                />
            </div>

            {/* Slug Input */}
            <div>
                <label htmlFor="slug" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Slug
                </label>
                <Input
                name="slug"
                id="slug"
                placeholder="e.g., the-future-of-ai"
                defaultValue={initialContent?.blogs.slug}
                className="form-input"
                required
                />
            </div>
            </div>

            {/* Excerpt Textarea */}
            <div>
            <label htmlFor="excerpt" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Excerpt
            </label>
            <Textarea
                name="excerpt"
                id="excerpt"
                defaultValue={initialContent?.blogs.excerpt}
                placeholder="A short summary of the article..."
                className="form-textarea"
                rows={3}
            />
            </div>

            {/* Expiration Date */}
            <div>
            <label htmlFor="expireAt" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Expiration Date (Optional)
            </label>
            <input
                type="datetime-local"
                name="expireAt"
                id="expireAt"
                defaultValue={initialContent?.blogs.expireAt ? new Date(initialContent.blogs.expireAt).toISOString().slice(0, 16) : ''}
                className="form-input"
            />  
            </div>
        </div>

        {/* Section 2: Content Editor */}
        <div data-color-mode="light">
            <label htmlFor="content" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
            Content
            </label>
            <p className="text-xs text-gray-800 mb-2">Tip: Select text to see formatting options.</p>
            <div className="prose dark:prose-invert max-w-none">
            <EditorContent
                editor={editor}
                className="min-h-[360px] p-4 tiptap blog-form_editor"
            />
            </div>
        </div>

        {/* Section 3: Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tags Input */}
            <div>
            <label htmlFor="tags" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Tags
            </label>
            <Input
                name="tags"
                id="tags"
                placeholder="react, tailwind, webdev"
                defaultValue={initialContent?.blogs.tags}
                className="form-input"
            />
            <p className="text-xs text-gray-800 mt-1">Comma-separated values.</p>
            </div>

            {/* Categories Select */}
            <div>
            <label htmlFor="categories" className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Category
            </label>
            <select
                name="categories"
                id="categories"
                defaultValue={initialContent?.blogs.categories || ""}
                className="form-select dark:text-gray-600 mb-2"
            >
                <option value="" disabled>-- Select a category --</option>
                <option value="Literature">Literature</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Programming">Programming</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
            </select>
            </div>
        </div>

        {/* Section 4: Thumbnail Upload */}
        <div>
            <label className="block text-md font-medium text-black dark:text-gray-600 mb-2">
                Thumbnail Image
            </label>
            <div className="mt-2 flex items-center gap-x-4">
                <img 
                src={thumbnail ? thumbnail : initialContent ? initialContent.blogs.thumbnailUrl : null} 
                alt="Thumbnail Preview" 
                className="h-24 w-24 rounded-lg object-cover dark:text-gray-600 border border-gray-300 dark:border-gray-800"
                />
                <div className="flex-grow">
                <label htmlFor="thumbnail-url" className="sr-only">Thumbnail URL</label>
                <Input 
                    name="thumbnail-upload"
                    id="thumbnail-upload"
                    placeholder="https://example.com/image.png"
                    defaultValue={initialContent?.blogs.thumbnailUrl}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="form-input"
                />
                <p className="text-xs text-gray-800 mt-1">Paste a URL for the article's thumbnail.</p>
                </div>
            </div>
        </div>

        {/* Form Submission */}
        <div className="pt-6 border-t border-gray-300 dark:border-gray-800 flex justify-end">
            <Button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out cursor-pointer"
            >
            {isUpdate ? 'Update Article' : 'Publish Article'}
            </Button>
        </div>
        </form>

            {loading && <Loader />}
        </>
    );
}


export default AddBlogClient;