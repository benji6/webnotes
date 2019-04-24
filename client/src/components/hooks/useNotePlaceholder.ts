const shuffle = <A>(xs: A[]) => {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[xs[i], xs[j]] = [xs[j], xs[i]]
  }
  return xs
}

const placeholders = shuffle([
  'Add a new note here',
  'Note to self...',
  'What are you up to?',
  'Need to remember something?',
  'Write your note here',
])

let notePlaceholderIndex = -1

export default function useNotePlaceholder() {
  if (notePlaceholderIndex === placeholders.length - 1) notePlaceholderIndex = 0
  return placeholders[++notePlaceholderIndex]
}
