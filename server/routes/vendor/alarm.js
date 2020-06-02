var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.get('/alarm/getParts', function (req, res, next) {
  const data = {
    "status": 0,
    "messgae": "",
    "data": [
      {
        "part_id": "1",
        "part_name":"蒸发器"
      },
      {
        "part_id": "2",
        "part_name":"压缩机"
      },
      {
        "part_id": "3",
        "part_name":"电源"
      }
    ]
  }
  res.send(data)
})

router.get('/alarm/getAlarmLevel', function (req, res, next) {
  const data = {
    "status": 0,
    "messgae": "",
    "data": [
      {
        "alarm_level": "0",
        "alarm_level_name":"无效"
      },
      {
        "alarm_level": "1",
        "alarm_level_name":"严重"
      },
      {
        "alarm_level": "2",
        "alarm_level_name":"一般"
      },
      {
        "alarm_level": "3",
        "alarm_level_name":"轻微"
      }
    ]
  }
  
  setTimeout(() => {
    res.send(data)
  }, 1000);
})

router.get('/alarm/getSystemAlarmList', function (req, res, next) {
  const size = req.query.page_size;
  const list = Mock.mock({
    ['list|' + size]: [{
      "event_id":"@id",
      "param_id":"@id",
      "alarm_memo":"5#冷库-低温库 #1温度",
      "system_id":589,
      "system_name":"10个热间fdggfgh",
      "project_id" :76,
      "project_name":"10个热间",
      "sub_module_name":"aaa555",
      "duration":"@integer(5000, 10000000)",
      "duration_memo":"1小时23分",
      "time_begin":1515548700,
      "time_end":1515553700,
      "status":"@integer(-1, 1)",
      "part_id": "@integer(1, 3)",
      "alarm_level": "@integer(1, 3)",
      "part_name": "@cword(3, 5)",
      "alarm_level_name": "@cword(3, 5)"
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

router.get('/alarm/getSystemAlarmSetting', function (req, res, next) {
  const data = {
    "status": 0,
    "message": "",
    "data": [
      {
        "module_name": "总系统",
        "sub_module_list": [
          {
            "module_name": "公共",
            "param_list": [
              {
                "param_name": "室外温度",
                "parameter_id": 111,
                "alias": "我的温度",
                "param_type": 1,
                "enable_alarm": 0,
                "alarm_set_desc": "高于3.0℃",
                "parameter_code": "t_amb",
                "alarm_level": "3",
                "alarm_level_name": "轻微"
              }
            ]
          },
          {
            "module_name": "-5℃蒸发系统 > #1冷间",
            "param_list": [
              {
                "param_name": "冷风机风机开关",
                "parameter_id": 2111,
                "alias": "我的开关x",
                "param_type": 1003,
                "enable_alarm": 0,
                "alarm_set_desc": "低于3.0℃",
                "parameter_code": "s_fan_chill",
                "alarm_level": "1",
                "alarm_level_name": "严重"
              },
              {
                "param_name": "风机开关",
                "parameter_id": 1333,
                "alias": "",
                "param_type": 1003,
                "enable_alarm": 0,
                "alarm_set_desc": "",
                "parameter_code": "s_fan_chill",
                "alarm_level": "2",
                "alarm_level_name": "一般"
              }
            ]
          }
        ]
      },
      {
        "module_name": "#1蒸发温区(-5度-R22)",
        "sub_module_list": [
          {
            "module_name": "-5℃蒸发系统 > #1冷间",
            "coldroom_id": 212,
            "coldroom_alias":"冷999",
            "param_list": [
              {
                "parameter_id": 1111,
                "param_name": "冷风机库门开关",
                "alias": "我的库门开关",
                "param_type": 21,
                "enable_alarm": -1,
                "alarm_set_desc": "高于20度",
                "parameter_code": "s_fan_chill",
                "alarm_level": "3",
                "alarm_level_name": "轻微"
              }
            ]
          },
          {
            "module_name": "-5℃蒸发系统 > #2冷间",
            "param_list": [
              {
                "parameter_id": 1113,
                "param_name": "模拟量未设置",
                "alias": "模拟量未设置",
                "param_type": 11,
                "enable_alarm": 1,
                "parameter_code": "s_fan_chill",
                "alarm_level": "3",
                "alarm_level_name": "轻微"
              },
              {
                "parameter_id": 111312,
                "param_name": "模拟量已设置",
                "alias": "模拟量已设置",
                "param_type": 12,
                "enable_alarm": 1,
                "parameter_code": "s_fan_chill",
                "alarm_level": "2",
                "alarm_level_name": "一般",
                "alarm_set_desc": "超出-3度~3度",
              },
              {
                "parameter_id": 111313,
                "param_name": "库门未设置",
                "alias": "库门未设置",
                "param_type": 13,
                "enable_alarm": 1,
                "parameter_code": "s_door_cr",
                "alarm_level": "3",
                "alarm_level_name": "轻微"
              },
              {
                "parameter_id": 111314,
                "param_name": "库门已设置",
                "alias": "库门已设置",
                "param_type": 14,
                "enable_alarm": 1,
                "parameter_code": "s_door_cr",
                "alarm_set_desc": "30秒",
                "alarm_level": "1",
                "alarm_level_name": "严重"
              },
              {
                "parameter_id": 1116,
                "param_name": "报警信号未设置",
                "alias": "报警信号未设置",
                "param_type": 4,
                "enable_alarm": 1,
                "parameter_code": "s_fan_chill",
                "alarm_level": "3",
                "alarm_level_name": "轻微"
              },
              {
                "parameter_id": 1117,
                "param_name": "报警信号已设置",
                "alias": "报警信号已设置",
                "param_type": 4,
                "enable_alarm": 1,
                "parameter_code": "s_fan_chill",
                "alarm_level": "3",
                "alarm_level_name": "轻微",
                "alarm_set_desc": "轻微",
              }
            ]
          }
        ]
      }
    ]
  }
  res.send(data)
})

router.get('/alarm/getAlarmSettingByParam', function (req, res, next) {
  console.log(req.query)
  const paramId = req.query.param_id;
  let data = {}
  if (paramId == 1113) {
    // 模拟量未设置
    data = {
      "parameter_id":1113,
      "system_id":213,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":3,
      "alarm_level":2,
      "alarm_level_name":"一般",
      "unit":"℃"
    }
  } else if (paramId == 111312) {
    // 模拟量已设置
    data = {
      "parameter_id":111312,
      "system_id":22,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":0,
      "alarm_level":1,
      "alarm_level_name":"严重",
      "upper_limit":5.0,
      "lower_limit":-1.3,
      "unit":"℃"
    }
  } else if (paramId == 111313) {
    // 库门未设置
    data = {
      "parameter_id":111313,
      "system_id":23,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":0,
      "alarm_level":1,
      "alarm_level_name":"严重",
      "unit":"℃"
    }
  } else if (paramId == 111314) {
    // 库门已设置
    data = {
      "parameter_id":111314,
      "system_id":24,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":0,
      "alarm_level":3,
      "alarm_level_name":"轻微",
      "upper_limit": 673894,
      "unit":"℃"
    }
  } else if (paramId == 1116) {
    // 报警信号未设置
    data = {
      "parameter_id":1116,
      "system_id":26,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":3,
    }
  } else {
    // 报警信号已设置
    data = {
      "parameter_id":1117,
      "system_id":27,
      "system_name":"制冷系统#1",
      "project_name":"重庆万吨冷库群",
      "module_tag":"5℃蒸发系统（R22)",
      "enable_alarm":3,
      "alarm_level":3,
      "alarm_level_name":"轻微",
    }
  }

  const result = {
    "status": 0,
    "messgae": "",
    "data": data
  }
  res.send(result)
})

router.post('/alarm/setAlarmSettingByParam', function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      status: 0,
      message: ''
    })
  }, 1000);
})

module.exports = router