
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Underline as UnderlineIcon, CheckSquare } from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    className?: string; // Add className prop for flexibility
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center gap-1 border-b border-border bg-secondary/5 px-2 py-1.5 rounded-t-lg">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('bold') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Bold"
            >
                <Bold size={14} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('italic') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Italic"
            >
                <Italic size={14} />
            </button>
            <div className="w-[1px] h-4 bg-border mx-1" />
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('bulletList') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Bullet List"
            >
                <List size={14} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('orderedList') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Ordered List"
            >
                <ListOrdered size={14} />
            </button>
            <div className="w-[1px] h-4 bg-border mx-1" />
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('underline') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Underline"
            >
                <UnderlineIcon size={14} />
            </button>
            <button
                onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl);
                    if (url === null) return;
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                className={`p-1.5 rounded hover:bg-secondary/50 transition-colors ${editor.isActive('link') ? 'bg-secondary/50 text-foreground' : 'text-muted-foreground'}`}
                title="Link"
            >
                <LinkIcon size={14} />
            </button>
        </div>
    );
};

export const RichTextEditor = ({ content, onChange, className }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }: { editor: any }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm prose-invert max-w-none focus:outline-none min-h-[100px] px-4 py-3 text-sm font-sans',
            },
        },
    });

    // Update editor content if prop changes (handling external updates) - strictly only when editor is ready
    // Note: This needs careful handling to avoid cursor jumping loops. 
    // Ideally user only updates content via editor, so this might not be needed unless data is fetched async.

    return (
        <div className={`border border-border rounded-lg bg-background overflow-hidden flex flex-col ${className || ''}`}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="flex-1" />
        </div>
    );
};
