import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Select } from 'antd'

import withLang from 'i18n/withLang'
import LocalText from 'i18n/LocalText'
import Margin from 'components/Margin'
import Banner from 'components/Banner'

import styles from './SendReceive.scss'

const { Option } = Select
const { Search } = Input

const mapStateToProps = ({ auth: { account } }) => {
  return {
    account
  }
}

export default withLang(
  connect(mapStateToProps)(function Receive(props) {
    return (
      <div className={styles.main}>
        <Banner id="spBanner" />
        <Margin />

        <div className={styles.content}>
          <div className={styles.field}>
            <p className={styles.title}>
              <LocalText id="spTitle1" />
            </p>
            <span className={styles.addr}>--</span>
          </div>

          <div className={styles.field}>
            <p className={styles.title}>
              <LocalText id="spTitle2" />
            </p>
            <Input placeholder={props.locale[props.language].spPh1} />
          </div>

          <div className={styles.field}>
            <p className={styles.title}>
              <LocalText id="spTitle3" />
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
              <LocalText id="spTitle4" />
            </p>
            <Search
              placeholder={props.locale[props.language].spPh2}
              enterButton={<LocalText id="spBtn1" />}
              size="large"
              onSearch={value => value}
            />
            <p className={styles.balance}>
              <LocalText id="spField1" />
              --
            </p>
          </div>

          <div className={styles.field}>
            <p className={styles.title}>
              <LocalText id="spTitle5" />
            </p>
            <Input.TextArea
              rows={4}
              placeholder={props.locale[props.language].spPh3}
            />
          </div>

          <div className={styles.field}>
            <Button type="primary">
              <LocalText id="spBtn2" />
            </Button>
          </div>
        </div>
      </div>
    )
  })
)
