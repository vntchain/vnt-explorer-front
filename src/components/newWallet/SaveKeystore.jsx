import React from 'react'
import { Button } from 'antd'

import LocalText from 'i18n/LocalText'

import styles from './NWallet.scss'

export default function SaveKeystore(props) {
  const { next } = props
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>
        <LocalText id="st2Title" />
      </h3>

      <Button size="large" type="primary" block>
        <a
          href={
            'data:application/octet-stream;charset=utf-8;base64,' +
            window.btoa(JSON.stringify(props.ks))
          }
          download={new Date().toUTCString()}
        >
          <LocalText id="st2Btn1" />
        </a>
      </Button>

      <ul className={styles.list}>
        <li>
          {'- '}
          <LocalText id="st2Note1" />
        </li>
        <li>
          {'- '}
          <LocalText id="st2Note2" />
        </li>
        <li>
          {'- '}
          <LocalText id="st2Note3" />
        </li>
      </ul>

      <Button
        style={{ backgroundColor: '#ff8103', borderColor: '#ff8103' }}
        size="large"
        type="primary"
        block
        onClick={() => next(2)}
      >
        <LocalText id="st2Btn2" />
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
