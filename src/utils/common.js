/* eslint-disable */
export function checkEmail(email) {
  if (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  }
  return false
}

export const formatAddr = (addr, limitBefore=12, limitAfter=8) => {
  let result = ''
  if(addr.length > limitBefore + limitAfter) {
    const str1= addr.slice(0,limitBefore)
    const str2= addr.slice(addr.length-limitAfter,addr.length)
    result = `${str1}...${str2}` 
  } else {
    result = addr
  }
  return result
}

export const formatVname = (vname, limit=12) => {
  return vname.length > limit ? vname.slice(0,limit)+'...' : vname
}
