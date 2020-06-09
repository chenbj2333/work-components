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

router.get('/application/backUpdateApplication', function (req, res, next) {
  const data = {
    message: 'success',
    data: {
      uid: '',
      applicationName: 'c-test',
      image: 'test-image:test-image-tag',
      imageTag: 'latest',
      cpuResource: 21,
      memoryResource: 130,
      containerName: 'c-test-container',
      replicas: 1,
      historyLimit: 1,
      maxSurge: 1,
      maxUnavailable: 0,
      workerName: 'node-5-108',
      bindIp: '1.1.1.1',
      workerSelector: { 'key-name': 'key-value' },
      workerAffinity: [
        { key: 'jiedianqinhexing', operator: 'NotIn', values: ['a', 'b', 'c'] },
      ],
      host: '8.8.8.8',
      path: '/a/b/c',
      port: 3000,
      failureThreshold: 5,
      periodSeconds: 60,
      timeoutSeconds: 10,
      volumes: [
        { alias: 'aaa', type: 'apparafile', sourceName: 'Apparafile-s1cc57' },
      ],
      volumeMounts: [{ alias: 'aaa', mountPath: '/aaa', subPath: 'a/a' }],
      env: [{ name: 'bianliangming', value: 'bianliangzhi' }],
      envFrom: 'c-test-txtaaaaxjyaaa',
      cmd: 'sdfsdgsdgfdh',
    },
    code: 200,
  };
  res.send(data);
});

module.exports = router;
