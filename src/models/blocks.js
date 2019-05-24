export default {
  state: {
    count: null,
    blocks: null,
    blockDetail: null
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
      //console.log('获取数据')
      return {
        ...state,
        [field]: { ...state[field], ...data }
      }
    }
  }
}
