export default function getCurrentPage() {
  const {WordsTable} = require('root/values/strings.json');
  const han_current_page = decodeURI(window.location.pathname.replace('/', ''))
  return WordsTable[han_current_page]
}