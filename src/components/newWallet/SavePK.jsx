import React from 'react'
import { Button, Input, message } from 'antd'

import LocalText from 'i18n/LocalText'
import genQRCode from 'utils/genQRCode'
import cpIcon from 'assets/images/copy.png'
import logo2 from 'assets/images/logo2.png'

import styles from 'components/newWallet/NWallet.scss'

export default function SavePrivateKey(props) {
  const copy = () => {
    document.querySelector('#copy').select()
    document.execCommand('copy')
    message.info('Copied!')
  }

  const printQRCode = async account => {
    try {
      const w = window.open()

      const qrAddr = await genQRCode(account.address)
      const qrPK = await genQRCode(account.privateKey)

      genPaperWallet(w, [
        {
          value: props.account.address,
          imgSrc: qrAddr
        },
        { value: props.account.privateKey, imgSrc: qrPK }
      ])
    } catch (e) {
      /* eslint-disable */
      console.log('%c%s\n%cgenerator QRCode Error!: %o', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', e)
      /* eslint-enable */
    }
  }
  return (
    <div className={`${styles.content} ${styles['content--wider']}`}>
      <h3 className={styles.title}>
        <LocalText id="st3Title" />
      </h3>

      <Input
        id="copy"
        value={props.account.privateKey}
        readOnly
        size="large"
        suffix={<img onClick={copy} src={cpIcon} />}
      />

      <Button
        size="large"
        type="primary"
        onClick={() => printQRCode(props.account)}
        block
      >
        <LocalText id="st3Btn1" />
      </Button>

      <ul className={styles.list}>
        <li>
          {'- '}
          <LocalText id="st3Note1" />
        </li>
        <li>
          {'- '}
          <LocalText id="st3Note2" />
        </li>
        <li>
          {'- '}
          <LocalText id="st3Note3" />
        </li>
      </ul>

      <Button
        style={{ backgroundColor: '#ff8103', borderColor: '#ff8103' }}
        size="large"
        type="primary"
        block
      >
        <LocalText id="st3Btn2" />
      </Button>
    </div>
  )
}

const genPaperWallet = (w, arr) => {
  const cont = document.createElement('div')
  Object.assign(cont.style, {
    width: '960px',
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'font-family': 'Microsoft YaHei, 微软雅黑, PingFangSC-Regular, sans-serif',
    color: '#333'
  })
  w.document.body.appendChild(cont)

  const textContStyle = {
    position: 'absolute',
    top: '240px',
    left: '20px'
  }

  const imgAddrCont = document.createElement('div')
  imgAddrCont.style.position = 'relative'
  const nodeImgAddr = document.createElement('img')
  nodeImgAddr.setAttribute('src', arr[0].imgSrc)
  const addrTextCont = document.createElement('div')
  Object.assign(addrTextCont.style, textContStyle)
  const addrTitle = document.createElement('p')
  addrTitle.textContent = 'YOUR ADDRESS'
  addrTitle.style['font-size'] = '18px'
  const addr = document.createElement('p')
  addr.style['font-size'] = '16px'
  addr.textContent = arr[0].value
  addrTextCont.appendChild(addrTitle)
  addrTextCont.appendChild(addr)
  imgAddrCont.appendChild(nodeImgAddr)
  imgAddrCont.appendChild(addrTextCont)

  const imgPkCont = document.createElement('div')
  imgPkCont.style.position = 'relative'
  const nodeImgPK = document.createElement('img')
  nodeImgPK.setAttribute('src', arr[1].imgSrc)
  const pkTextCont = document.createElement('div')
  Object.assign(pkTextCont.style, textContStyle)
  const pkTitle = document.createElement('p')
  pkTitle.textContent = 'YOUR PRIVATE KEY'
  pkTitle.style['font-size'] = '18px'
  const pk = document.createElement('p')
  pk.style['font-size'] = '16px'
  pk.textContent = arr[1].value
  pkTextCont.appendChild(pkTitle)
  pkTextCont.appendChild(pk)
  imgPkCont.appendChild(nodeImgPK)
  imgPkCont.appendChild(pkTextCont)

  const nodeLogo = document.createElement('img')
  nodeLogo.setAttribute('src', logo2)

  cont.appendChild(imgAddrCont)
  cont.appendChild(imgPkCont)
  cont.appendChild(nodeLogo)
}
