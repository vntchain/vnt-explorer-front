import React from 'react'
import { connect } from 'react-redux'

import { LangContext } from 'i18n/LangContext'
import { Select } from 'antd'
import styles from './HeaderLang.scss'

const Option = Select.Option

export default connect()(function HeaderLangSelector(props) {
  const updateGlobalLang = lang => {
    props.dispatch({
      type: 'global/setLanguage',
      payload: lang
    })
  }
  return (
    <LangContext.Consumer>
      {({ dsdtUpdateLang: alterLang }) => {
        const handleChange = v => {
          console.log(v) //eslint-disable-line
          alterLang()
          updateGlobalLang(v)
        }
        const defaultValue = localStorage.lang || props.menu.defaultValue
        updateGlobalLang(defaultValue)
        return (
          <Select
            className={styles.lang}
            defaultValue={defaultValue}
            onChange={handleChange}
          >
            {props.menu.children.map(child => {
              return (
                <Option key={child.key} value={child.value}>
                  <img src={child.imgSrc} className="langIcon" alt="" />
                  <span>{child.title}</span>
                </Option>
              )
            })}
          </Select>
        )
      }}
    </LangContext.Consumer>
  )
})
