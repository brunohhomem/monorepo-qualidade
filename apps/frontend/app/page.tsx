'use client'
import { httpClient } from '@brunohhomem/commons-http-client'

export default function Page() {
  httpClient
    .get('https://api.github.com/users/brunohhomem')
    .then(data => console.warn(data))

  return <h1>Hello World</h1>
}
