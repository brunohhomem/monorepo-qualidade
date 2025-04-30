export const httpClient = {
  get(url: string) {
    return fetch(url, { headers: { accept: 'application/json' } })
      .then(res => {
        console.log(res)
      })
      .then(data => {
        return data
      })
  }
}
