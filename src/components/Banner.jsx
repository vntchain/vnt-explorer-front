import React from 'react'

import styles from './Banner.scss'

export default function Banner({ title }) {
  return <div className={styles.banner}>{title}</div>
}
