import React from 'react'

const Footer = ({length}) => {
  return (
    <footer>{length} {length ===1 ? "Goal":"Goals"} today</footer>
  )
}

export default Footer