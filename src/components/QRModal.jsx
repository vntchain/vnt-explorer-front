import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

import genQRCode from 'utils/genQRCode'
import icon from 'assets/images/二维码.png'
import styles from 'components/QRModal.scss'

function QRModal(props) {
  const { address } = props
  const [visible, setVisibility] = useState(false)
  const [src, setSrc] = useState('')
  const showModal = async () => {
    const s = await genQRCode(address)
    setSrc(s)
    setVisibility(true)
  }
  return (
    <Fragment>
      <img className={styles.icon} src={icon} onClick={showModal} />

      <Modal
        className={styles.modal}
        title=""
        visible={visible}
        onOk={() => setVisibility(false)}
        onCancel={() => setVisibility(false)}
        closable={false}
        footer={null}
      >
        <img src={src} />
      </Modal>
    </Fragment>
  )
}

QRModal.propTypes = {
  address: PropTypes.string.isRequired
}

export default QRModal
