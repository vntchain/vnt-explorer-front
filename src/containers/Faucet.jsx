import React, { useState, useEffect } from 'react'
import { Button, Input, message } from 'antd'
import { connect } from 'react-redux'

import Banner from 'components/Banner'
import Margin from 'components/Margin'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'

import apis from 'utils/apis'

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
    const handleInputChange = e => {
      setInputV(e.target.value.trim())
    }
    const handleSubmit = () => {
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
        if (props.error) {
          message.error(props.locale[props.language][props.error])
        } else if (props.res && props.res.data) {
          message.info(props.locale[props.language].successInfo)
          // setInputV('')
        }
      },
      [props.error, props.res]
    )

    return (
      <div className={styles.faucet}>
        <Banner id="tnfBanner" />

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
        </div>
      </div>
    )
  })
)
