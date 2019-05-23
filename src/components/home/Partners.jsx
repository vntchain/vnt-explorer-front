import React from 'react'
//import { connect } from 'react-redux'
import styles from './Partners.scss'
import LocalText from 'i18n/LocalText'

function Partners() {
  const imgArray = new Array(20)
  for (let i = 0; i < imgArray.length; i++) {
    imgArray[i] = {
      key: `logo${i + 1}`,
      src: `assets/images/partners/logo${i + 1}`
    }
  }
  return (
    <div className={styles.partners}>
      <h3 className={styles.heading}>
        <LocalText id="partners" />
      </h3>
      <div className={styles.content}>
        <ul>
          {imgArray.map(img => (
            <li key={img.key}>
              <img alt="" src={require('../../' + img.src + '.png')} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Partners
