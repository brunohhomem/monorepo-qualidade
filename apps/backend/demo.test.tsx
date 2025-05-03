import { message } from './demo'

describe('demo-backend', () => {
  it('true', () => {
    expect(true).toBe(true)
  })
  it('message must be valid', () => {
    expect(message).toBe('testing')
  })
})
