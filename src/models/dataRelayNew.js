import { effects } from 'redux-sirius'

import axios from 'utils/axios'

const { put, call } = effects

export default {
  state: {},
  reducers: {},
  effects: ({ takeEvery }) => ({
    fetchData: takeEvery(function*({ payload }) {
      const { path, ns, field } = payload
      const method = payload.method || 'get'
      const axiosArgs =
        method === 'post'
          ? {
              method,
              url: path,
              data: payload.data
            }
          : {
              method,
              url: path
            }

      yield put({
        type: `${ns}/loadingStatus`,
        payload: {
          field,
          isLoading: true
        }
      })
      try {
        const { data: resp } = yield call(axios, axiosArgs)

        yield put({
          type: `${ns}/setState`,
          payload: {
            error: !resp.ok ? resp.err : null,
            data: resp.ok ? resp.data : null,
            isLoading: false,
            count: resp.extra.count,
            field
          }
        })
      } catch (e) {
        /* eslint-disable */
        console.log('%c%s\n%crequest "%s" error', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', path)
        console.log(e.message)
        /* eslint-enable */
        yield put({
          type: `${ns}/setState`,
          payload: {
            error: e.message,
            data: null,
            isLoading: false,
            field
          }
        })
      }
    })
  })
}
