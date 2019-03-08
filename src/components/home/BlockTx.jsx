import React from 'react'

import DataProvider from 'containers/RPDataProvider'
import BlockBrief from './BlockBrief'
import TxBrief from './TxBrief'
import ErrorMessenger from 'components/ErrorMessenger'
import apis from 'utils/apis'
import { pollingInterval } from 'constants/config'

import styles from './BlockTx.scss'

export default function BlockTx() {
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
      <DataProvider
        options={{
          path: apis.txs + '?offset=0&limit=5',
          type: 'transactions/setTxs',
          ns: 'transactions',
          polling: pollingInterval
        }}
        render={data => (
          <TxBrief
            context={data}
            errComp={<ErrorMessenger msg={data.error} />}
          />
        )}
      />
    </div>
  )
}
