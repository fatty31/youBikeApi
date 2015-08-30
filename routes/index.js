var express = require('express');
var router = express.Router();

var youbikeCtrl = require('../controller/youbikeCtrller.js');

router.get('/', function(req, res){
  res.json({
  	api: 'YouBike API',
  	version: '0.1.0',
  	author: 'Jiana, LIU.',
  });
});

router.get('/station/:sno', youbikeCtrl.getOneStationStatus);
router.get('/stations', youbikeCtrl.getStationStatus);
router.get('/list', youbikeCtrl.listStationStatus);

module.exports = router;
