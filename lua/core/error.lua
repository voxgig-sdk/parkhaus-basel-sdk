-- ParkhausBasel SDK error

local ParkhausBaselError = {}
ParkhausBaselError.__index = ParkhausBaselError


function ParkhausBaselError.new(code, msg, ctx)
  local self = setmetatable({}, ParkhausBaselError)
  self.is_sdk_error = true
  self.sdk = "ParkhausBasel"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ParkhausBaselError:error()
  return self.msg
end


function ParkhausBaselError:__tostring()
  return self.msg
end


return ParkhausBaselError
