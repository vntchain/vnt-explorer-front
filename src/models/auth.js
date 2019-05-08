import { effects } from 'redux-sirius'
import { push } from 'react-router-redux'

const { put } = effects

export default {
  state: {
    /* auth: true,
    account: {
      address: '0x122369f04f32269598789998de33e3d56e2c507a',
      pk: '0xac355731983f9ad945b642f15ed60022fa4aeb8f5c069d4f15a24c4b5100195b'
    } */
    auth: false,
    account: null
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
    logout: takeLatest(function*() {
      yield put({
        type: 'auth/setAuth',
        payload: false
      })
      yield put(push('/'))
    })
  })
}
