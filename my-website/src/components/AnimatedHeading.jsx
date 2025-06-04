import React from 'react'

const AnimatedHeading = ({ text }) => {
  return (
    <h1 className="animated-heading">
      {text.split(' ').map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          className="word"
        >
          {word}
          {wordIndex < text.split(' ').length - 1 && ' '}
        </span>
      ))}
    </h1>
  )
}

export default AnimatedHeading 