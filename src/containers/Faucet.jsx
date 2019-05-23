import React, { useState, useEffect } from 'react'
import { Button, Input, Modal, Icon } from 'antd'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Banner from 'components/FaucetBanner'
import Margin from 'components/Margin'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'

import apis from 'utils/apis'
import r from 'constants/routes'

import styles from './Faucet.scss'

const mapStateToProps = ({ faucet: { res, error } }) => {
  return {
    res,
    error
  }
}

export default connect(mapStateToProps)(
  withLang(function Faucet(props) {
    const [inputV, setInputV] = useState('')
    const [modal, setModal] = useState({
      content: null,
      visible: false
    })
    const [err, setErr] = useState(null)
    const handleInputChange = e => {
      setInputV(e.target.value.trim())
    }
    const handleSubmit = () => {
      setErr(null)
      props.dispatch({
        type: 'faucet/reset'
      })
      props.dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          method: 'post',
          path: apis.faucet,
          ns: 'faucet',
          field: 'res',
          data: {
            address: inputV
          }
        }
      })
    }

    useEffect(() => {
      return () => {
        props.dispatch({
          type: 'faucet/reset'
        })
      }
    }, [])

    useEffect(
      () => {
        if (props.res) {
          // eslint-disable-next-line
          const {data, error, isLoading } = props.res
          if (error) {
            let Err = ''
            if (error === 'wrong_address') {
              Err = (
                <span>
                  <LocalText id={error} />
                  <Link to={r['create-wallet']}>
                    <LocalText id="new_address" />
                  </Link>
                </span>
              )
            } else {
              Err = <LocalText id={error} />
            }
            setErr(Err)
          } else if (data) {
            setModal({
              visible: true,
              content: <LocalText id="successInfo" />
            })
          }
        }
      },
      [props.res]
    )

    return (
      <div className={styles.faucet}>
        <Banner mainTitle="tnfBanner" subTitle="tnfBannerSubTitle" />

        <Margin size="medium" />

        <div className={styles.main}>
          <h3 className={styles.title}>
            <LocalText id="tnfTitle" />
          </h3>

          <Input
            value={inputV}
            onChange={handleInputChange}
            placeholder={props.locale[props.language].tnfPlaceholder1}
          />

          <Button
            disabled={inputV === ''}
            onClick={handleSubmit}
            type="primary"
          >
            <LocalText id="tnfBtn" />
          </Button>
          {err ? <p>{err}</p> : <p>&nbsp;</p>}
        </div>

        <Modal
          title={<LocalText id="nav2Sub3" />}
          visible={modal.visible}
          onOk={() =>
            setModal({
              visible: false,
              content: null
            })
          }
          onCancel={() =>
            setModal({
              visible: false,
              content: null
            })
          }
          footer={null}
        >
          <div className={styles.modal}>
            <Icon
              type="check-circle"
              style={{ color: '#3389ff', fontSize: '.44rem' }}
            />
            <p>{modal.content}</p>
            <Button
              type="primary"
              onClick={() => props.dispatch(push(r.wallet))}
            >
              <LocalText id="waTitle" />
            </Button>
          </div>
        </Modal>
      </div>
    )
  })
)
