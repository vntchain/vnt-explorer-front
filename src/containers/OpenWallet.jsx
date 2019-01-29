import React, { useState, Fragment } from 'react'
import { Button, Input, Upload, Icon } from 'antd'
import { connect } from 'react-redux'

import Banner from 'components/Banner'
import docs from 'constants/docs/wallet'
import index from 'utils/locale'

import styles from './OpenWallet.scss'

const NS = 'open'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function OpenWallet(props) {
  const handleSelect = e => {
    if (e.target.name !== method) {
      if (e.target.name === 'pk') {
        if (document.querySelector(`.${styles.defaultSelect}`)) {
          document
            .querySelector(`.${styles.defaultSelect}`)
            .classList.remove(styles.defaultSelect)
        }
      }
      setMethod(e.target.name)
    }
  }

  const handleOpenWallet = () => {
    props.dispatch({
      type: 'auth/setAuth',
      payload: true
    })
    props.history.push('account')
  }
  const [method, setMethod] = useState('ks')
  return (
    <div className={styles.open}>
      <Banner title={docs[NS].mainTitle[index(props.language)]} />

      <div className={styles.main}>
        <div className={styles.openMethod}>
          <p className={styles.title}>
            {`${docs[NS].title1[index(props.language)]}：`}
          </p>
          <div className={styles.btns}>
            <Button
              onClick={handleSelect}
              name="ks"
              className={styles.defaultSelect}
            >
              {docs[NS].btn1[index(props.language)]}
            </Button>
            <Button onClick={handleSelect} name="pk">
              {docs[NS].btn2[index(props.language)]}
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          {method === 'ks' && (
            <Fragment>
              <p className={styles.title}>{`${
                docs[NS].title3[index(props.language)]
              }：`}</p>
              <Upload>
                <Button className={styles.upload}>
                  <Icon type="upload" />
                  {docs[NS].upload[index(props.language)]}
                </Button>
              </Upload>
            </Fragment>
          )}

          <p className={styles.title}>
            {method === 'ks'
              ? `${docs[NS].title4[index(props.language)]}：`
              : `${docs[NS].title2[index(props.language)]}：`}
          </p>
          <Input
            placeholder={
              method === 'ks'
                ? `${docs[NS].inputPlaceholder1[index(props.language)]}：`
                : `${docs[NS].inputPlaceholder2[index(props.language)]}：`
            }
          />
          <Button type="primary" onClick={handleOpenWallet}>
            {docs[NS].btn3[index(props.language)]}
          </Button>
        </div>
      </div>
    </div>
  )
})
