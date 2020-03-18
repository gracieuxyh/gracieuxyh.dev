import React from 'react'

import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(37.5),
          padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} `,
        }}
      >
        <ThemeSwitch />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  )
}
