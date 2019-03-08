import { effects } from 'redux-sirius'
import { push } from 'react-router-redux'

const { put } = effects

export default {
  state: {
    auth: false
  },
  reducers: {},
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
