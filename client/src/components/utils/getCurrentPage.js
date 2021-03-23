export default function getCurrentPage() {
  const {WordsTable} = require('../../values/strings.json');
  const current_page = decodeURI(window.location.pathname.replace('/', ''))
  return WordsTable[current_page] ? WordsTable[current_page] : current_page
}