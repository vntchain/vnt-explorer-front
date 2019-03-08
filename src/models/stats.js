export default {
  state: {
    stats: null
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
    }
  }
}
