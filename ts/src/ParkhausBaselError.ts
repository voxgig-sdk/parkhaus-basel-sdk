
import { Context } from './Context'


class ParkhausBaselError extends Error {

  isParkhausBaselError = true

  sdk = 'ParkhausBasel'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ParkhausBaselError
}

