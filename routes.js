const { readExcelController } = require('./excelRouter');

const express = require('express');

const router = express.Router();

router.get('/readExcel', readExcelController);

module.exports = router;