
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ParkhausBaselSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ParkhausBaselSDK.test()
    equal(null !== testsdk, true)
  })

})
