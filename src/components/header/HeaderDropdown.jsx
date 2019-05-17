import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'

import LocalText from 'i18n/LocalText'
import styles from './HeaderDropdown.scss'

const dropdownMenuFactory = children => {
  return (
    <Menu className={styles.dropdownMenu}>
      {children.map(child => {
        return (
          <Menu.Item key={child.key} className={styles.dropdownItem}>
            {child.hasOwnProperty('friendLink') ? (
              <a href={child.path} target="_blank">
                <LocalText id={child.title} />
              </a>
            ) : (
              <LocalText id={child.title} />
            )}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default function HeaderDropdown(props) {
  const { menu } = props
  const dropdownMenu = dropdownMenuFactory(menu.children)
  return (
    <div className={styles.dropdown}>
      <Dropdown overlay={dropdownMenu} overlayClassName="dropdownTitle">
        <span>
          <LocalText id={menu.title} />
          {!props.isMobile && <Icon type="down" />}
        </span>
      </Dropdown>
    </div>
  )
}
