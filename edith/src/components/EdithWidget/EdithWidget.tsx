import { motion } from 'framer-motion'
import { Settings, PenLine, MessageSquare } from 'lucide-react'
import ChatBubble from '../ChatBubble/ChatBubble'
import Composer from '../Composer/Composer'
import { useAppStore } from '../../store/app'
import { isBinaryResponse, streamChat } from '../../shared/llm/router'
import { invoke } from '@tauri-apps/api/core'

export default function EdithWidget() {
  const latest = useAppStore((s) => s.latest)
  const setLatest = useAppStore((s) => s.setLatest)
  const composerOpen = useAppStore((s) => s.composerOpen)
  const setComposerOpen = useAppStore((s) => s.setComposerOpen)
  const input = useAppStore((s) => s.input)
  const setInput = useAppStore((s) => s.setInput)

  const send = async () => {
    if (!input.trim()) return
    const { text } = await streamChat(input)
    setLatest(text)
    setInput('')
  }

  return (
    <div className="fixed right-4 bottom-4 select-none">
      <ChatBubble
        text={latest}
        isBinary={isBinaryResponse(latest)}
        onCopy={async () => { try { await navigator.clipboard.writeText(latest) } catch { /* ignore */ } }}
        onFeedback={() => { /* TODO: store feedback */ }}
      />

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="size-14 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 shadow-xl border border-white/30"
        />
        <motion.div className="absolute -top-2 -left-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <button onClick={() => invoke('open_settings_window')} className="size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center" aria-label="Open settings">
            <Settings size={16} />
          </button>
          <button onClick={() => setComposerOpen(!composerOpen)} className="size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center" aria-label="Toggle composer">
            <PenLine size={16} />
          </button>
          <a href="/chat/local" className="size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center" aria-label="Open web chat">
            <MessageSquare size={16} />
          </a>
        </motion.div>
      </div>

      {composerOpen && (
        <Composer value={input} onChange={setInput} onSend={send} onClose={() => setComposerOpen(false)} />
      )}
    </div>
  )
}

