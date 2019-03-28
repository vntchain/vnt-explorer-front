import React from 'react'

import styles from 'components/Margin.scss'

export default function Gap(props) {
  let gapSize = props.size || 'medium'
  return <div className={styles[gapSize]} />
}
