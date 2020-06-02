var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/remotectrl/checkVerificationStatus', (req, res, next) => {
  res.send({
    status: 0,
    message: 'success',
    data: {
      code: 1
    }
  })
})

router.get('/remotectrl/checkVerificationCode', (req, res, next) => {
  setTimeout(() => {
    res.send({
      status: 0,
      message: '在30分钟内，您有权对未交付设备进行远程控制'
    })
  }, 1000)
})

router.get('/remotectrl/sendVerificationCode', (req, res, next) => {
  res.send({
    status: 0,
    message: 'success',
    data: {
      next_retry: 10
    }
  })
})

router.get('/system/getOwnerEngineers', (req, res, next) => {
  const list = Mock.mock({
    ['list|13']: [{
      "account_id": "@id",
      "name": "@title()"
    }]
  })
  const data = {
    "status": 0,
    "messgae": "",
    "data": list.list
  }
  res.send(data)
})

module.exports = router
