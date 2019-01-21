const coefficient = process.env.NODE_ENV === 'development' ? 1 : 6.25
const fontZoomLevel =
  parseFloat(getComputedStyle(document.documentElement).fontSize) /
  16 /
  coefficient

export default fontZoomLevel
