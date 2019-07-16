import React from 'react'
import { Menu } from 'antd'

import { menuItemFactory } from './HeaderMenu'

import menu, { vntNetMenu, moreMenu } from 'utils/menu.js'

import styles from './MobileHeaderMenu.scss'

const SubMenu = Menu.SubMenu
const totalMenu = menu.concat([moreMenu, vntNetMenu])

export default function MobileHeaderMenu(props) {
  const toggleNav = () => {
    document.querySelector('body').classList.toggle(styles.body)
  }

  return (
    <div className={styles.navigation}>
      <input
        id="nav-toggle"
        type="checkbox"
        className={styles.navigation__checkbox}
      />

      <label htmlFor="nav-toggle" className={styles.navigation__button}>
        <span className={styles.navigation__icon} onClick={toggleNav}>
          &nbsp;
        </span>
      </label>

      <nav className={styles.navigation__nav}>
        <Menu theme="light" mode="inline">
          {menuItemFactory(totalMenu, props.auth, true, props.dispatch)}
          <SubMenu key="lang" title="中/EN" />
        </Menu>
      </nav>
    </div>
  )
}
