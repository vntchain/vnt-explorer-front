// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { Input, Modal, Icon, Button, message } from 'antd'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { checkEmail } from 'utils/common'
import { connect } from 'react-redux'
import apis from 'utils/apis'
import styles from './Footer.scss'

const mapStateToProps = ({ subscribe: { showSubmitModal, success } }) => {
  return {
    showSubmitModal,
    success
  }
}

export default withLang(
  connect(mapStateToProps)(function FooterInput(props) {

    const [email, setEmail] = useState('')
    const closeSubmitModal = () => {
      props.dispatch({
        type: 'subscribe/setShowSubmitModal',
        payload: false
      })
    }

    const handleInput = e => {
      setEmail(e.target.value.trim())
    }
    const handleSearch = () => {
      //console.log(email) //eslint-disable-line
      if (checkEmail(email)) {
        props.dispatch({
          type: 'dataRelayNew/fetchData',
          payload: {
            path: `${apis.subscribe}?email=${email}`,
            ns: 'subscribe',
            field: 'res',
            callback: () => setEmail('')
          }
        })
      } else {
        message.error(props.locale[props.language].inputSyntaxError)
      }
    }

    return (
      <div className={styles.input}>
        <Input.Search
          placeholder={props.locale[props.language].footerPlaceholder}
          enterButton={props.locale[props.language].submitBtn}
          onSearch={handleSearch}
          onChange={handleInput}
          value={email}
        />
        <Modal
          visible={props.showSubmitModal}
          footer={null}
          closable={false}
          centered
          onCancel={closeSubmitModal}
        >
          <div style={{ textAlign: 'center' }}>
            {props.success ? (
              <Icon
                type="check-circle"
                style={{ fontSize: '40px', color: 'blue' }}
              />
            ) : (
              <Icon
                type="close-circle"
                style={{ fontSize: '40px', color: 'red' }}
              />
            )}
            <h1>
              {props.success ? (
                <LocalText id="submit_success" />
              ) : (
                <LocalText id="submit_failed" />
              )}
            </h1>
            <Button onClick={closeSubmitModal} className={styles.antModalBtn}>
              OK
            </Button>
          </div>
        </Modal>
      </div>
    )
  })
)
