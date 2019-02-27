import React from 'react'

import { LangContext } from 'i18n/LangContext'
import LocalText from 'i18n/LocalText'
import langIcon from 'assets/images/lang.png'

import styles from './Header.scss'

export default function HeaderLogo() {
  return (
    <LangContext.Consumer>
      {({ dsdtUpdateLang: alterLang }) => (
        <div className={styles.lang} onClick={alterLang}>
          <img src={langIcon} alt="" />
          <span>
            <LocalText id="language" />
          </span>
        </div>
      )}
    </LangContext.Consumer>
  )
}
