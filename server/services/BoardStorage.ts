import AWS from 'aws-sdk'
import { AWS_S3_BUCKET_DRAW2ME_BOARDS } from 'server/constants'

class BoardStorage {
  s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  }

  get() {
    return this.s3.getObject({
      Bucket: AWS_S3_BUCKET_DRAW2ME_BOARDS!,
      Key: 'prototype-board.png',
    }).promise()
      .then(({ Body }) => Body)
      .catch(() => null)
  }

  upload(file: Blob) {
    return this.s3.upload({
      Bucket: AWS_S3_BUCKET_DRAW2ME_BOARDS!,
      Key: 'prototype-board.png',
      ContentType: 'image/png',
      Body: file
    }).promise()
      .then(() => file)
      .catch(() => null)
  }
}

export default new BoardStorage()
