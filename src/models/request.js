import axios from 'axios'
import { effects } from 'redux-sirius'

const { call, put } = effects

export default {
  state: {
    isLoading: false,
    userName: '',
    userEmail: ''
  },
  reducers: {
    setUser: (state, { payload }) => {
      return {
        ...state,
        userName: payload.name,
        userEmail: payload.email,
        isLoading: !state.isLoading
      }
    }
    /*     toggleIsLoading: state => {
      return {
        ...state,
        isLoading: !state.isLoading
      }
    } */
  },
  effects: ({ takeLatest }) => ({
    userInfo: takeLatest(function*() {
      try {
        yield put({
          type: 'request/setIsLoading',
          payload: true
        })
        const res = yield call(axios, {
          method: 'get',
          url: 'https://randomuser.me/api/'
        })
        yield put({
          type: 'request/setUser',
          payload: {
            name: res.data.results[0].name.first,
            email: res.data.results[0].email
          }
        })
        yield put({
          type: 'request/setIsLoading',
          payload: false
        })
      } catch (e) {
        // console.dir(e) // eslint-disable-line no-console
      }
    })
  })
}
