import React from 'react'

import DataProvider from 'containers/RPDataProvider'
import BlockBrief from './BlockBrief'
import TxBrief from './TxBrief'
import ErrorMessenger from 'components/ErrorMessenger'
import apis from 'utils/apis'

import styles from './BlockTx.scss'

const pollingInterval = 400

export default function BlockTx(props) {
  return (
    <div className={styles['block-tx']}>
      <DataProvider
        options={{
          path: apis.blocks + '?offset=0&limit=5',
          type: 'blocks/setBlocks',
          ns: 'blocks',
          polling: pollingInterval
        }}
        render={data => (
          <BlockBrief
            context={data}
            errComp={<ErrorMessenger msg={data.error} />}
          />
        )}
      />
      <TxBrief dataTemp={props.data.txs} />
    </div>
  )
}
