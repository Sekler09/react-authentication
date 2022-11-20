//const db = 'https://my-json-server.typicode.com/sekler09/json-server/'
const db = 'http://localhost:3001/'

export default async function fetchData(url, params = {}, options = {}) {
  const searchParams = new URLSearchParams(params).toString()
  let path = db + url
  path += searchParams.length ? '/?' + searchParams : ''
  const data = await fetch(path, options).then((r) => {
    if (r.ok) {
      return r.json()
    } else {
      throw new Error('Fetch Error')
    }
  })
  return data
}
