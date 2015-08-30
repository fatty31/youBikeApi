var youbike = require('../models/youbike.js');

var YoubikeController = {
	getOneStationStatus: function(req, res){
		var sno_array = [];
		sno_array[0] = req.params.sno;
		youbike.get(sno_array, function(result){
			if(result.stationNo){
				res.json(200, result);
			}else{
				res.json(400, {err: 'bad request'});
			}
		});
	},
	getStationStatus: function(req, res){
		var sno_str = req.query.sno;
		var sno_array = sno_str.split(',');
		console.log(sno_array);
		youbike.get(sno_array, function(result){
			res.json(200, result);
		});
	},
	listStationStatus: function(req, res){
		var limit = 20;
		var offset = 1;
		var order = 1;
		if(req.query.hasOwnProperty('limit')){
			limit = parseInt(req.query.limit);
		}
		if(req.query.hasOwnProperty('offset')){
			offset = parseInt(req.query.offset);
		}
		if(req.query.hasOwnProperty('order')){
			offset = parseInt(req.query.order);
		}
		var start = limit * (offset - 1);
		var end = limit * offset -1;
		youbike.list(start, end, order, function(result){
			res.json(200, result);
		});
	}
};

module.exports = YoubikeController;