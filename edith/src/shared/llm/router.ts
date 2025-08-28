export async function streamChat(input: string): Promise<{ text: string }> {
  // TODO: integrate providers. For now, echo.
  const canned = input.toLowerCase().includes('hello') ? 'Yes — happy to help!' : `You said: ${input}`
  return new Promise((resolve) => setTimeout(() => resolve({ text: canned }), 150))
}

export function isBinaryResponse(text: string): boolean {
  const yesNoRegex = /^(yes|no)([.!?\s]|$)/i
  const phrases = [
    'recommend', 'approve', 'decline', 'go ahead', 'do not', 'should I', 'should we', 'is it ok', 'is it okay'
  ]
  return yesNoRegex.test(text.trim()) || phrases.some((p) => text.toLowerCase().includes(p))
}

