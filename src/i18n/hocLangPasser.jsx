import React from 'react'
import { LangContext } from './LangContext'

import cn from './locale/cn'
import en from './locale/en'

export const locale = {
  cn,
  en
}

export default function hocLangPasser(Component) {
  return function WrapperComponent(props) {
    return (
      <LangContext.Consumer>
        {({ lang }) => <Component {...props} language={lang} locale={locale} />}
      </LangContext.Consumer>
    )
  }
}
