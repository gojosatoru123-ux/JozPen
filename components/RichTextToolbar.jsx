import { useCallback, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    Quote,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
    Unlink,
    Table,
    Table2,
    Columns3,
    Highlighter,
    AlignJustify,
    Trash,
    Plus,
    Minus,
    Merge,
    Grid2X2Plus,
    Grid2X2X,
    TableCellsMerge,
    TableCellsSplit,
    MoveLeft,
    MoveRight,
    Bolt,
    BetweenVerticalStart,
    BetweenVerticalEnd,
    BetweenHorizonalStart,
    BetweenHorizonalEnd,
    TableColumnsSplit,
    TableRowsSplit,
    Rows3,
    Square,
    Image,
    Calendar, // Added for timeline button
} from "lucide-react";

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    label,
    show = false
}) => (
    <div className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-gray-100 rounded-md transition-all duration-150">
        <button
            onClick={onClick}
            title={label}
            className={`p-2 rounded-md flex items-center justify-center w-9 h-9 ${
                isActive ? "bg-blue-100 text-blue-600 border border-blue-300" : "bg-white text-gray-600 border border-gray-200"
            } hover:bg-blue-50 hover:text-blue-500 transition-all duration-150`}
        >
            {Icon && <Icon size={16} />}
        </button>
        {show && <span className="text-sm text-gray-700 font-medium">{label}</span>}
    </div>
);

