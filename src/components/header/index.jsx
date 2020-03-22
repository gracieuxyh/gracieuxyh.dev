import React from 'react'

import './index.scss'

export const Header = ({ location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <header className="header">
        <h1>POSTS</h1>
        <p>기술 공유 · 각종 리뷰 · 소소한 일상</p>
      </header>
    )
  )
}
