import { useState } from 'react'

const AnimatedHeading = ({ text }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <h1 className="animated-heading">
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`letter ${char === ' ' ? 'space' : ''}`}
          style={{
            '--delay': `${index * 0.05}s`,
            '--hover': hoveredIndex === index ? '1' : '0'
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {char}
        </span>
      ))}
    </h1>
  )
}

export default AnimatedHeading 