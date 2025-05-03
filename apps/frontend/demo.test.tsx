import { message } from './demo'

describe('demo-frontend', () => {
  it('true', () => {
    expect(true).toBe(true)
  })
  it('message must be valid', () => {
    expect(message).toBe('testing')
  })
})
