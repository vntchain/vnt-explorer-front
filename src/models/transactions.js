export default {
  state: {
    txs: null,
    count: null,
    txHistory: null,
    txDetail: null,
    filteredTxs: null
  },
  reducers: {
    setState: (state, { payload }) => {
      const { field, ...data } = payload
      return {
        ...state,
        [field]: data
      }
    },
    loadingStatus: (state, { payload }) => {
      const { field, ...data } = payload
      return {
        ...state,
        [field]: { ...data }
      }
    },
    resetTxData: state => {
      return {
        ...state,
        txs: null,
        filteredTxs: null
      }
    }
  }
}
