import React from 'react'
import './index.scss'

export const PostDate = ({ date }) => {
  const baseDate = new Date(date)
  const baseDateMonth =
    baseDate.getMonth() >= 9
      ? baseDate.getMonth() + 1
      : `0${baseDate.getMonth() + 1}`
  const baseDateDate =
    baseDate.getDate() >= 10 ? baseDate.getDate() : `0${baseDate.getDate()}`
  const postDate = `${baseDate.getFullYear()}/${baseDateMonth}/${baseDateDate}`
  return <p className="post-date">{postDate}</p>
}
