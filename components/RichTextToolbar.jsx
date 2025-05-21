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
} from "lucide-react";

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    label,
    show = false
}) => (
    <span className="flex items-center gap-2">
        <button
            onClick={onClick}
            title={label}
            style={{
                backgroundColor: isActive ? "#EE2B69" : "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
            }}
        >
            {Icon && <Icon size={16} />}
        </button>
        {show && label}
    </span>
);

const Dropdown = ({
    labelIcon,
    children,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ position: "relative" }}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    width: "auto",
                }}
            >
                {labelIcon}
                <ChevronDown size={16} />
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "110%",
                        left: 0,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        padding: "8px",
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

const RichTextToolbar = ({ editor }) => {



    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        try {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
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
        { color: "#ffc078", label: "Orange" },
        { color: "#8ce99a", label: "Green" },
        { color: "#74c0fc", label: "Blue" },
        { color: "#b197fc", label: "Purple" },
        { color: "red", label: "Red" },
        { color: "#ffa8a8", label: "Light Red" },
    ];

    return (
        <div
            className="fixed top-0 left-0 right-0 z-10"
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                marginBottom: "12px",
            }}
        >
            {/* Format Dropdown */}
            <Dropdown labelIcon={<Bold size={16} />}>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} icon={Bold} label="Bold" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} icon={Italic} label="Italic" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} icon={Underline} label="Underline" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} icon={Strikethrough} label="Strikethrough" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("code")} icon={Code} label="Code" />
            </Dropdown>

            {/* Headings Dropdown */}
            <Dropdown labelIcon={<Heading2 size={16} />}>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                    <ToolbarButton
                        key={level}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        isActive={editor.isActive("heading", { level })}
                        icon={headingIcons[level]}
                        label={`Heading ${level}`}
                    />
                ))}
            </Dropdown>

            {/* Highlight Dropdown */}
            <Dropdown labelIcon={<Highlighter size={16} />}>
                {highlightColors.map(({ color, label }) => (
                    <button
                        key={color}
                        onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                        title={label}
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: color,
                            border: editor.isActive("highlight", { color }) ? "2px solid black" : "1px solid #aaa",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </Dropdown>

            {/* Alignment */}
            <div className="border border-gray-400"></div>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} icon={AlignLeft} label="Left" />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} icon={AlignCenter} label="Center" />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} icon={AlignRight} label="Right" />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} icon={AlignJustify} label="Justify" />


            {/* Lists */}
            <div className="border border-gray-400"></div>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} icon={List} label="Bullet List" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} icon={ListOrdered} label="Ordered List" />

            {/* Quote + Sup/Sub */}
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} icon={Quote} label="Quote" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive("subscript")} icon={Subscript} label="Subscript" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive("superscript")} icon={Superscript} label="Superscript" />

            {/* Links */}
            <ToolbarButton
                onClick={() => {
                    const url = window.prompt("Enter URL");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                isActive={editor.isActive("link")}
                icon={Link}
                label="Link"
            />
            <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} icon={Unlink} label="Unlink" />

            {/* Tables */}
            <div className="border border-gray-400"></div>
            <ToolbarButton
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                icon={Table}
                label="Insert Table"
            />
            <Dropdown labelIcon={<Grid2X2Plus size={16} />}>
                <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} icon={BetweenVerticalStart} label="Add column before" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} icon={BetweenVerticalEnd} label="Add column after" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} icon={BetweenHorizonalStart} label="Add row before" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} icon={BetweenHorizonalEnd} label="Add row after" show={true} />
            </Dropdown>
            <Dropdown labelIcon={<Grid2X2X size={16} />}>
                <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()} icon={TableColumnsSplit} label="Delete column" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} icon={Trash} label="Delete row" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} icon={TableRowsSplit} label="Delete table" show={true} />
            </Dropdown>

            <Dropdown labelIcon={<Merge size={16} />}>
                <ToolbarButton onClick={() => editor.chain().focus().mergeCells().run()} icon={TableCellsMerge} label="Merge cells" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().splitCell().run()} icon={TableCellsSplit} label="Split cell" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderColumn().run()} icon={Columns3} label="Toggle header column" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderRow().run()} icon={Rows3} label="Toggle header row" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderCell().run()} icon={Table2} label="Toggle header cell" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().mergeOrSplit().run()} icon={Merge} label="Merge or split" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().setCellAttribute("colspan", 2).run()} icon={Square} label="Set cell attribute" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().fixTables().run()} icon={Bolt} label="Fix tables" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().goToNextCell().run()} icon={MoveRight} label="Go to next cell" show={true} />
                <ToolbarButton onClick={() => editor.chain().focus().goToPreviousCell().run()} icon={MoveLeft} label="Go to previous cell" show={true} />
            </Dropdown>

            <button
            onClick={triggerFileSelect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload Image
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
