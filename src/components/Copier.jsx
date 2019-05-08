import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'

import withLang from 'i18n/withLang'
import cpIcon from 'assets/images/copy.png'

import styles from 'components/Copier.scss'

function Copier(props) {
  const { text, copyRef, textStyle } = props
  const handleCopy = () => {
    copyRef.current.select()
    document.execCommand('copy')
    message.info(props.locale[props.language].copy)
  }

  return (
    <Fragment>
      <input
        style={{
          position: 'absolute',
          right: '-4000rem',
          color: 'transparent'
        }}
        value={text}
        readOnly
        ref={copyRef}
      />
      <span className={styles.text}>
        <span className={textStyle}>{text}</span>
        <img
          className={styles.cpIcon}
          onClick={handleCopy}
          src={cpIcon}
          alt="copy-icon"
        />
      </span>
    </Fragment>
  )
}

Copier.propTypes = {
  text: PropTypes.string.isRequired,
  copyRef: PropTypes.object.isRequired,
  textStyle: PropTypes.string.isRequired
}

export default withLang(Copier)
