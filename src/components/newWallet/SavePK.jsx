import React from 'react'
import { Button, Input } from 'antd'
import QRCode from 'qrcode'

import LocalText from 'i18n/LocalText'

import styles from './NWallet.scss'

export default function SavePrivateKey(props) {
  /* const copy = () => {
    document.querySelector('#copy').select()
    document.execCommand('copy')
  } */

  const printQRCode = async account => {
    try {
      const w = window.open()

      const qrAddr = await QRCode.toDataURL(account.address, {
        version: 6,
        errorCorrectionLevel: 'L'
      })
      const qrPK = await QRCode.toDataURL(account.privateKey, {
        version: 6,
        errorCorrectionLevel: 'L'
      })

      const nodeImgAddr = document.createElement('img')
      nodeImgAddr.setAttribute('src', qrAddr)
      const nodeImgPK = document.createElement('img')
      nodeImgPK.setAttribute('src', qrPK)

      w.document.body.appendChild(nodeImgAddr)
      w.document.body.appendChild(nodeImgPK)
    } catch (e) {
      /* eslint-disable */
      console.log('%c%s\n%cgenerator QRCode Error!: %o', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', e)
      /* eslint-enable */
    }
  }
  return (
    <div className={`${styles.content} ${styles['content--wider']}`}>
      <h3 className={styles.title}>
        <LocalText id="st3Title" />
      </h3>

      <Input id="copy" value={props.account.privateKey} readOnly size="large" />
      {/* suffix={<Icon onClick={copy} type="copy" />} */}

      <Button
        size="large"
        type="primary"
        onClick={() => printQRCode(props.account)}
        block
      >
        <LocalText id="st3Btn1" />
      </Button>

      <ul className={styles.list}>
        <li>
          {'- '}
          <LocalText id="st3Note1" />
        </li>
        <li>
          {'- '}
          <LocalText id="st3Note2" />
        </li>
        <li>
          {'- '}
          <LocalText id="st3Note3" />
        </li>
      </ul>

      <Button
        style={{ backgroundColor: '#ff8103', borderColor: '#ff8103' }}
        size="large"
        type="primary"
        block
      >
        <LocalText id="st3Btn2" />
      </Button>
    </div>
  )
}
