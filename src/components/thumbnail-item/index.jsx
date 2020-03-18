import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <p className="item-date">{node.frontmatter.date}</p>
    <p className="item-tag">{node.frontmatter.category}</p>
    <div key={node.fields.slug}>
      <h3 className="item-title">
        {node.frontmatter.title || node.fields.slug}
      </h3>
      <div className="is-active-line"></div>
      <p
        className="item-content"
        dangerouslySetInnerHTML={{ __html: node.excerpt }}
      />
    </div>
  </Link>
)
