import React, { useState } from 'react'

import { LangContext, langs } from './LangContext'

const title = {
  cn: 'VNT区块链浏览器',
  en: 'VNT Blockchain Explorer'
}

export default function LangProvider(props) {
  let defaultLang
  if (localStorage.lang) {
    defaultLang = localStorage.lang
  } else {
    defaultLang = window.navigator.language.match(/^zh/)
      ? langs.chinese
      : langs.english
    localStorage.setItem('lang', defaultLang)
  }
  document.title = title[defaultLang]

  const [lang, alterLang] = useState(defaultLang)

  // update language prop from descendent
  const dsdtUpdateLang = () => {
    const l = lang === langs.chinese ? langs.english : langs.chinese
    alterLang(l)
    localStorage.setItem('lang', l)
    document.title = title[l]
  }
  return (
    <LangContext.Provider value={{ lang, dsdtUpdateLang }}>
      {props.children}
    </LangContext.Provider>
  )
}
