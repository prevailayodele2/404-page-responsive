import { useEffect, useRef } from 'react'

export default function Composer({ value, onChange, onSend, onClose }: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => { ref.current?.focus() }, [])

  return (
    <div className="mt-2 w-[360px] rounded-xl bg-white/10 backdrop-blur border border-white/15 p-2">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask EDITH…"
        className="w-full bg-transparent outline-none text-white placeholder:text-white/60 text-sm resize-none"
        rows={1}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onSend()
          if (e.key === 'Escape') onClose()
          if (e.key === 'ArrowUp' && value.length === 0) {
            // future: recall last prompt
          }
        }}
      />
      <div className="flex justify-end mt-1">
        <button onClick={onSend} className="px-3 py-1 text-xs rounded-md bg-white text-stone-900 font-medium">Send</button>
      </div>
    </div>
  )
}

