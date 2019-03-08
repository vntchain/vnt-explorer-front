import { effects } from 'redux-sirius'

import axios from 'utils/axios'

const { put, call } = effects

export default {
  state: {},
  reducers: {},
  effects: ({ takeEvery }) => ({
    fetchData: takeEvery(function*({ payload }) {
      const { path, type, ns, method } = payload
      yield put({
        type: `${ns}/setIsLoading`,
        payload: true
      })
      try {
        const { data: resp } = yield call(axios, {
          method,
          url: path
        })

        yield put({
          type,
          payload: {
            error: !resp.ok ? resp.err : null,
            data: resp.ok ? resp.data : null
          }
        })
        yield put({
          type: `${ns}/setIsLoading`,
          payload: false
        })
      } catch (e) {
        /* eslint-disable */
        console.log('%c%s\n%crequest "%s" error', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', path)
        console.log(e.message)
        /* eslint-enable */
        yield put({
          type,
          payload: {
            error: e.message,
            data: null
          }
        })
        yield put({
          type: `${ns}/setIsLoading`,
          payload: false
        })
      }
    })
  })
}
