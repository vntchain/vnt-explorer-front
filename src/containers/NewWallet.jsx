import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Steps } from 'antd'

import Banner from 'components/Banner'
import InputPassword from 'components/newWallet/InputPassword'
import SaveKeystore from 'components/newWallet/SaveKeystore'
import SavePrivateKey from 'components/newWallet/SavePK'
import docs from 'constants/docs/wallet'
import index from 'utils/locale'

import styles from './NewWallet.scss'

const NS = 'create'
const Step = Steps.Step

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function NewWallet(props) {
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <div className={styles.newWallet}>
      <Banner title={docs[NS].mainTitle[index(props.language)]} />
      <div className={styles.main}>
        <div className={styles.steps}>
          <Steps current={currentStep}>
            {docs[NS].steps.map(item => (
              <Step
                key={item[index(props.language)]}
                title={item[index(props.language)]}
              />
            ))}
          </Steps>
        </div>

        <div className={styles.content}>
          {currentStep === 0 ? (
            <InputPassword
              data={docs[NS].password}
              lang={props.language}
              index={index}
              next={setCurrentStep}
            />
          ) : currentStep === 1 ? (
            <SaveKeystore
              data={docs[NS].keystore}
              lang={props.language}
              index={index}
              next={setCurrentStep}
            />
          ) : (
            <SavePrivateKey
              data={docs[NS].privateKey}
              lang={props.language}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  )
})
