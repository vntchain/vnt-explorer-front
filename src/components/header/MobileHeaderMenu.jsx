import React from 'react'
import { Menu } from 'antd'

import { menuItemFactory } from './HeaderMenu'

import menu from 'utils/menu.js'
// import index from 'utils/locale.js'

import styles from './MobileHeaderMenu.scss'

export default function MobileHeaderMenu(props) {
  return (
    <div className={styles.navigation}>
      <input
        id="nav-toggle"
        type="checkbox"
        className={styles.navigation__checkbox}
      />

      <label htmlFor="nav-toggle" className={styles.navigation__button}>
        <span className={styles.navigation__icon}>&nbsp;</span>
      </label>

      <nav className={styles.navigation__nav}>
        <Menu theme="light" mode="inline">
          {menuItemFactory(menu, props.lang)}
          <Menu.Item>中/EN</Menu.Item>
        </Menu>
      </nav>
    </div>
  )
}
