import QRCode from 'qrcode'

export default function genQRCode(text, options) {
  const op = options || {
    version: 6,
    errorCorrectionLevel: 'L',
    width: 256
  }
  return QRCode.toDataURL(text, op)
}
