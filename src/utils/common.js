/* eslint-disable */
export function checkEmail(email) {
  if (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  }
  return false
}

export const formatAddr = addr => {
  const str1= addr.slice(0,12)
  const str2= addr.slice(addr.length-8,addr.length)
  return `${str1}...${str2}`
}
