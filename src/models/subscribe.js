import { message } from 'antd'
import { effects } from 'redux-sirius'
const { put } = effects
export default {
  state: {
    showSubmitModal: false,
    success: false,
    isLoading: false
  },
  reducers: {
    loadingStatus: (state, { payload }) => {
      const { isLoading } = payload
      return {
        ...state,
        isLoading
      }
    }
  },
  effects: ({ takeEvery }) => ({
    setState: takeEvery(function*({ payload }) {
      if (payload.data) {
        message.destroy() // 用于清掉message对应的dom
        yield put({ type: 'subscribe/setShowSubmitModal', payload: true })
        yield put({ type: 'subscribe/setSuccess', payload: true })
      } else {
        yield put({ type: 'subscribe/setShowSubmitModal', payload: true })
        yield put({ type: 'subscribe/setSuccess', payload: false })
      }
    })
  })
}
