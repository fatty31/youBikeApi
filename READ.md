#YouBike API for APP

##/station

return a station's status

* path: /station/{sno}
* path parameter:
	* sno: youbike station no

##/stations

return an stations array

* path: /stations
* optional parameter:
	* sno: youbike station no
* example:
	/stations?sno=0190,0100,0003

##/list

return an stations array

* path: /list
* optional parameter:
	* limit: number of results (default 20)
	* offset: (default 1)
	* order:
		* 1: sort by stationNo (default)