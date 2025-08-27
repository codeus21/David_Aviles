import { useState, useEffect } from 'react'

const TypeWriter = ({ texts = ["I create beautiful, responsive, and user-friendly web experiences."], delay = 50, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[textIndex]
    
    if (isDeleting) {
      // Deleting text
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        }, delay / 2)

        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false)
        setTextIndex((textIndex + 1) % texts.length)
        setCurrentIndex(0)
      }
    } else {
      // Typing text
      if (currentIndex < currentFullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }, delay)

        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)

        return () => clearTimeout(timeout)
      }
    }
  }, [currentIndex, delay, texts, textIndex, isDeleting, pauseTime])

  return <p>{currentText}</p>
}

export default TypeWriter 