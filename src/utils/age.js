export default function calcAge(age, lang) {
  return lang === 'cn' ? age + '秒前' : age + 'seconds ago'
}
