import React from 'react'
import { connect } from 'react-redux'

import Title from 'components/Title'
import Tabs from 'components/Tabs'
import List from 'components/superNodes/List'
import NodeMap from 'components/superNodes/Map'

import styles from './Common.scss'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

const tabs = [
  ['列表', 'List', <List key="list" />],
  ['地图', 'Map', <NodeMap key="nodeMap" />]
]

export default connect(mapStateToProps)(function SuperNode(props) {
  return (
    <div className={styles.main}>
      <Title title={props.language === 'cn' ? '超级节点' : 'Super Nodes'} />

      <Tabs tabs={tabs} language={props.language} />
    </div>
  )
})
