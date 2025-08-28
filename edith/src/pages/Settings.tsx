export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-stone-800/50 p-4 border border-stone-700">
          <h2 className="font-medium mb-2">Account & Model</h2>
          <div className="text-sm text-stone-400">Provider, model, temperature</div>
        </section>
        <section className="rounded-2xl bg-stone-800/50 p-4 border border-stone-700">
          <h2 className="font-medium mb-2">Behavior</h2>
          <div className="text-sm text-stone-400">Always on top, launch at login</div>
        </section>
        <section className="rounded-2xl bg-stone-800/50 p-4 border border-stone-700">
          <h2 className="font-medium mb-2">Permissions & Monitoring</h2>
          <div className="text-sm text-stone-400">Request permissions</div>
        </section>
      </div>
    </div>
  )
}

