const db = 'http://localhost:5000/'


export default async function fetchData(url, params = {}, options = {}){
  const searchParams = new URLSearchParams(params).toString()
  let path = db+url
  path+= searchParams.length ? '/?'+searchParams : ''
  const data = await fetch(path, options)
  .then(r => {
    if(r.ok) {
      return r.json()
    }
    else {
      throw new Error('Fetch Error')
    }
  })
  return data
}