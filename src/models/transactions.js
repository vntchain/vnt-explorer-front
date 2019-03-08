export default {
  state: {
    error: null,
    data: null,
    isLoading: false
  },
  reducers: {
    setTxs: (state, { payload: { error, data } }) => {
      return {
        ...state,
        error,
        data
      }
    }
  }
}
