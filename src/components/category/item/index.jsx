import React from 'react'
import { Link } from 'gatsby'

export const Item = ({ title, category, selectCategory, link }) => (
  <li
    className={`${category === title ? 'item selected' : 'item'}`}
    role="tab"
    // aria-selected={category === title ? 'true' : 'false'}
  >
    {selectCategory ? (
      <div onClick={() => selectCategory(title)}>{title}</div>
    ) : (
      <Link to={link} style={{ color: 'inherit' }}>
        <div>{title}</div>
      </Link>
    )}
  </li>
)
