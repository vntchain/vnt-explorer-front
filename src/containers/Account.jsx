import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import Title from 'components/Title'
import index from 'utils/locale'

import styles from './Account.scss'

const docs = {
  title: ['钱包账户', 'Account'],
  row1: ['可用余额', 'Balance'],
  row2: ['地址', 'Address'],
  row3: ['发送/接收', 'Send/Receive']
}

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Account(props) {
  return (
    <div className={styles.main}>
      <Title title={props.language === 'cn' ? '钱包账户' : 'Account'} />

      <table className={styles.overview}>
        <tbody>
          <tr>
            <td>{docs.row1[index(props.language)] + ':'}</td>
            <td>
              190,799,314.
              <span>8191446255192630</span> VNT
            </td>
          </tr>
          <tr>
            <td>{docs.row2[index(props.language)] + ':'}</td>
            <td>
              0x19b685a1b66b4bd65660dbfd274721c2dda8a66a20c8fda8d4150c9a6474569d
            </td>
          </tr>
          <tr>
            <td>{docs.row3[index(props.language)] + ':'}</td>
            <td>
              <Button
                style={{ backgroundColor: '#4cc159', borderColor: '#4cc159' }}
                type="primary"
              >
                {docs.row3[index(props.language)].split('/')[0]}
              </Button>
              <Button type="primary">
                {docs.row3[index(props.language)].split('/')[1]}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})
