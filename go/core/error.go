package core

type ParkhausBaselError struct {
	IsParkhausBaselError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewParkhausBaselError(code string, msg string, ctx *Context) *ParkhausBaselError {
	return &ParkhausBaselError{
		IsParkhausBaselError: true,
		Sdk:              "ParkhausBasel",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ParkhausBaselError) Error() string {
	return e.Msg
}
