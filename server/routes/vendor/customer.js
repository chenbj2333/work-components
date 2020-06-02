var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/customer/getList', function (req, res, next) {
  const size = req.query.page_size;
  const list = Mock.mock({
    ['list|' + size]: [{
      "customer_id": "@id",
      "name": "@csentence()",
      "province_id":"@integer(100000, 199999)",
      "city_id":"@integer(100000, 199999)",
      "province_name":"@province()",
      "city_name":"@city()",
      "project_num":"@integer(1, 100)",
      "system_num":"@integer(1, 100)",
      "status":"@integer(0, 1)"
    }]
  })
  const data = {
    "status": 0,
    "messgae": "",
    "data": {
      "total": 25,
      list: list.list
    }
  }
  res.send(data)
})

router.post('/customer/delete', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.post('/customer/create', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
      data: {
        customer_id: 374
      }
    })
  }, 1000);
})

router.post('/customer/update', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.get('/member/getMemberPermission', function (req, res, next) {
  const data = {
    "status": 0,
    "messgae": "",
    "data": {
      "projects": [
        {
          "project_id": "141",
          "project_name": "绝密项目1",
          "perm_type": 1
        },
        {
          "project_id": "143",
          "project_name": "绝密项目2",
          "perm_type": 1
        }
      ]
    }
  }
  res.send(data)
})

module.exports = router