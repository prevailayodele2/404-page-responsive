import { useMemo } from 'react'
import { marked } from 'marked'

export type ChatBubbleProps = {
  text: string
  isBinary: boolean
  onCopy?: () => void
  onFeedback?: (type: 'up' | 'down') => void
  expanded?: boolean
}

export default function ChatBubble({ text, isBinary, onCopy, onFeedback, expanded }: ChatBubbleProps) {
  const html = useMemo(() => marked.parse(text || '') as string, [text])

  return (
    <div className="mb-2 max-w-[360px] rounded-2xl bg-white/10 text-white backdrop-blur border border-white/15 shadow-lg p-3">
      <div
        className={(expanded ? '' : 'line-clamp-6 ') + 'prose prose-invert prose-pre:bg-stone-900 prose-pre:text-stone-100 prose-code:text-stone-100 text-sm'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-white/70">
          <button onClick={onCopy} className="hover:underline">Copy</button>
          <span className="mx-2">·</span>
          <span>Expand</span>
        </div>
        {isBinary && (
          <div className="flex gap-2 text-xs">
            <button onClick={() => onFeedback?.('up')} className="px-2 py-1 rounded bg-white/10">👍</button>
            <button onClick={() => onFeedback?.('down')} className="px-2 py-1 rounded bg-white/10">👎</button>
          </div>
        )}
      </div>
    </div>
  )
}

