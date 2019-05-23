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
  const [errorMode, setErrorMode] = useState(0)
  const { locale, language, setKS, setAcc, next } = props

  const handleInput = e => {
    setPassword(e.target.value)
  }

  const checkStrong = pwd => {
    let mode = 0
    if (!pwd.match(/\d+/)) {
      mode = 1
    } else if (!pwd.match(/[a-zA-Z]+/)) {
      mode = 2
    }
    return mode
  }

  const handleCreate = () => {
    const strongMode = checkStrong(password)
    if (!strongMode) {
      const pk = genPrivateKey()
      const keyStore = vntKit.account.encrypt(pk, password)
      setKS(keyStore)
      setAcc({
        privateKey: pk,
        address: '0x' + keyStore.address
      })
      next(1)
    }
    setErrorMode(strongMode)
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
      <div className={styles.error}>
        {errorMode ? <LocalText id={`st1NoteError${errorMode}`} /> : <span />}
      </div>

      <Button
        disabled={password.length < 8 || password.length > 16}
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
