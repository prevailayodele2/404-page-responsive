import { useParams } from 'react-router-dom'

export default function WebChat() {
  const { conversationId } = useParams()
  return (
    <div className="h-full w-full grid grid-cols-[260px_1fr_320px] grid-rows-[56px_1fr] bg-stone-900 text-stone-100">
      <aside className="col-span-1 row-span-2 border-r border-stone-800 p-3 hidden md:block">
        <button className="w-full rounded-xl bg-stone-100 text-stone-900 py-2 font-medium">New Chat</button>
        <div className="mt-3 text-sm text-stone-400">Sidebar placeholder</div>
      </aside>
      <header className="col-span-1 row-span-1 border-b border-stone-800 p-3 flex items-center justify-between">
        <div className="font-semibold">{conversationId ? `Conversation ${conversationId}` : 'Chat'}</div>
        <div className="text-sm text-stone-400">Model · Settings</div>
      </header>
      <main className="col-span-1 row-span-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="rounded-2xl bg-stone-800/60 p-4">Assistant message stream placeholder</div>
        </div>
      </main>
      <aside className="col-span-1 row-span-2 border-l border-stone-800 p-3 hidden lg:block">
        <div className="text-sm text-stone-400">Utility panel</div>
      </aside>
    </div>
  )
}

