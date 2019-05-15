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
        isContract: item.To ? item.To.IsContract : false,
        isToken: item.To ? item.To.IsToken : false,
        name: item.To ? item.To.ContractName : '',
        value: item.To ? item.To.Address : ''
      },
      txHash: item.Hash,
      timeStamp: item.TimeStamp,
      amount: item.Value
    }))
  }
  return (
    <Fragment>
      {formattedData(props.data).map((item, i) => (
        <div className={styles.content} key={JSON.stringify(item) + i}>
          <div className={styles.item}>
            <div className={`${styles['item__row']} ${styles['item__row--1']}`}>
              <img className={styles.icon} src={txIcon} alt="" />
              <span>
                <Link to={`/transaction/${item.txHash}`}>
                  {item.txHash.slice(0, 24) + '...'}
                </Link>
              </span>
            </div>

            <div
              className={`${styles['item__row']} ${styles['item__row--resp']}`}
            >
              <span>
                <LocalText id="rField2" />
                <Link to={`/account/${item.from}`}>
                  {item.from.slice(0, 15) + '...'}
                </Link>
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
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
                            display: 'inline-flex',
                            alignItems: 'baseline'
                          }}
                        >
                          <img
                            className="contractIcon"
                            src={contractIcon}
                            alt="contract icon"
                          />
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
                {String(item.amount).length > 10
                  ? item.amount.slice(0, 8) + '... VNT'
                  : item.amount + ' VNT'}
                {/* {item.amount.slice(0, 8) + '... VNT'} */}
              </span>
              <span>{calcAge(item.timeStamp, props.language)}</span>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
})
