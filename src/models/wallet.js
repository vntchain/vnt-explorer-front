import { effects } from 'redux-sirius'
import VNT from 'vnt'
import TX from 'ethereumjs-tx'

import abi from 'utils/abi.json'
import { rpc, chainId } from 'constants/config'

const { put, call, select } = effects
const vnt = new VNT()
vnt.setProvider(new vnt.providers.HttpProvider(rpc))

export default {
  state: {
    tokenInfo: null,
    sendResult: null
  },
  reducers: {
    setState: (state, { payload }) => {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: ({ takeLatest }) => ({
    getERCTokenInfo: takeLatest(function*({ payload: { addr, contractAddr } }) {
      const contract = vnt.core.contract(abi)
      let data = contract.packFunctionData('GetAmount', [addr])
      let options = {
        to: contractAddr,
        data
      }
      const amount = yield call(() => vnt.core.call(options))
      options.data = contract.packFunctionData('GetDecimals', [])
      let digit = yield call(() => vnt.core.call(options))
      digit = contract.unPackOutput('GetDecimals', digit).toString()

      yield put({
        type: 'wallet/setTokenInfo',
        payload: { amount: vnt.toDecimal(amount), digit: parseInt(digit, 10) }
      })
    }),

    sendTx: takeLatest(function*({
      // eslint-disable-next-line
      payload: { token, amount, receAddr, sender, extraData }
    }) {
      const rawTx = {
        chainId: chainId,
        nonce: vnt.toHex(vnt.core.getTransactionCount(sender.address))
      }
      // 原生币
      if (token.name === 'VNT') {
        const wei = vnt.toWei(parseFloat(amount, 10), 'vnt')
        rawTx.to = receAddr
        rawTx.value = wei
      } else {
        // ERC20 代币
        const contract = vnt.core.contract(abi)
        const { digit } = yield select(({ wallet: { tokenInfo } }) => tokenInfo)

        const data = contract.packFunctionData('transfer', [
          receAddr,
          parseFloat(amount, 10) * Math.pow(10, digit)
        ])
        rawTx.to = token.address
        rawTx.value = '0x00'
        rawTx.data = data
      }
      rawTx.gas = vnt.core.estimateGas(rawTx)
      const tx = new TX(rawTx)
      tx.sign(new Buffer(sender.privateKey.substring(2), 'hex'))
      const serializedTx = tx.serialize()

      try {
        const promise = new Promise(resolve => {
          vnt.core.sendRawTransaction(
            '0x' + serializedTx.toString('hex'),
            (err, txHash) => resolve({ err, txHash })
          )
        })
        const res = yield promise
        yield put({
          type: 'wallet/setSendResult',
          payload: {
            err: res.err ? res.err.message : null,
            txHash: res.txHash
          }
        })
      } catch (e) {
        yield put({
          type: 'wallet/setSendResult',
          payload: {
            err: e.message,
            txHash: null
          }
        })
      }
    })
  })
}
