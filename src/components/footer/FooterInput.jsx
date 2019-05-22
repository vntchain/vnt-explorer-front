// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { Input, Modal, Icon, Button } from 'antd'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
//import {checkEmail} from 'utils/common'

import styles from './Footer.scss'

export default withLang(function FooterInput(props) {
  const [showInfo, setShowInfo] = useState(false)
  const toggleShowInfo = show => {
    setShowInfo(show)
  }
  const handleSearch = v => {
    // eslint-disable-next-line
    console.log(v) 
    toggleShowInfo(true)
  }

  return (
    <div className={styles.input}>
      <Input.Search
        placeholder={props.locale[props.language].footerPlaceholder}
        enterButton={props.locale[props.language].submitBtn}
        onSearch={handleSearch}
      />
      <Modal
        visible={showInfo}
        footer={null}
        closable={false}
        centered
        onCancel={() => toggleShowInfo(false)}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon type="check-circle" style={{ fontSize: '40px' }} />
          <h1>
            <LocalText id="submit_success" />
          </h1>
          <Button onClick={() => toggleShowInfo(false)}>OK</Button>
        </div>
      </Modal>
    </div>
  )
})
