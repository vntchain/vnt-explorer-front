import React, { useState } from 'react'
import { Button, Input } from 'antd'
import elliptic from 'elliptic'
import * as vntKit from 'vnt-kit'

import hocLangPasser from 'i18n/hocLangPasser'
import LocalText from 'i18n/LocalText'

import styles from './NWallet.scss'

const genPrivateKey = () =>
  new elliptic.ec('secp256k1')
    .genKeyPair()
    .getPrivate()
    .toString('hex')

function InputPassword(props) {
  const [password, setPassword] = useState('')
  const { locale, language, setKS, setAcc, next } = props

  const handleInput = e => {
    setPassword(e.target.value)
  }

  const handleCreate = () => {
    const pk = genPrivateKey()

    /* eslint-disable */
    console.log('%c%s\n%cprivate key: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', pk)
    /* eslint-enable */

    const keyStore = vntKit.account.encrypt(pk, password)
    setKS(keyStore)
    setAcc({
      privateKey: pk,
      address: keyStore.address
    })

    /* eslint-disable */
    console.log('%c%s\n%ckey store: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', )
    console.dir(keyStore)
    /* eslint-enable */

    next(1)
  }
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>
        <LocalText id="st1Title" />
      </h3>

      <ul className={styles.list}>
        <li>
          {'- '}
          <LocalText id="st1Note1" />
        </li>
        <li>
          {'- '}
          <LocalText id="st1Note2" />
        </li>
      </ul>

      <Input.Password
        size="large"
        placeholder={locale[language]['st1InputPH']}
        onChange={handleInput}
      />

      <Button
        disabled={password.length < 6}
        size="large"
        type="primary"
        block
        onClick={handleCreate}
      >
        <LocalText id="st1Btn" />
      </Button>
    </div>
  )
}

export default hocLangPasser(InputPassword)
