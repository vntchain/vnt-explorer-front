import React, { useState } from 'react'
import { Steps } from 'antd'

import Banner from 'components/Banner'
import Margin from 'components/Margin'
import InputPassword from 'components/newWallet/InputPassword'
import SaveKeystore from 'components/newWallet/SaveKeystore'
import SavePrivateKey from 'components/newWallet/SavePK'

import LocalText from 'i18n/LocalText'

import styles from './NewWallet.scss'

const Step = Steps.Step

export default function NewWallet() {
  const [currentStep, setCurrentStep] = useState(0)
  const [keyStore, setKeyStore] = useState(null)
  const [account, setAccount] = useState(null)

  return (
    <div className={styles.newWallet}>
      <Banner id="CWBanner" />
      <Margin />

      <div className={styles.main}>
        <div className={styles.steps}>
          <Steps current={currentStep}>
            <Step key={1} title={<LocalText id="stage1" />} />
            <Step key={2} title={<LocalText id="stage2" />} />
            <Step key={3} title={<LocalText id="stage3" />} />
          </Steps>
        </div>

        <div className={styles.content}>
          {currentStep === 0 ? (
            <InputPassword
              setKS={ks => setKeyStore(ks)}
              setAcc={pk => setAccount(pk)}
              next={setCurrentStep}
            />
          ) : currentStep === 1 ? (
            <SaveKeystore ks={keyStore} next={setCurrentStep} />
          ) : (
            <SavePrivateKey account={account} />
          )}
        </div>
      </div>
    </div>
  )
}
