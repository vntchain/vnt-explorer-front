import React from 'react'

import DataProvider from 'containers/RPDataProviderNew'
import BriefBox from 'components/home/BriefBox'
import BriefBlockBox from 'components/home/BriefBlockBox'
import BriefTxBox from 'components/home/BriefTxBox'

import apis from 'utils/apis'
import r from 'constants/routes'

import styles from './BlockTx.scss'

export default function BlockTx() {
  return (
    <div className={styles['block-tx']}>
      <DataProvider
        options={{
          path: apis.blocks + '?offset=0&limit=5',
          ns: 'blocks',
          field: 'blocks',
          polling: 2
        }}
        render={data => (
          <BriefBox
            context={data}
            comp={BriefBlockBox}
            title="lTitle"
            redirect={r.blockList}
          />
        )}
      />

      <DataProvider
        options={{
          path: apis.txs + '?offset=0&limit=5',
          ns: 'transactions',
          field: 'txs',
          polling: 5
        }}
        render={data => (
          <BriefBox
            context={data}
            comp={BriefTxBox}
            title="rTitle"
            redirect={r.txList}
          />
        )}
      />
    </div>
  )
}
