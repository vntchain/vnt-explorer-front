import React from 'react'
import { connect } from 'react-redux'

import Title from 'components/Title'
import LocalText from 'i18n/LocalText'
import NodeList from 'components/superNodes/ListNew'
import DataProvider from 'containers/RPDataProviderNew'
import { pageSize } from 'constants/config'
import Tabs from 'components/Tabs'
import apis from 'utils/apis'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function Nodes(props) {
  const currentIndex = (() => {
    const a = location.pathname.split('/')
    const index = isNaN(parseInt(a[a.length - 1], 10))
      ? 1
      : parseInt(a[a.length - 1], 10)
    return index
  })()

  var tabs = [
    {
      btnName: <LocalText id="snNav1" />,
      comp: (
        <DataProvider
          options={{
            path: `${apis.nodes}?offset=${(currentIndex - 1) *
              pageSize}&limit=${pageSize}`,
            ns: 'nodes',
            field: 'nodes'
          }}
          render={data => (
            <NodeList
              context={data}
              currentIndex={currentIndex}
              basePath={`${apis.nodes}?limit=${pageSize}`}
            />
          )}
        />
      )
    }
  ]

  return (
    <div>
      <Title titleID="snTitle" />

      <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
    </div>
  )
})
