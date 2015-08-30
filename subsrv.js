var request = require('request');
var async = require('async');

var youbike = require('./models/youbike.js');

var SubServer = {
	initialize: function() {
		dataCenter();
		setInterval(function(){
			dataCenter();
		}, 30000);
	}
};

module.exports = SubServer;

function dataCenter(){
	async.parallel([
			spreateJob.one,
			spreateJob.two,
			spreateJob.three,
			spreateJob.four
		], function(err, result){
			if(!err){
				var stationsAll = result[0].concat(result[1], result[2], result[3]);
				// console.log(stationsAll);
				youbike.save(stationsAll);
			}else{
				console.log('Get Data from TPE.gov Error:::');
				console.log(err);
			}
		});

}

var spreateJob = {
	one: function(callback){
		getYoubikeTPE(0, function(partion){
			if(partion.success){
				if(partion.body_result.result.results){
					dataShorter(partion.body_result.result.results, function(stationObjs){
						callback(null, stationObjs);
					});
				}else{
					callback(null, []);
				}
			}else{
				callback(null, []);
			}
		});
	},
	two: function(callback){
		getYoubikeTPE(100, function(partion){
			if(partion.success){
				if(partion.body_result.result.results){
					dataShorter(partion.body_result.result.results, function(stationObjs){
						callback(null, stationObjs);
					});
				}else{
					callback(null, []);
				}
			}else{
				callback(null, []);
			}
		});		
	},
	three: function(callback){
		getYoubikeTPE(200, function(partion){
			if(partion.success){
				if(partion.body_result.result.results){
					dataShorter(partion.body_result.result.results, function(stationObjs){
						callback(null, stationObjs);
					});
				}else{
					callback(null, []);
				}
			}else{
				callback(null, []);
			}
		});
	},
	four: function(callback){
		getYoubikeTPE(300, function(partion){
//			console.log(partion);
			if(partion.success){
				if(partion.body_result.result.results){
					dataShorter(partion.body_result.result.results, function(stationObjs){
						callback(null, stationObjs);
					});
				}else{
					callback(null, []);
				}
			}else{
				callback(null, []);
			}
		});
	}
};

function dataShorter(data, callback){
	var datashorted = [];
	data.forEach(function(obj, i){
		var objshorted = {};
		objshorted.stationNo = obj.sno;
		objshorted.avalibleBike = obj.sbi;
		objshorted.emptySpace = obj.bemp;
		objshorted.statusDesc = 'NS';
		if(obj.act === '1'){
			objshorted.statusDesc = 'NORMAL';
		}
		if(parseInt(obj.sbi) <= 0){
			objshorted.statusDesc = 'NULL';
		}
		if(parseInt(obj.bemp) <= 0){
			objshorted.statusDesc = 'FULL';
		}
		objshorted.updateTime = obj.mday;
		datashorted.push(objshorted);
	});
	callback(datashorted);
}

function getYoubikeTPE(offset, callback){
	var url = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=ddb80380-f1b3-4f8e-8016-7ed9cba571d5';
	url += '&limit=100&offset=' + offset;
	request({
		method: 'GET',
		uri: url
	}, function(err, res, body){
		if(!err){
			var callback_result = {};
			if(res.statusCode = 200){
				if(res.headers['content-type'] === 'application/json;charset=UTF-8'){
					callback_result.success = true;
					callback_result.body_result = JSON.parse(body);
					callback(callback_result);
				}else{
					console.log('Not JSON format Error:::')
					console.log(new Date());
					callback_result.success = false;
					callback_result.body_result = {};
					callback(callback_result);
				}
			}else{
				callback_result.success = false;
				callback_result.body_result = {};
				callback(callback_result);
			}
		}else{
			console.log('Request Error:::');
			console.log(err);
			console.log(new Date());
		}
	});
}


// iid：ItemId、
// sd：啟用時間、
// vtyp：版本別、
// sip：場站 IP、
// tot：場站的總停車格、
// sarea：場站區域、
// lat：經度、
// lng：緯度、
// ar：地址、
// sareaen：場站區域英文名稱、
// snaen：場站英文名稱、
// aren：英文地址、
// nbcnt：擋板數量、
// sna : 場站名稱、

// act：禁用狀態

// sv：場站狀態、
// sno：場站代號、
// sbi：場站的目前車輛數、
// bemp：空位數量、
// mday：資料更新時間、