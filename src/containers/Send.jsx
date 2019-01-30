import React from 'react'
import { connect } from 'react-redux'
import { Input, Select } from 'antd'

import Banner from 'components/Banner'
import docs from 'constants/docs/wallet'
import index from 'utils/locale'

import styles from './SendReceive.scss'

const NS = 'send'
const { Option } = Select
const { Search } = Input

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Receive(props) {
  return (
    <div className={styles.main}>
      <Banner title={docs[NS].main[index(props.language)]} />
      <div className={styles.content}>
        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title1[index(props.language)]}
          </p>
          <span className={styles.addr}>
            0x19b685a1b66b4bd65660dbfd274721c2dda8a66a20c8fda8d4150c9a6474569d
          </span>
        </div>

        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title2[index(props.language)]}
          </p>
          <Input placeholder={docs[NS].ph1[index(props.language)]} />
        </div>

        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title3[index(props.language)]}
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>

        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title4[index(props.language)]}
          </p>
          <Search
            placeholder={docs[NS].ph2[index(props.language)]}
            enterButton={docs[NS].btn1[index(props.language)]}
            size="large"
            onSearch={value => value}
          />
          <p className={styles.balance}>
            {docs[NS].balance[index(props.language)] + ': '}
            38374.
            <span>484533</span> VNT
          </p>
        </div>

        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title5[index(props.language)]}
          </p>
          <Input.TextArea
            rows={4}
            placeholder={docs[NS].ph3[index(props.language)]}
          />
        </div>
      </div>
    </div>
  )
})
