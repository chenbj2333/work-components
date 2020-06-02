var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

// 获取推荐报表列表
router.get('/report/getRecommandReportHeaderList', function(req, res, next) {
  const object_id = req.query.object_id
  const object_type = req.query.object_type
  const data = Mock.mock({
    "status": 0,
    "messgae": "",
    "data": [
      {
        "table_id": 101,
        "table_name":"冷间温度明细",
        "ico": "icon-lengjianwendumingxi",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":1,
        "module_type": "coldroom",
        "table_type": 0
      },
      {
        "table_id": 102,
        "table_name":"库门开关统计",
        "ico": "icon-kumen",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":3,
        "module_type": "coldroom",
        "table_type": 0
      },
      {
        "table_id": 103,
        "table_name":"库门开关明细",
        "ico": "icon-kumen",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":2,
        "module_type": "coldroom",
        "table_type": 0
      },
      {
        "table_id": 104,
        "table_name":"压缩机开关统计",
        "ico": "icon-yasuojizu",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":3,
        "module_type": "compressor",
        "table_type": 0
      },
      {
        "table_id": 105,
        "table_name":"压缩机开关明细",
        "ico": "icon-yasuojizu",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":2,
        "module_type": "compressor",
        "table_type": 0
      },
      {
        "table_id": 106,
        "table_name":"用电统计",
        "ico": "icon-yongdiantongji",
        "object_id": object_id,
        "object_type": object_type,
        "report_type":4,
        "module_type": "energy_item",
        "table_type": 0
      },
    ]
  })
  const error = {
    "status": 1,
    "messgae": "没传object_id或object_type"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": []
  }
  setTimeout(() => {
    object_id && object_type ? res.send(data) : res.send(error)
  }, 700)
})

// 获取自定义报表列表
router.get('/report/getReportHeaderList', function (req, res, next) {
  const object_id = req.query.object_id
  const object_type = req.query.object_type
  const data = {
    "status": 0,
    "messgae": "",
    "data": [{
      "table_id": 890,
      "table_name":"自定义瞬时值明细报表",
      "object_id": object_id,
      "object_type":object_type,
      "report_type":1,
      "ico": "icon-zidingyi",
      "table_type": 1,
      "object_name":"系统1",
    },
    {
      "table_id": 891,
      "table_name":"自定义开关明细报表",
      "object_id": object_id,
      "object_type":object_type,
      "object_name":"系统1",
      "report_type":2,
      "ico": "icon-zidingyi",
      "table_type": 1
    },
    {
      "table_id": 892,
      "table_name":"自定义开关统计报表",
      "object_id": object_id,
      "object_type":object_type,
      "object_name":"系统1",
      "report_type":3,
      "ico": "icon-zidingyi",
      "table_type": 1
    },
    {
      "table_id": 894,
      "table_name":"自定义报表4",
      "object_id": object_id,
      "object_type":object_type,
      "object_name":"系统1",
      "report_type":4,
      "ico": "icon-zidingyi",
      "table_type": 1
    }]
  }
  const error = {
    "status": 1,
    "messgae": "没传object_id或object_type"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": []
  }
  setTimeout(() => {
    object_id && object_type ? res.send(data) : res.send(error)
  }, 300)
})

// 获取查询选择项
router.get('/report/getRecommandReportHeader', function (req, res, next) {
  const object_id = req.query.object_id
  const object_type = req.query.object_type
  const table_id = req.query.table_id
  const list = Mock.mock({
    "table_id":table_id,
    "table_name":"测试报表" + table_id,
    "object_id":object_id,
    "object_type":object_type,
    "report_type":1,
    "module_type":"coldroom",
    "ico":"icon-yasuojizu",
    "module_list": [{
      "module_id": "module_id11",
      "module_name":"我是系统1的第一个模块",
      "system_name": "系统1",
      "system_id": 123,
      "params":[{"parameter_id":111111}]
    },
    {
      "module_id": "module_id12",
      "module_name":"我是系统1的第2个模块",
      "system_name": "系统1",
      "system_id": 123,
      "params":[{"parameter_id":1222221}, {"parameter_id":1222222}]
    },
    {
      "module_id": "module_id13",
      "module_name":"我是系统1的第3个模块",
      "system_name": "系统1",
      "system_id": 123,
      "params":[{"parameter_id":1333331}, {"parameter_id":13333332}, {"parameter_id":1333333}]
    },
    {
      "module_id": "module_id21",
      "module_name":"我是系统2的第一个模块",
      "system_name": "系统2",
      "system_id": 124,
      "params":[{"parameter_id":2222222}]
    }],
    "enery_items":[
      {
        "bizobj_id":2632,
        "name":"项目总用电",
        "unit":"度",
        "sub_enery_items":[
          {
            "bizobj_id":2644,
            "name":"蒸发末端总电量",
            "unit":"度",
            "sub_enery_items": [
              {"bizobj_id":11111111111111,"name":"#1压缩机电量","unit":"度"},
              {"bizobj_id":12222222222222,"name":"#2压缩机电量","unit":"度"},
              {"bizobj_id":13333333333333,"name":"#3压缩机电量","unit":"度"}
            ]
          },
          {
            "bizobj_id":2645,
            "name":"压缩机组总电量",
            "unit":"度",
            "sub_enery_items": [
              {"bizobj_id":21111111111111,"name":"#1压缩机电量","unit":"度"},
              {"bizobj_id":22222222222222,"name":"#2压缩机电量","unit":"度"}
            ]
          },
          {
            "bizobj_id":2646,
            "name":"其它",
            "unit":"度",
            "sub_enery_items": [
              {"bizobj_id":333333333333333,"name":"#1压缩机电量","unit":"度"}
            ]
          }
        ]
      }
    ]
  })
  const data = {
    "status": 0,
    "messgae": "",
    "data": list
  }
  const error = {
    "status": 1,
    "messgae": "没传object_id或object_type"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": {}
  }
  setTimeout(() => {
    object_id && object_type ? res.send(data) : res.send(error)
  }, 300)
})

