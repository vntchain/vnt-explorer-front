export default {
  state: {
    res: null,
    error: null
  },
  reducers: {
    setState: (state, { payload }) => {
      const { field, ...data } = payload
      return {
        ...state,
        [field]: data
      }
    }
  }
}
