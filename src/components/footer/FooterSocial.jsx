import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { footerSocialData } from 'utils/menu.js'
import QRcode from 'assets/images/footer/QRcode.jpeg'
import styles from './FooterSocial.scss'

export default function FooterSocial() {
  const [showWechatQR, setShowWechatQR] = useState(false)
  const toggleWechatQR = show => {
    setShowWechatQR(show)
  }

  return (
    <div>
      <div className={styles.footerSocial}>
        {footerSocialData.map(val => {
          if (val.title === 'WeChat') {
            return (
              <Button
                shape="circle"
                key={val.title}
                className={styles.button}
                onClick={() => toggleWechatQR(true)}
              >
                <img src={val.img} alt="" />
              </Button>
            )
          } else if (val.title === 'Mail') {
            return (
              <Button
                shape="circle"
                key={val.title}
                className={styles.button}
                onClick={() => {
                  window.location.href = 'mailto:info@vntchain.io'
                }}
              >
                <img src={val.img} alt="" />
              </Button>
            )
          } else {
            return (
              <Button
                href={val.link}
                key={val.title}
                target="_blank"
                shape="circle"
                className={styles.button}
              >
                <img src={val.img} alt="" />
              </Button>
            )
          }
        })}
      </div>
      <Modal
        visible={showWechatQR}
        footer={null}
        closable={false}
        centered
        onCancel={() => toggleWechatQR(false)}
      >
        <p style={{ textAlign: 'center' }}>
          <img src={QRcode} alt="" />
        </p>
      </Modal>
    </div>
  )
}
