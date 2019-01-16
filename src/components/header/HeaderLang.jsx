import React from 'react'

import lang from 'assets/images/lang.png'

import styles from './Header.scss'

export default function HeaderLogo({ lang: language, dispatch }) {
  const setLocale = () => {
    const lang = language === 'cn' ? 'en' : 'cn'
    dispatch({ type: 'global/setLanguage', payload: lang })
  }
  return (
    <div className={styles.lang} onClick={setLocale}>
      <img src={lang} alt="" />
      <span>{language === 'cn' ? '中文' : 'English'}</span>
    </div>
  )
}
