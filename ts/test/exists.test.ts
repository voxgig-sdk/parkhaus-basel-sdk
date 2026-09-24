
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ParkhausBaselSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ParkhausBaselSDK.test()
    equal(testsdk instanceof ParkhausBaselSDK, true,
      'ParkhausBaselSDK.test() must return a client synchronously')
  })

})
