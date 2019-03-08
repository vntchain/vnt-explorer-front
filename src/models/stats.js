export default {
  state: {
    error: null,
    data: null,
    isLoading: false
  },
  reducers: {
    setStats: (state, { payload: { error, data } }) => {
      return {
        ...state,
        error,
        data
      }
    }
  }
}
