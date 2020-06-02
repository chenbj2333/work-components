var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/system/getLocations', function (req, res, next) {
  const data = {
    "status": 0,
    "message": "",
    "data": [
      {
        "location_id":"510000",
        "location_name":"四川省",
        "location_type":"province",
        "children":[
          {
            "location_id":"510100",
            "location_name":"成都市",
            "location_type":"city"
          },
          {
            "location_id":"510200",
            "location_name":"内江市",
            "location_type":"city"
          }
        ]
      },
      {
        "location_id":"410000",
        "location_name":"湖北省",
        "location_type":"province",
        "children":[
          {
            "location_id":"410100",
            "location_name":"武汉市",
            "location_type":"city"
          },
          {
            "location_id":"410200",
            "location_name":"仙桃市",
            "location_type":"city"
          },
          {
            "location_id":"410300",
            "location_name":"荆州市",
            "location_type":"city"
          }
        ]
      }
    ]
  }
  res.send(data)
})

router.get('/system/getCustomers', function (req, res, next) {
  const list = Mock.mock({
    ['list|10']: [{
      "customer_id": "@id",
      "name": "@csentence()"
    }]
  })
  const data = {
    "status": 0,
    "messgae": "",
    "data": [...list.list]
  }
  res.send(data)
})

router.get('/system/getSystemList', function (req, res, next) {
  const size = req.query.page_size;
  const list = Mock.mock({
    ['list|' + size]: [{
      "system_id": 3104,
      "project_id": "@id",
      "system_name": "@csentence()",
      "system_idx": "0",
      "system_evap_temp": "",
      "create_time": "1457064440",
      "creator_id": "大煞笔",
      "type_sys": "1001",
      "type_rf": "3002",
      "is_draft": "0",
      "serial_no": "VENDOR20160304-2",
      "factory_sn": "20180904",
      "machine_model": "xoy33",
      "delivery_distributor_status": "@integer(0, 1)",
      "delivery_owner_status": "@integer(0, 1)",
      "monitor_status": "@integer(-2, 1)"
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

module.exports = router