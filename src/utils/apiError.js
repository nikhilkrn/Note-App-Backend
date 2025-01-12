class apiError extends Error{
    constructor(
        statuscode,
        msg= "Something went wrong",
        errors = [],
        stack = "",
    ){
        super()
        this.statuscode = statuscode
        this.msg = msg
        this.errors = errors
        this.success = false
        this.data = null

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export { apiError }