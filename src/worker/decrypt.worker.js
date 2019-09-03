import * as vntKit from 'vnt-kit'

self.addEventListener('message', function(e){
  console.warn(e.data) //eslint-disable-line
  const { data: {
    ksObj,
    password,
    // method
  }} = e
  const { address, privateKey: pk } = vntKit.account.decrypt(
    ksObj,
    password,
    false
  )
  self.postMessage({address, pk})
}, false)
