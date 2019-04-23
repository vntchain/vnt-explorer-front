import React, { useState } from 'react'
import { Button, Input } from 'antd'
import elliptic from 'elliptic'
import * as vntKit from 'vnt-kit'

import withLang from 'i18n/withLang'
import LocalText from 'i18n/LocalText'

import styles from './NWallet.scss'

const genPrivateKey = () =>
  '0x' +
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

    const keyStore = vntKit.account.encrypt(pk, password)
    setKS(keyStore)
    setAcc({
      privateKey: pk,
      address: '0x' + keyStore.address
    })

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

export default withLang(InputPassword)
