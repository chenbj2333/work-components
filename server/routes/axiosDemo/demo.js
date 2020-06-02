var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

router.get('/demo/getList', function (req, res, next) {
  // const params = req.query;
  const list = Mock.mock({
    'list|2': [
      {
        id: '@id',
        name: '5#冷库-低温库',
        duration_memo: '1小时23分',
      },
    ],
  });
  const data = {
    status: 200,
    messgae: '',
    data: list.list,
  };
  res.send(data);
});

router.post('/demo/createObj', function (req, res, next) {
  // const body = req.body;
  const data = {
    status: 200,
    messgae: '创建成功',
    data: req.body,
  };
  res.send(data);
});

router.put('/demo/updateObj', function (req, res, next) {
  const data = {
    status: 200,
    messgae: '修改成功',
    data: req.body,
  };
  res.send(data);
});

router.delete('/demo/deleteObj', function (req, res, next) {
  const data = {
    status: 200,
    messgae: '修改成功',
    data: req.query.id,
  };
  res.send(data);
});

module.exports = router;
