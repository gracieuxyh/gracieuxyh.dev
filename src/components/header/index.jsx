import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Header = ({ location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <header className="header">
        <h1>POSTS</h1>
        <p>
          공부와 개발의 기록 · 각종 리뷰 · <del>아주 가끔</del> 잡담을
          기록합니다.
        </p>
      </header>
    )
  )
}
