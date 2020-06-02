var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/expense/getDcuExpenseList', function (req, res, next) {
  const page = req.query.page
  const list1 = Mock.mock({
    ['list|10']: [{
      "dcu_id": "@increment(1000)",
      "system_names": "@ctitle(7, 35)",
      "customer_name": "@ctitle(3, 15)",
      "receive_status": "@integer(0, 1)",
      "pv_num": "pv100",
      "standard_price": "500",
      "price_unit": "元/年",
      "extend_price": "1200",
      "profit": "700",
      "service_end_time": "@datetime('yyyy-MM-dd')",
    },
    {
      "dcu_id": "@increment(1000)",
      "system_names": "@ctitle(7, 35)",
      "customer_name": "",
      "receive_status": "@integer(0, 1)",
      "pv_num": "pv100",
      "standard_price": "500",
      "price_unit": "元/年",
      "extend_price": "",
      "profit": "",
      "service_end_time": "@datetime('yyyy-MM-dd')",
    }]
  })

  const list2 = Mock.mock({
    ['list|4']: [{
      "dcu_id": "@increment(1000)",
      "system_names": "@ctitle(7, 35)",
      "customer_name": "@ctitle(3, 15)",
      "receive_status": "@integer(0, 1)",
      "pv_num": "pv100",
      "standard_price": "500",
      "price_unit": "元/年",
      "extend_price": "",
      "profit": "",
      "service_end_time": "@datetime('yyyy-MM-dd')",
    }]
  })

  let data = {}
  if (page == 1) {
    data = {
      "status": 0,
      "messgae": "",
      "data": {
        "total": 24,
        "list": [...list1.list]
      }
    }
  } else {
    data = {
      "status": 0,
      "messgae": "",
      "data": {
        "total": 24,
        "list": [...list2.list]
      }
    }
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

router.get('/expense/setReceiveStatus', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.get('/expense/pricingDcu', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

module.exports = router