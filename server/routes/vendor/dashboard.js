var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/dashboard/getList', function (req, res, next) {
  const object_id = req.query.object_id;
  const object_type = req.query.object_type;

  const list = Mock.mock({
    ['list|5']: [{
      "id": "@id",
      "name": "@ctitle(3, 15)",
      "object_id": object_id,
      "object_type": object_type,
      "object_name": "@ctitle(2, 20)",
    }]
  })
  const data = {
    "status": 0,
    "messgae": "",
    "data": [...list.list, {
      "id": "123",
      "name": "我是新建的",
      "object_id": object_id,
      "object_type": object_type
    }]
  }
  res.send(data)
})

router.post('/dashboard/delete', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
    })
  }, 500);
})

router.post('/dashboard/create', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
      data: {id: "123"}
    })
  }, 500);
})

router.post('/dashboard/update', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
      data: {id: '123'}
    })
  }, 500);
})

module.exports = router