router.get('/report/GetAnalogData', function (req, res, next) {
  const page = req.query.page
  const list1 = Mock.mock({
    ['list|20']: [{
      "time_desc": "@datetime",
      "value_set": {
        "##冷间1": "@id",
        "##冷间2": "@id",
        "##冷间3": "@id"
      }
    }, {
      "time_desc": "@datetime",
      "value_set": {
        "##冷间1": "@id",
        "##冷间2": "@id",
        "##冷间4": "@id",
        "##冷间5": "@id",
        "##冷间6": "@id"
      }
    }]
  })

  const list2 = Mock.mock({
    ['list|4']: [{
      "time_desc": "@datetime",
      "value_set": {
        "##冷间1": "@id",
        "##冷间2": "@id",
        "##冷间3": "@id"
      }
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
  const error = {
    "status": 1,
    "messgae": "cuowu"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": {"total": 0}
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

router.get('/report/getEneryDataDaily', function (req, res, next) {
  const page = req.query.page
  const list1 = Mock.mock({
    ['list|20']: [{
      "time_desc": "@datetime",
      "value_set": {
        "项目总用电1": "@id",
        "##项目总用电2": "@id",
        "##项目总用电3": "@id"
      }
    }]
  })

  const list2 = Mock.mock({
    ['list|4']: [{
      "time_desc": "@datetime",
      "value_set": {
        "项目总用电1": "@id",
        "##项目总用电2": "@id",
        "##项目总用电3": "@id"
      }
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
  const error = {
    "status": 1,
    "messgae": "cuowu"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": {"total": 0}
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

// 自定义列表的请求参数
router.get('/report/getReportHeaderInfo', function (req, res, next) {
  const data = {
    "status": 0,
    "messgae": "",
    "data": {
        "table_id":3,
        "table_name":"测试报表",
        "object_id":123,
        "object_type":0,
        "report_type":3,
        "ico":"icon-zidingyi",
        "params":[
            {
                "param_name":"#1载冷机组 载冷剂出口温度#1载冷机组 载冷剂出口温度#1",
                "parameter_id":279450,
                "unit":"℃"
            },
            {
                "param_name":"#1载冷机组 载冷剂入口温度",
                "parameter_id":279449,
                "unit":"℃"
            }
        ]
      }
  }

  const empty = {
    "status": 0,
    "messgae": "",
    "data": {}
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

router.get('/report/getSADataStat', function (req, res, next) {
  const page = req.query.page
  const list1 = Mock.mock({
    ['list|20']: [{
      "time_desc": "@datetime",
      "system_name":"氟利昂高温系统@id",
      "composer_name":"1号压缩机",
      "opentimes":43,
      "open_segment":32600
    }]
  })

  const list2 = Mock.mock({
    ['list|4']: [{
      "time_desc": "@datetime",
      "system_name":"氟利昂高温系统@id",
      "composer_name":"1号压缩机",
      "opentimes":43,
      "open_segment":32600
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
  const error = {
    "status": 1,
    "messgae": "cuowu"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": {"total": 0}
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

router.get('/report/getSADataDetail', function (req, res, next) {
  const page = req.query.page
  const list1 = Mock.mock({
    ['list|20']: [{
      "time_desc": "@datetime",
      "system_name":"@id 冷间",
      "composer_name":"北门",
      "start_time":326123,
      "end_time":326465
    }]
  })

  const list2 = Mock.mock({
    ['list|4']: [{
      "time_desc": "@datetime",
      "system_name":"@id 冷间",
      "composer_name":"南门",
      "start_time":32688,
      "end_time":32699
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
  const error = {
    "status": 1,
    "messgae": "cuowu"
  }
  const empty = {
    "status": 0,
    "messgae": "",
    "data": {"total": 0}
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

router.post('/report/deleteReportHeader', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.post('/report/updateReportHeader', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.post('/report/addReportHeader', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

router.get('/report/getReportTypes', function (req, res, next) {
  const data = {
    "status": 0,
    "message": "",
    "data": [
        {
          "report_type":1,
          "report_type_desc":"瞬时值明细"
        },
        {
          "report_type":2,
          "report_type_desc":"开关明细"
        },
        {
          "report_type":3,
          "report_type_desc":"开关统计"
        }
    ]
  }
  setTimeout(() => {
    res.send(data)
  }, 300)
})

module.exports = router