const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const fs = require('fs')
const Promise = require('bluebird')


AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})


const uploadFile = function (file) {
    return new Promise((res, rej) => {
        s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: process.env.SECRET_ACCESS_KEY,
            Body: fs.createReadStream(file.path),
        }, (err, data) => {
            if (err) return rej(err)
            return res()
        })
    })
}

const getBucket = function () {
    return new Promise((resolve, reject) => {
        var params = { Bucket: process.env.BUCKET_NAME };
        s3.listObjects(params, function (err, data) {
            if (err) reject(console.log(err, err.stack))
            else resolve(console.log(data));
        })
    })
}


module.exports = function (request, reply) {
    return getBucket().then(() => {
        reply({ success: true })
    }).catch((err) => {
        console.log('Error:' + err)
    })

    /*
    console.log(request.payload)
    console.log(process.env.BUCKET_NAME)

    return uploadFile(request.payload).then(() => {
        reply({ success: true })
    }).catch((err) => {
        console.log('Error:' + err)
    })
    */
}