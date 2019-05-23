import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select, Tooltip, message } from 'antd'
import { push } from 'react-router-redux'
import VNT from 'vnt'

import PrimaryTitle from 'components/PrimaryTitle'
import withLang from 'i18n/withLang'
import LocalText from 'i18n/LocalText'
import Margin from 'components/Margin'
import Banner from 'components/Banner'
import apis from 'utils/apis'
import r from 'constants/routes'
import { rpc } from 'constants/config'

import styles from './SendReceive.scss'

const { Option } = Select
const { Search } = Input

const vnt = new VNT(new VNT.providers.HttpProvider(rpc))

const mapStateToProps = ({
  auth: { account },
  accounts: { accounts, accountDetail },
  wallet
}) => {
  return {
    account,
    accounts,
    accountDetail,
    wallet
  }
}
// /^[0-9]*[.]?[0-9]+$/.test("100000")

export default withLang(
  connect(mapStateToProps)(function Send(props) {
    const { account, accounts, accountDetail, wallet } = props
    useEffect(() => {
      props.dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: `${apis.accounts}/?isToken=1`,
          ns: 'accounts',
          field: 'accounts'
        }
      })
      return () => {
        props.dispatch({
          type: 'wallet/setSendResult',
          payload: null
        })
      }
    }, [])

    const tokens = [{ name: 'VNT', address: null }]
    if (accounts && accounts.data) {
      accounts.data.forEach(token =>
        tokens.push({
          name: token.TokenSymbol,
          address: token.Address
        })
      )
    }

    /* const [token, setToken] = useState('')
    const [receAddr, setReceAddr] = useState(
      '0x41ca2ead138a4ed189aab9e8b91c90d70a2fc2da'
    )
    const [amount, setAmount] = useState('')
    const [extraData, setExtraData] = useState('vnt') */

    const [token, setToken] = useState('')
    const [receAddr, setReceAddr] = useState('')
    const [amount, setAmount] = useState('')
    const [extraData, setExtraData] = useState('')
    const [addrErr, setAddrErr] = useState(false)
    const [txSended, setTxSended] = useState(false)

    useEffect(
      () => {
        if (wallet.sendResult && wallet.sendResult.err) {
          message.error(wallet.sendResult.err)
        } else if (wallet.sendResult && wallet.sendResult.txHash) {
          setTxSended(true)
        }
      },
      [wallet.sendResult]
    )

    let balance = '-'
    if (token) {
      balance = {}
      const t = JSON.parse(token)
      if (t.name === 'VNT') {
        balance.amount =
          accountDetail && accountDetail.data ? accountDetail.data.Balance : 0
      } else if (wallet.tokenInfo !== null) {
        balance.amount =
          wallet.tokenInfo.amount / Math.pow(10, wallet.tokenInfo.digit)
      } else {
        balance.amount = 0
      }
      balance.symbol = ` ${t.name}`
    }

    const approveSendTx = () => {
      if (receAddr && !addrErr && amount && parseFloat(amount, 10) !== 0) {
        if (balance.symbol && balance.symbol.includes('VNT')) {
          if (parseFloat(amount, 10) >= 0.00000001) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
      return false
    }

    const handleUserInput = e => {
      // 币种选择器
      if (typeof e === 'string') {
        setToken(e)
        const t = JSON.parse(e)
        if (t.name === 'VNT') {
          props.dispatch({
            type: 'dataRelayNew/fetchData',
            payload: {
              path: `${apis.accountDetail}/${props.account.address}`,
              ns: 'accounts',
              field: 'accountDetail'
            }
          })
        } else {
          props.dispatch({
            type: 'wallet/getERCTokenInfo',
            payload: {
              contractAddr: t.address,
              addr: account.address
            }
          })
        }
        setAmount('')
      } else {
        const {
          target: { name, value }
        } = e
        switch (name) {
          case 'receiver':
            setAddrErr(null)
            setReceAddr(value.trim())
            break
          case 'amount':
            if (
              amount.includes('.') &&
              (value.trim().match(/[.]/g) || []).length > 1
            ) {
              // 不允许多个小数点
              break
            } else if (
              balance !== '-' &&
              parseFloat(value.trim(), 10) <= parseFloat(balance.amount, 10)
            ) {
              setAmount(value.trim())
            } else if (value.trim() === '') {
              setAmount('')
            }
            break
          case 'extraData':
            setExtraData(value)
            break
        }
      }
    }
    // 需估算 Gas
    const setAmountAll = () => {
      if (balance !== '-') {
        setAmount(balance.amount)
      }
    }
    const validateInput = e => {
      if (e.target.value && !vnt.isAddress(e.target.value)) {
        setAddrErr(true)
      }
    }

    const handleSendTx = () => {
      props.dispatch({
        type: 'wallet/sendTx',
        payload: {
          token: JSON.parse(token),
          amount,
          receAddr,
          sender: {
            address: account.address,
            privateKey: account.pk
          },
          extraData
        }
      })
    }

    return (
      <div className={styles.main}>
        {txSended ? (
          <div>
            <PrimaryTitle
              id="tdpTitle"
              options={{
                suffix: wallet.sendResult.txHash,
                requireCopy: true,
                requireQR: false
              }}
            />
            <p>
              <LocalText id="txSended" />
            </p>
            <Button
              type="primary"
              onClick={() => props.dispatch(push(r.wallet))}
            >
              <LocalText id="goBack" />
            </Button>
          </div>
        ) : (
          <Fragment>
            <Banner id="spBanner" />
            <Margin />

            <div className={styles.content}>
              <div className={styles.field}>
                <p className={styles.title}>
                  <LocalText id="spTitle1" />
                </p>
                <span className={styles.addr}>{props.account.address}</span>
              </div>

              <div className={styles.field}>
                <p className={styles.title}>
                  <LocalText id="spTitle2" />
                </p>
                <Tooltip
                  title={props.locale[props.language].invalidAddr}
                  placement="topRight"
                  visible={addrErr}
                  mouseLeaveDelay={0}
                  mouseEnterDelay={0}
                >
                  <Input
                    onBlur={validateInput}
                    onChange={handleUserInput}
                    name="receiver"
                    value={receAddr}
                    placeholder={props.locale[props.language].spPh1}
                  />
                </Tooltip>
              </div>

              <div className={styles.field}>
                <p className={styles.title}>
                  <LocalText id="spTitle3" />
                </p>
                <Select
                  onChange={handleUserInput}
                  value={token}
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tokens.map((t, i) => (
                    <Option key={t.name + i} value={JSON.stringify(t)}>
                      {t.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className={styles.field}>
                <p className={styles.title}>
                  <LocalText id="spTitle4" />
                </p>
                <Search
                  placeholder={props.locale[props.language].spPh2}
                  enterButton={<LocalText id="spBtn1" />}
                  size="large"
                  onSearch={setAmountAll}
                  name="amount"
                  value={amount}
                  onChange={handleUserInput}
                />
                {balance.symbol &&
                  balance.symbol.includes('VNT') && (
                    <p className={styles.sendMsg}>
                      <LocalText id="sendTip" />
                      <span>0.00000001 VNT</span>
                    </p>
                  )}
                <p className={styles.balance}>
                  <LocalText id="spField1" />
                  {balance === '-' ? '-' : balance.amount + balance.symbol}
                </p>
              </div>

              {token &&
                token.includes('VNT') && (
                  <div className={styles.field}>
                    <p className={styles.title}>
                      <LocalText id="spTitle5" />
                    </p>
                    <Input.TextArea
                      onChange={handleUserInput}
                      name="extraData"
                      rows={4}
                      placeholder={props.locale[props.language].spPh3}
                      value={extraData}
                    />
                  </div>
                )}

              <div className={styles.field}>
                <Button
                  disabled={!approveSendTx()}
                  type="primary"
                  onClick={handleSendTx}
                >
                  <LocalText id="spBtn2" />
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  })
)

/*
0xa3cc5befeb1fd24b0b699b522da616cc55ce3a83472ef0f80fca156b18de1635

0x41ca2ead138a4ed189aab9e8b91c90d70a2fc2da

111111


inf
0x122369f04f32269598789998de33e3d56e2c507a
0xac355731983f9ad945b642f15ed60022fa4aeb8f5c069d4f15a24c4b5100195b
*/
