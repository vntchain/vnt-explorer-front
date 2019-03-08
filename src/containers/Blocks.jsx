import React from 'react'
import Title from 'components/Title'
import Table from 'components/PagedTable'

import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'

export default function Blocks() {
  return (
    <div>
      <DataProvider
        options={{
          path: apis.blockCount,
          ns: 'blocks',
          field: 'count'
        }}
        render={data => (
          <Title titleID="blpTitle" subTitleID="blpSubTitle" context={data} />
        )}
      />
      <Table />
    </div>
  )
}
