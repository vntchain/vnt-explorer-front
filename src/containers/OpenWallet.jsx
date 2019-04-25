import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Upload, Icon, message } from 'antd'
// https://github.com/vntchain/vnt-kit.js/blob/master/account/account.js
import * as vntKit from 'vnt-kit'

import withLang from 'i18n/withLang'
import Banner from 'components/Banner'
import Margin from 'components/Margin'
import LocalText from 'i18n/LocalText'
import r from 'constants/routes'

import styles from 'containers/OpenWallet.scss'

export default connect()(
  withLang(function OpenWallet(props) {
    const handleSelect = e => {
      if (e.target.name !== method) {
        document
          .querySelector(`.${styles.defaultSelect}`)
          .classList.remove(styles.defaultSelect)

        e.target.classList.add(styles.defaultSelect)
        setMethod(e.target.name)
      }
    }

    const handleInputChange = ({ target: { name, value } }) => {
      if (name === 'password') {
        setPassword(value)
      } else {
        setPrivateKey(value)
      }
    }
    const handleUpload = file => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.error) {
          reader.abort()
          message.info(JSON.stringify(reader.error))
        } else if (reader.readyState === 2) {
          setFileList([file])
          setKsContent(reader.result)
        }
      }
      reader.readAsText(file)

      return false
    }

    const handleOpenWallet = () => {
      if (method === 'ks') {
        try {
          const ksObj = JSON.parse(ksContent)
          try {
            const { address, privateKey: pk } = vntKit.account.decrypt(
              ksObj,
              password,
              false
            )

            props.dispatch({
              type: 'auth/setState',
              payload: {
                auth: true,
                account: {
                  address: address.toLowerCase(),
                  pk
                }
              }
            })
            props.history.push(r.wallet)
          } catch (e) {
            message.error(e)
          }
        } catch (e) {
          message.error('Wrong file content!')
        }
      } else {
        try {
          const {
            address,
            privateKey: pk
          } = vntKit.account.privateKeyToAccount(privateKey)

          props.dispatch({
            type: 'auth/setState',
            payload: {
              auth: true,
              account: {
                address: address.toLowerCase(),
                pk
              }
            }
          })
          props.history.push(r.wallet)
        } catch (e) {
          message.error('No wallet is associated with this private key...')
        }
      }
    }
    const [method, setMethod] = useState('ks')
    const [fileList, setFileList] = useState([])
    const [ksContent, setKsContent] = useState([])
    const [password, setPassword] = useState(null)
    const [privateKey, setPrivateKey] = useState(null)

    const canSubmit =
      (method === 'ks' && password && fileList.length === 1) ||
      (method === 'pk' && privateKey)

    return (
      <div className={styles.open}>
        <Banner id="owBanner" />
        <Margin />

        <div className={styles.main}>
          <div className={styles.openMethod}>
            <p className={styles.title}>
              <LocalText id="owTitle" />
            </p>
            <div className={styles.btns}>
              <Button
                onClick={handleSelect}
                name="ks"
                className={styles.defaultSelect}
              >
                <LocalText id="owMethod1" />
              </Button>
              <Button onClick={handleSelect} name="pk">
                <LocalText id="owMethod2" />
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            {method === 'ks' ? (
              <div>
                <div className={styles.field}>
                  <p className={styles.title}>
                    <LocalText id="owMethod1Field1" />
                  </p>
                  <Upload
                    beforeUpload={handleUpload}
                    fileList={fileList}
                    onRemove={() => setFileList([])}
                  >
                    <Button className={styles.upload}>
                      <Icon type="upload" />
                      <LocalText id="owMethod1Field2" />
                    </Button>
                  </Upload>
                </div>

                <div className={styles.field}>
                  <p className={styles.title}>
                    <LocalText id="owMethod1Field3" />
                  </p>
                  <Input.Password
                    placeholder={props.locale[props.language].owMethod1Ph}
                    name="password"
                    onChange={handleInputChange}
                    value={password}
                  />
                </div>
              </div>
            ) : (
              <Fragment>
                <p className={styles.title}>
                  <LocalText id="owMethod2Field1" />
                </p>
                <Input.Password
                  placeholder={props.locale[props.language].owMethod2Ph}
                  name="privateKey"
                  onChange={handleInputChange}
                  value={privateKey}
                />
              </Fragment>
            )}

            <Button
              disabled={!canSubmit}
              type="primary"
              onClick={handleOpenWallet}
            >
              <LocalText id="owBtn" />
            </Button>
          </div>
        </div>
      </div>
    )
  })
)
