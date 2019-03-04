import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import menu from 'utils/menu.js'

import styles from './HeaderMenu.scss'

const SubMenu = Menu.SubMenu

export const menuItemFactory = (menu, auth, isMobile = false, dispatch) => {
  return menu.map(m => {
    if (m.children) {
      if (m.hasOwnProperty('condition')) {
        if (m.condition !== auth) {
          return
        }
      }
      return (
        <SubMenu
          key={m.key}
          title={
            <span className={styles.menu__subMenu}>
              <LocalText id={m.title} />
              {!isMobile && <Icon type="down" />}
            </span>
          }
        >
          {menuItemFactory(m.children, auth, isMobile, dispatch)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={m.key}>
        {m.hasOwnProperty('btn') ? (
          <span
            style={{ color: 'red' }}
            onClick={() => dispatch({ type: 'auth/logout' })}
          >
            <LocalText id={m.title} />
          </span>
        ) : (
          <Link to={m.path}>
            <LocalText id={m.title} />
          </Link>
        )}
      </Menu.Item>
    )
  })
}

export default function HeaderMenu(props) {
  return (
    <div className={styles.menu}>
      <Menu theme="light" mode="horizontal">
        {menuItemFactory(menu, props.auth, props.isMobile, props.dispatch)}
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
