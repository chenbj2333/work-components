var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/deliverycode/getCompanysOfMobileAndDelivercode', function (req, res, next) {
  const data = {
    "status": 0,
    "messgae": "",
    "data": [
      {
        company_id: 1,
        account_id: 1,
        company_name: '上海万达物流园1'
      },
      {
        company_id: 2,
        account_id: 2,
        company_name: '上海万达物流园2'
      },
      {
        company_id: 3,
        account_id: 3,
        company_name: '上海万达物流园3'
      },
      {
        company_id: 4,
        account_id: 4,
        company_name: '上海万达物流园4'
      },
      {
        company_id: 5,
        account_id: 5,
        company_name: '上海万达物流园5'
      },
    ]
  }
  res.send(data)
})

router.post('/site/createCompany', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
      data: {
        company_id: 5,
        company_name: '成都冷云',
        company_type: 'aaa',
        account_id: 123456,
        url: '/baidu.com'
      }
    })
  }, 1000);
})

router.get('/site/checkVerificationCode', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
    })
  }, 1000);
})

router.get('/deliverycode/getProjects', function (req, res, next) {
  const data = {
    "status":0,
    "message":"",
    "data":{
        "deliver_status":1,
        "projects":[
          {
            "project_id":21,
            "project_name":"上海万达物流园项目1",
            "mount_status":0
          },
          {
            "project_id":22,
            "project_name":"上海万达物流园项目2",
            "mount_status":0
          },
          {
            "project_id":23,
            "project_name":"上海万达物流园项目3",
            "mount_status":0
          },
          {
            "project_id":5,
            "project_name":"新建项目id5",
            "mount_status":0
          },
        ]
    }
  }
  res.send(data)
})

router.post('/deliverycode/handOver', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
    })
  }, 1000);
})

router.post('/deliverycode/createProject', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: '',
      data: {
        project_id: 5,
        project_name: '新建项目'
      }
    })
  }, 1000);
})

module.exports = router