import React from 'react'
import { connect } from 'react-redux'

import PrimaryTitle from 'components/PrimaryTitle'
import LocalText from 'i18n/LocalText'
import NodeList from 'components/superNodes/NodeList'
// import Map from 'components/superNodes/Map'
import RPDataProviderAll from './RPDataProviderAll'
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
        <RPDataProviderAll
          optionsArr={[
            {
              path: `${apis.nodes}?offset=${(currentIndex - 1) *
                pageSize}&limit=${pageSize}`,
              ns: 'nodes',
              field: 'nodes'
            },
            {
              path: apis.nodesCount,
              ns: 'nodesCount',
              field: 'nodesCount'
            }
          ]}
          render={data => 
            <NodeList
              context={data}
              currentIndex={currentIndex}
              basePath={`${apis.nodes}?limit=${pageSize}`}
            />}
        />
      )
    }
    // {
    //   btnName: <LocalText id="snNav2" />,
    //   comp: (
    //     <DataProvider
    //       options={{
    //         path: `${apis.nodes}?offset=${(currentIndex - 1) *
    //           pageSize}&limit=${pageSize}`,
    //         ns: 'nodes',
    //         field: 'nodes'
    //       }}
    //       render={data => (
    //         <Map
    //           context={data}
    //           currentIndex={currentIndex}
    //           basePath={`${apis.nodes}?limit=${pageSize}`}
    //         />
    //       )}
    //     />
    //   )
    // }
  ]

  return (
    <div>
      <PrimaryTitle id="snTitle" />

      <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
    </div>
  )
})
