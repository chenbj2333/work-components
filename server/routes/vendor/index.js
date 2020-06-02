var express = require('express')
var router = express.Router()

const customer = require('./customer')
const device = require('./device')
const alarm = require('./alarm')
const deliverApp = require('./deliver-app')
const remoteControl = require('./remote-control')
const dashboard = require('./dashboard')
const dataReport = require('./data-report')
const feeManage = require('./fee-manage')
const system = require('../common')

router.use('/', [customer, device, alarm, deliverApp, remoteControl, dashboard, dataReport, feeManage, system]);

module.exports = router