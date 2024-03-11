
const hello = async (event, context) => {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    return {
        "statusCode": 200,
        "body": JSON.stringify({
            'message':
                `Current Time: ${hour}:${minutes}:${seconds}`
        })
    }
}

module.exports = {
    hello
}
