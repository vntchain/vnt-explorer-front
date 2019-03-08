export default {
  state: {
    error: null,
    data: null,
    isLoading: false
  },
  reducers: {
    setBlocks: (state, { payload: { error, data } }) => {
      return {
        ...state,
        error,
        data
      }
    }
  }
}
