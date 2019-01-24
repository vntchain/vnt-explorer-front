import React from 'react'
import { Button } from 'antd'

import styles from './NWallet.scss'

export default function SaveKeystore(props) {
  const { lang, index, data, next } = props
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{data.title[index(lang)]}</h3>
      <Button size="large" type="primary" block>
        {data.buttonName[index(lang)]}
      </Button>
      <ul className={styles.list}>
        {data.notes.map(item => (
          <li key={item[index(lang)]}>{`- ${item[index(lang)]}`}</li>
        ))}
      </ul>
      <Button
        style={{ backgroundColor: '#ff8103', borderColor: '#ff8103' }}
        size="large"
        type="primary"
        block
        onClick={() => next(2)}
      >
        {data.buttonNext[index(lang)]}
      </Button>
    </div>
  )
}

// check mobile download
// https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
// https://github.com/rndme/download
{
  /* <a href="data:application/octet-stream;charset=utf-8;base64,Zm9vIGJhcg==">text file</a><br/> */
}
{
  /* <a href="data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A">CSV</a> */
}
