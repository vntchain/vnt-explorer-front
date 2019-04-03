import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'

import contractIcon from 'assets/images/合约.png'
import txIcon from 'assets/images/icon-trading.png'
import styles from './BlockTx.scss'

export default withLang(function TxBrief(props) {
  const formattedData = data => {
    return data.map(item => ({
      from: item.From,
      to: {
        isNull: !item.To ? true : false,
        isContract: item.To ? item.To.isContract : false,
        isToken: item.To ? item.To.isToken : false,
        name: item.To ? item.To.ContractName : '',
        value: item.To ? item.To.Address : ''
      },
      txHash: item.Hash,
      timeStamp: item.TimeStamp,
      amount: item.Value
    }))
  }
  return (
    <div className={`${styles.section} ${styles['section--2']}`}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span>
            <LocalText id="rTitle" />
          </span>
        </div>

        {props.context &&
          props.context.data &&
          props.context.data.length > 0 && (
            <span>
              <Link to="/txs">
                <LocalText id="rField1" />
              </Link>
            </span>
          )}
      </div>

      {props.context &&
        props.context.error && <Fragment>{props.errComp}</Fragment>}

      {props.context &&
        props.context.data &&
        props.context.data.length > 0 && (
          <Fragment>
            {formattedData(props.context.data).map((item, i) => (
              <div className={styles.content} key={JSON.stringify(item) + i}>
                <div className={styles.item}>
                  <div
                    className={`${styles['item__row']} ${
                      styles['item__row--1']
                    }`}
                  >
                    <img src={txIcon} alt="" />
                    <span>{item.txHash.slice(0, 24) + '...'}</span>
                  </div>

                  <div
                    className={`${styles['item__row']} ${
                      styles['item__row--resp']
                    }`}
                  >
                    <span>
                      <LocalText id="rField2" />
                      <Link to={`/account/${item.from}`}>
                        {item.from.slice(0, 15) + '...'}
                      </Link>
                    </span>
                    <span>
                      <LocalText id="rField3" />
                      {(function() {
                        if (item.to.isNull) {
                          return '-'
                        }

                        if (item.to.isToken || item.to.isContract) {
                          var url = item.to.isToken ? '/token/' : '/contract/'
                          url = url + item.to.value
                          return (
                            <Link to={url}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <img src={contractIcon} alt="contract icon" />
                                &nbsp;
                                {item.to.name ||
                                  ' ' + item.to.value.slice(0, 12) + '...'}
                              </div>
                            </Link>
                          )
                        }

                        return (
                          <Link to={`/account/${item.to.value}`}>
                            {item.to.value.slice(0, 12) + '...'}
                          </Link>
                        )
                      })()}
                    </span>
                    <span>
                      <LocalText id="rField4" />
                      {item.amount.slice(0, 8) + '... VNT'}
                    </span>
                    <span>{calcAge(item.timeStamp, props.language)}</span>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )}
    </div>
  )
})
