import React from 'react'

import styles from './Title.scss'

export default function Title(props) {
  return <p className={styles.title}>{props.title}</p>
}
