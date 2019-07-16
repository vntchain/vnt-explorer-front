import React from 'react'
import LocalText from 'i18n/LocalText'

import styles from './Header.scss'
import { voteDetail } from 'utils/menu.js'

export default function HeaderVote(){
  return (
    <div className={styles.vote}>
      <a href={voteDetail.path} target="_blank">
        <span><LocalText id={voteDetail.title} /></span>
        <img src={voteDetail.imgSrc} className="hotIcon" alt="" />
      </a>
    </div>
  )
}