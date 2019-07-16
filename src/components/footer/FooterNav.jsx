import React from 'react'
import { footerNav } from 'utils/menu.js'
import { Link } from 'react-router-dom'
import LocalText from 'i18n/LocalText'

import styles from './FooterNav.scss'

export default function FooterNav() {
  return (
    <ul className={styles.footerNav}>
      {footerNav.map(nav => {
        return (
          <li key={nav.key} className={styles.navItem}>
            {nav.hasOwnProperty('friendLink') ? (
              <a href={nav.path} target="_blank">
                <LocalText id={nav.title} />
              </a>
            ) : (
              <Link to={nav.path}>
                <LocalText id={nav.title} />
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
