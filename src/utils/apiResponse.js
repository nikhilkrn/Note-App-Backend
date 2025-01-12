class apiResponse{
    constructor (
        statuscode,
        data,
        msg= "Success"
    ){
        this.data = data
        this.msg = msg
        this.statuscode =statuscode
        this.success = statuscode < 400
    }
}

export { apiResponse }