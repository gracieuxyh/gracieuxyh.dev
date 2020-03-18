import React from 'react'

import './index.scss'

export const Footer = () => (
  <footer className="footer">
    ©{new Date().getFullYear()}{' '}
    <a href="https://github.com/gracieuxyh">gracieuxyh</a>, Based on{' '}
    <a href="https://github.com/JaeYeopHan/gatsby-starter-bee">
      Gatsby-starter-bee
    </a>
  </footer>
)
