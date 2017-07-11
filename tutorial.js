// obtendo dos as APIs da aws
var AWS = require('aws-sdk')

//definir região
AWS.config.update({ region: 'us-east-1', credentials: { YOUR_CREDENTIALS } })


//obtendo apenas API S3 da aws
var S3 = require('aws-sdk/clients/s3')

//definir região e versão
var s3 = new S3({
    apiVersion: '2006-03-01',
    region: 'us-west-1',
    credentials: { YOUR_CREDENTIALS }
});

//especificando parametros para o objeto do serviço
s3.getObject({ Bucket: 'bucketName', Key: 'keyName' });

//especifincando parametros padrão para objeto individual
var s3bucket = new AWS.S3({ params: { Bucket: 'myBucket' }, apiVersion: '2006-03-01' });

