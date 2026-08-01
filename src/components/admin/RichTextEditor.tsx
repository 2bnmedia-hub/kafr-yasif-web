"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
  TableIcon,
  Heading2,
  Heading3,
  Loader2,
} from "lucide-react";

type Props = {
  name: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  placeholder?: string;
};

export function RichTextEditor({ name, defaultValue = "", dir = "rtl", placeholder }: Props) {
  const [html, setHtml] = useState(defaultValue);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      TiptapImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: placeholder ?? "התחילו לכתוב כאן..." }),
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        dir,
        class: "rte-content min-h-[220px] rounded-b-xl bg-white px-4 py-3 text-sm leading-7 text-ink-900 focus:outline-none",
      },
    },
  });

  async function handleImageFile(file: File) {
    if (!editor) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("group", "image");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.media?.url) {
        editor.chain().focus().setImage({ src: data.media.url, alt: file.name }).run();
      }
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-teal-100">
      <Toolbar editor={editor} onPickImage={() => imageInputRef.current?.click()} uploadingImage={uploadingImage} />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
          e.target.value = "";
        }}
      />
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function Toolbar({
  editor,
  onPickImage,
  uploadingImage,
}: {
  editor: Editor | null;
  onPickImage: () => void;
  uploadingImage: boolean;
}) {
  if (!editor) return <div className="h-11 border-b border-teal-100 bg-cream-50" />;

  function addLink() {
    const url = window.prompt("כתובת הקישור:");
    if (url) editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function insertTable() {
    editor!.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }

  const buttons: { icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }[] = [
    { icon: <Heading2 size={16} />, label: "כותרת ראשית", onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { icon: <Heading3 size={16} />, label: "כותרת משנה", onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { icon: <Bold size={16} />, label: "מודגש", onClick: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: <Italic size={16} />, label: "נטוי", onClick: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: <List size={16} />, label: "רשימה", onClick: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: <ListOrdered size={16} />, label: "רשימה ממוספרת", onClick: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: <Quote size={16} />, label: "ציטוט", onClick: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { icon: <LinkIcon size={16} />, label: "קישור", onClick: addLink, active: editor.isActive("link") },
    { icon: <AlignRight size={16} />, label: "יישור לימין", onClick: () => editor.chain().focus().setTextAlign("right").run(), active: editor.isActive({ textAlign: "right" }) },
    { icon: <AlignCenter size={16} />, label: "מרכוז", onClick: () => editor.chain().focus().setTextAlign("center").run(), active: editor.isActive({ textAlign: "center" }) },
    { icon: <AlignLeft size={16} />, label: "יישור לשמאל", onClick: () => editor.chain().focus().setTextAlign("left").run(), active: editor.isActive({ textAlign: "left" }) },
    { icon: <AlignJustify size={16} />, label: "יישור לשני הצדדים", onClick: () => editor.chain().focus().setTextAlign("justify").run(), active: editor.isActive({ textAlign: "justify" }) },
    { icon: <TableIcon size={16} />, label: "טבלה", onClick: insertTable },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-teal-100 bg-cream-50 p-1.5">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          title={b.label}
          aria-label={b.label}
          aria-pressed={b.active}
          onClick={b.onClick}
          className={`rounded-md p-1.5 transition-colors ${
            b.active ? "bg-teal-700 text-white" : "text-ink-600 hover:bg-teal-100"
          }`}
        >
          {b.icon}
        </button>
      ))}
      <button
        type="button"
        title="הוספת תמונה"
        aria-label="הוספת תמונה"
        onClick={onPickImage}
        disabled={uploadingImage}
        className="rounded-md p-1.5 text-ink-600 transition-colors hover:bg-teal-100 disabled:opacity-50"
      >
        {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
      </button>
    </div>
  );
}
