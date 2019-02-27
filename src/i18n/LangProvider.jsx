import React, { useState } from 'react'

import { LangContext, langs } from './LangContext'

export default function LangProvider(props) {
  const [lang, alterLang] = useState(langs.chinese)

  // update language prop from descendent
  const dsdtUpdateLang = () => {
    const l = lang === langs.chinese ? langs.english : langs.chinese
    alterLang(l)
  }
  return (
    <LangContext.Provider value={{ lang, dsdtUpdateLang }}>
      {props.children}
    </LangContext.Provider>
  )
}
