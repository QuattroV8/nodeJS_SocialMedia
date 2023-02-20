exports.throwServerMessage = (res,message,statusCode) => {

    const messageServerTemplate = `Status ${statusCode} : ${message}`

    console.log(messageServerTemplate)
    res.status(statusCode).send({
        message:messageServerTemplate
    })
}
