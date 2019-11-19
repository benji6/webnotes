import * as React from 'react'

export default function useKeyboardSave(callback: () => void) {
  const savedCallback = React.useRef(callback)
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.keyCode === 83) savedCallback.current()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
