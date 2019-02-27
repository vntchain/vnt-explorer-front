import React from 'react'

export const langs = {
  chinese: 'cn',
  english: 'en'
}

export const LangContext = React.createContext({
  lang: langs.chinese,
  alterLang: () => {}
})
