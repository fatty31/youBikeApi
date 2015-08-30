var Stations = {};

var Youbike = {
	save: function(stationsArr){
		renewStations(stationsArr);
	},
	get: function(snoArr, callback){
		getStations(snoArr, callback);
	},
	list: function(startPoint, endPoint, sortMethod, callback){
		listStations(startPoint, endPoint, sortMethod, callback);
	}
};

module.exports = Youbike;

function listStations(start, end, sort_method, callback_func){
	var list_result = [];
	var station_keys = Object.keys(Stations);
	if(end > station_keys.length){
		end = station_keys.length;
	}
	for(var s = start; s <= end; ++s){
		list_result.push(Stations[station_keys[s]]);
	}
	var sorted_array = [];
	switch(sort_method){
		case 1:
			sorted_array = list_result.sort(sortNo);
			break;
		// case 2:
			// sorted_array = list_result.sort(); // location
			// break;
		default:
			sorted_array = list_result.sort(sortNo);
			break;
	}
	callback_func(sorted_array);
}

function getStations(sno_arr, callback_func){
	var get_result = [];
	sno_arr.forEach(function(sno){
		var sObj = Stations[sno];
		get_result.push(sObj);
	});
	if(get_result.length === 1){
		callback_func(get_result[0]);
	}else{
		callback_func(get_result);
	}
}

function renewStations(stations){
	stations.forEach(function(stationObj, i){
		var sno = stationObj.stationNo;
		if(Stations.hasOwnProperty(sno)){
			Stations[sno] = stationObj;
		}else{
			Stations[sno] = {};
			Stations[sno] = stationObj;
		}
	});
	// console.log(JSON.stringify(Stations));
}

function sortNo(a, b){
	if(a.stationNo < b.stationNo) return -1;
	if(a.stationNo > b.stationNo) return 1;
	return 0;
}