const Dropdown = ({
    labelIcon,
    labelText,
    children,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative w-full">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 p-2 w-full rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-all duration-150"
            >
                {labelIcon}
                <span className="text-sm font-medium">{labelText}</span>
                <ChevronDown size={16} className={`ml-auto transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-gray-200 rounded-md shadow-md z-20 p-2 flex flex-col gap-1 animate-slide-down">
                    {children}
                </div>
            )}
        </div>
    );
};

const RichTextToolbar = ({ editor }) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl);

        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        try {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        } catch (e) {
            alert(e.message);
        }
    }, [editor]);

    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file || !editor) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            if (typeof base64 === "string") {
                editor.chain().focus().setImage({ src: base64 }).run();
            }
        };
        reader.readAsDataURL(file);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    // New function to insert a timeline block
    const insertTimelineBlock = useCallback(() => {
        const timelineBlock = `
            <div class='timeline-block'>

            </div>
        `;
        editor.chain().focus().insertContent(timelineBlock).run();
    }, [editor]);

    if (!editor) return null;

    const headingIcons = {
        1: Heading1,
        2: Heading2,
        3: Heading3,
        4: Heading4,
        5: Heading5,
        6: Heading6,
    };

    const highlightColors = [
        { color: "#fef08a", label: "Yellow" },
        { color: "#a7f3d0", label: "Green" },
        { color: "#bfdbfe", label: "Blue" },
        { color: "#f3e8ff", label: "Purple" },
        { color: "#fecaca", label: "Red" },
        { color: "#fed7aa", label: "Orange" },
    ];

    return (
        <div
            className="fixed top-16 left-4 w-[200px] h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col gap-3 overflow-y-auto z-20 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50"
        >
            <style>{`
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-down {
                    animation: slide-down 0.2s ease-out;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 10px;
                }
                .scrollbar-track-gray-50::-webkit-scrollbar-track {
                    background: #f9fafb;
                }
            `}</style>

            {/* Format Dropdown */}
            <Dropdown labelIcon={<Bold size={16} />} labelText="Format">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} icon={Bold} label="Bold" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} icon={Italic} label="Italic" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} icon={Underline} label="Underline" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} icon={Strikethrough} label="Strikethrough" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("code")} icon={Code} label="Code" show={true} />
            </Dropdown>

            {/* Headings Dropdown */}
            <Dropdown labelIcon={<Heading2 size={16} />} labelText="Headings">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                    <ToolbarButton
                        key={level}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        isActive={editor.isActive("heading", { level })}
                        icon={headingIcons[level]}
                        label={`Heading ${level}`}
                        show={true}
                    />
                ))}
            </Dropdown>

            {/* Highlight Dropdown */}
            <Dropdown labelIcon={<Highlighter size={16} />} labelText="Highlight">
                <div className="grid grid-cols-3 gap-2 p-1">
                    {highlightColors.map(({ color, label }) => (
                        <button
                            key={color}
                            onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                            title={label}
                            className="w-7 h-7 rounded-md border transition-all duration-150 hover:scale-105"
                            style={{
                                backgroundColor: color,
                                border: editor.isActive("highlight", { color }) ? "2px solid #3b82f6" : "1px solid #d1d5db",
                            }}
                        />
                    ))}
                </div>
            </Dropdown>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Alignment */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Alignment</span>
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} icon={AlignLeft} label="Align Left" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} icon={AlignCenter} label="Align Center" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} icon={AlignRight} label="Align Right" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} icon={AlignJustify} label="Justify" show={true} />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Lists */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Lists</span>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} icon={List} label="Bullet List" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} icon={ListOrdered} label="Numbered List" show={true} />
            </div>

            {/* Quote + Sup/Sub */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Text Styles</span>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} icon={Quote} label="Blockquote" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive("subscript")} icon={Subscript} label="Subscript" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive("superscript")} icon={Superscript} label="Superscript" show={true} />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Links</span>
                <ToolbarButton
                    onClick={setLink}
                    isActive={editor.isActive("link")}
                    icon={Link}
                    label="Add Link"
                    show={true}
                />
                <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} icon={Unlink} label="Remove Link" show={true} />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Tables */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Tables</span>
                <ToolbarButton
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    icon={Table}
                    label="Insert Table"
                    show={true}
                />
                <Dropdown labelIcon={<Grid2X2Plus size={16} />} labelText="Add Rows/Cols">
                    <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} icon={BetweenVerticalStart} label="Add Column Before" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} icon={BetweenVerticalEnd} label="Add Column After" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} icon={BetweenHorizonalStart} label="Add Row Before" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} icon={BetweenHorizonalEnd} label="Add Row After" show={true} />
                </Dropdown>
                <Dropdown labelIcon={<Grid2X2X size={16} />} labelText="Remove Rows/Cols">
                    <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()} icon={TableColumnsSplit} label="Delete Column" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} icon={Trash} label="Delete Row" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} icon={TableRowsSplit} label="Delete Table" show={true} />
                </Dropdown>
                <Dropdown labelIcon={<Merge size={16} />} labelText="Table Options">
                    <ToolbarButton onClick={() => editor.chain().focus().mergeCells().run()} icon={TableCellsMerge} label="Merge Cells" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().splitCell().run()} icon={TableCellsSplit} label="Split Cell" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderColumn().run()} icon={Columns3} label="Toggle Header Column" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderRow().run()} icon={Rows3} label="Toggle Header Row" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderCell().run()} icon={Table2} label="Toggle Header Cell" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().mergeOrSplit().run()} icon={Merge} label="Merge or Split" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().setCellAttribute("colspan", 2).run()} icon={Square} label="Set Colspan" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().fixTables().run()} icon={Bolt} label="Fix Tables" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().goToNextCell().run()} icon={MoveRight} label="Next Cell" show={true} />
                    <ToolbarButton onClick={() => editor.chain().focus().goToPreviousCell().run()} icon={MoveLeft} label="Previous Cell" show={true} />
                </Dropdown>
            </div>

            {/* Timeline Block Button */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Timeline</span>
                <ToolbarButton
                    onClick={()=>editor.chain().focus().insertTimeline().run()}
                    isActive={false} // Timeline block doesn't have an active state
                    icon={Calendar}
                    label="Add Timeline Event"
                    show={true}
                />
            </div>
            {/* <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-semibold px-2">Timeline entry</span>
                <ToolbarButton
                    onClick={()=>editor.chain().focus().addTimelineEntry().run()}
                    isActive={false} // Timeline block doesn't have an active state
                    icon={Calendar}
                    label="Add Timeline Entry"
                    show={true}
                />
            </div> */}

            {/* Image Upload */}
            <button
                onClick={triggerFileSelect}
                className="flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-150"
            >
                <Image size={16} className="mr-2" />
                <span className="text-sm font-medium">Upload Image</span>
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>
    );
};

export default RichTextToolbar;