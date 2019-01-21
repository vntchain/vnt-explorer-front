import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import menu from 'utils/menu.js'
import index from 'utils/locale.js'

import styles from './HeaderMenu.scss'

const SubMenu = Menu.SubMenu

export const menuItemFactory = (menu, lang) => {
  return menu.map(m => {
    if (m.children) {
      return (
        <SubMenu
          key={m.key}
          title={
            <span className={styles.menu__subMenu}>
              {m.title[index(lang)]}
              <Icon type="down" />
            </span>
          }
        >
          {menuItemFactory(m.children, lang)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={m.key}>
        <Link to={m.path}>{m.title[index(lang)]}</Link>
      </Menu.Item>
    )
  })
}

export default function HeaderMenu(props) {
  return (
    <div className={styles.menu}>
      <Menu theme="light" mode="horizontal">
        {menuItemFactory(menu, props.lang)}
      </Menu>
    </div>
  )
}

/*
<Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>
*/
