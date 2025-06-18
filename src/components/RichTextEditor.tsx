import React, { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

type Props = {
  value: string
  onChange: (value: string) => void
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 })
  const [isEditable, setIsEditable] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
    ],
    content: value,
    editable: isEditable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Popup positioning below selected text
  const openLinkInput = () => {
    if (!editor) return

    const { from } = editor.state.selection
    const coords = editor.view.coordsAtPos(from)
    const editorBox = editor.view.dom.getBoundingClientRect()

    const top = coords.bottom - editorBox.top + 6
    const left = coords.left - editorBox.left

    setPopupPos({ top, left })
    setShowLinkInput(true)
  }

  // Click outside or ESC to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowLinkInput(false)
        setLinkUrl('')
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLinkInput(false)
        setLinkUrl('')
      }
    }

    if (showLinkInput) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showLinkInput])

  if (!editor) return null

  return (
    <div className="border rounded p-3 bg-white text-sm relative">
      {/* Toggle Edit/Preview */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 font-medium">{isEditable ? 'Edit Mode' : 'Preview Mode'}</span>
        <button
          onClick={() => {
            setIsEditable(!isEditable)
            editor.setEditable(!isEditable)
            setShowLinkInput(false)
          }}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
        >
          {isEditable ? 'Preview' : 'Edit'}
        </button>
      </div>

      {/* Toolbar - only show when editable */}
      {isEditable && (
        <div className="mb-2 flex flex-wrap gap-2 items-center">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 font-bold">B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 italic">i</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 underline">U</button>
          <button onClick={() => editor.chain().focus().setColor('#f87171').run()} className="w-4 h-4 rounded-full bg-red-500 border" />
          <button onClick={() => editor.chain().focus().setColor('#10b981').run()} className="w-4 h-4 rounded-full bg-green-500 border" />
          <button onClick={() => editor.chain().focus().unsetColor().run()} className="px-2 py-1">No Color</button>
          <button
            onClick={openLinkInput}
            className="px-2 py-1 border rounded text-blue-600"
          >
            Link
          </button>
        </div>
      )}

      {/* Floating Link Input */}
      {showLinkInput && isEditable && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            bottom: popupPos.top,
            right: popupPos.left,
            transform: 'translateX(-50%)',
          }}
          className="z-50 bg-white border border-gray-300 rounded shadow p-2 w-[160px] text-xs"
        >
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://"
            className="border px-2 py-1 rounded w-full text-xs"
            autoFocus
          />
          <div className="mt-1 flex justify-end gap-1">
            <button
              onClick={() => {
                editor.chain().focus().setLink({ href: linkUrl }).run()
                setShowLinkInput(false)
                setLinkUrl('')
              }}
              className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs"
            >
              Set
            </button>
            <button
              onClick={() => {
                setShowLinkInput(false)
                setLinkUrl('')
              }}
              className="px-2 py-0.5 bg-gray-200 text-black rounded text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="border rounded px-3 py-2 overflow-y-auto"
      />

      {/* Styling for ProseMirror and links */}
      <style>{`
        .ProseMirror {
          min-height: 40px;
          padding: 0.5rem;
          outline: none;
          white-space: pre-wrap;
          overflow-y: auto;
          cursor: text;
        }
        .ProseMirror:empty::before {
          content: '';
          display: block;
          min-height: 1em;
        }
        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
          transition: all 0.2s;
        }
        .ProseMirror a:hover {
          text-shadow: 0 0 4px rgba(37, 99, 235, 0.6);
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
