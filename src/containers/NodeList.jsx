import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
import List from 'components/superNodes/List'
import Tabs from 'components/Tabs'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function Nodes(props) {
  const urlPath = location.pathname.split('/').filter(item => item)
  let currentIndex = 1
  if (urlPath.length > 0 && !isNaN(parseInt(urlPath[urlPath.length - 1], 10))) {
    currentIndex = parseInt(urlPath[urlPath.length - 1], 10)
  }

  var tabs = [
    {
      btnName: <LocalText id="adpField4" />,
      comp: (
        <Fragment key="1">
          {/* 获取当前账户所有交易，为计算交易数 */}
          <List key="list" />
        </Fragment>
      )
    }
  ]

  return (
    <div>
      <Title
        titleID="snTitle"
      />

      <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
    </div>
  )
})
