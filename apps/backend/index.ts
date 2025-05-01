import http from 'http'
import { httpClient } from '@brunohhomem/commons-http-client'

http
  .createServer(async (req, res) => {
    const githubPayload = await httpClient.get(
      'https://api.github.com/users/brunohhomem'
    )

    res.write(
      JSON.stringify({ message: 'Hello from the server side!', githubPayload })
    )
    res.end()
  })
  .listen(4000)
