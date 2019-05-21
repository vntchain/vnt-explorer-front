import { effects } from 'redux-sirius'

import axios from 'utils/axios'

const { put, call } = effects

export default {
  state: {},
  reducers: {},
  effects: ({ takeEvery }) => ({
    fetchData: takeEvery(function*({ payload, callback }) {
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

        /*
        ** resp: {
        **   ok,
        **   data,
        **   err,
        **   extra, // null or {count: number}
        ** }
        */
        /* eslint-disable */
        // console.log('%c%s\n%cresp: %o', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', resp)
        /* eslint-enable */

        let error
        let data = resp.data
        if (!resp.ok) {
          data = null
          error = resp.err || resp.error
          if (typeof error === 'object' && error !== null) {
            error = error.code
          } else if (typeof error === 'string') {
            // do nothing
          } else {
            error = JSON.stringify(error)
          }
        }
        const result = {
          data,
          error, // string
          isLoading: false,
          count: resp.extra ? resp.extra.count : '--',
          field
        }

        yield put({
          type: `${ns}/setState`,
          payload: result
        })
        //invoke callback
        if (callback && typeof callback === 'function') {
          yield call(callback, ns, result)
        }
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
