import * as React from 'react'

let isCmdPressed = false

window.addEventListener('keydown', e => {
  if (e.keyCode === 91) isCmdPressed = true
})

window.addEventListener('keyup', e => {
  if (e.keyCode === 91) isCmdPressed = false
})

export default function useKeyboardSave(callback: () => void) {
  const savedCallback = React.useRef(callback)
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || isCmdPressed) && e.keyCode === 83) {
        e.preventDefault()
        savedCallback.current()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
