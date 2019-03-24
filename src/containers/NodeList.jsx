import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'

import LocalText from 'i18n/LocalText'

import List from 'components/superNodes/List'
import Tabs from 'components/Tabs'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function Nodes(props) {
  var tabs = [
    {
      btnName: <LocalText id="snNav1" />,
      comp: (
        <Fragment key="1">
          <List key="list" />
        </Fragment>
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
