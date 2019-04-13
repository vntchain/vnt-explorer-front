import React from 'react'
import PropTypes from 'prop-types'

import withLang from 'i18n/withLang'

import styles from 'components/SubTitle.scss'

function SubTitle(props) {
  const { id, arg, locale, language } = props
  let extraFieldID = ''
  let extraArg = ''

  // e.g., `&block=233`
  if (props.prefix) {
    const filterType = props.prefix.split('=')[0].slice(1)
    switch (filterType) {
      case 'block':
        extraFieldID = 'tlpSubTitleBlock'
        extraArg = props.prefix.split('=')[1]
        break
    }
  }

  return (
    <div className={styles.container}>
      <h4 className={props.underTab ? styles.tabTitle : styles.title}>
        {props.prefix &&
          typeof locale[language][extraFieldID] === 'function' &&
          locale[language][extraFieldID](extraArg)}
        {locale[language][id](arg)}
      </h4>
    </div>
  )
}

SubTitle.propTypes = {
  id: PropTypes.string.isRequired,
  arg: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  underTab: PropTypes.bool,
  locale: PropTypes.shape({
    cn: PropTypes.object.isRequired,
    en: PropTypes.object.isRequired
  }).isRequired,
  language: PropTypes.string.isRequired
}

export default withLang(SubTitle)
