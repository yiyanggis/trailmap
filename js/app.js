window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var parkingMarkers=[], InfoMarkers=[], markerLayers=[];
var toggleableLayerIds = ['ZoomInOverlay', 'ZoomOutOverlay', 'Polygon','Polyline'];
var toggleableLayerIds2 = ['ZoomInOverlay', 'ZoomOutOverlay','Polygon'];
var markerLayerList=Config.layerList;
var markerLayerVisibility=[];
var toggleableLayerIds3 = toggleableLayerIds.concat(markerLayerList);
var zoomThreshold = 12, zoomThreshold2=10;
var myLayerControl;
var layerList = ['ZoomInOverlay', 'ZoomOutOverlay','Polygon','Polyline','parking','info'];
var pointData, polylineData, polygonData;
var menuItems=[];
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = Config.APIKey;
var map = new mapboxgl.Map({
container: 'map',
style: Config.baseStyle,
zoom: 10,
center: Config.center
});

if(data){
	console.log("data loaded")
	pointData=data.PointLayer;
	polygonData=data.PolygonLayer;
	polylineData=data.PolylineLayer;
}


map.on('load', function() {

	if(window.mobileAndTabletCheck()){
		//alert('yes')
	}
	else{
		//alert('no')
	}

	// add source and layer for contours
	map.addSource('contours', {
		type: 'vector',
		url: 'mapbox://mapbox.mapbox-terrain-v2'
	});
	map.addLayer({
		'id': 'contours',
		'type': 'line',
		'source': 'contours',
		'source-layer': 'contour',
		'layout': {
			// make layer visible by default
			'visibility': 'visible',
			'line-join': 'round',
			'line-cap': 'round'
		},
		'paint': {
			'line-color': '#877b59',
			'line-width': 1
		}
	});

	//trace layer
	map.addSource('traceMap',{
		'type':'image',
		'url':Config.filename,
		'coordinates': Config.coordinates
		// [Config.coordinates.west, Config.coordinates.south],
		// [Config.coordinates.east,Config.coordinates.south],
		// [Config.coordinates.east,Config.coordinates.north],
		// [Config.coordinates.west,Config.coordinates.north]

		// [-71.376873, 43.692226],
		// [-71.269592, 43.692173],
		// [-71.269526, 43.647296],
		// [-71.376625, 43.647083]
		
	})

	// remove trace test layer
	map.addLayer({
		'id': 'traceMap',
		'type': 'raster',
		'source': 'traceMap',
		'layout': {
			// make layer visible by default
			'visibility': 'visible'
		},
		'source-layer': 'traceMap'
	});

	if(Config.ifzoomin_image){
		map.addSource('ZoomInOverlay', {
			'type': 'image',
			'url': Config.zoomInImageFile,
			'coordinates': [
			[-70.376873, 43.692226],
			[-70.269592, 43.692173],
			[-70.269526, 43.647296],
			[-70.376625, 43.647083]
			]
		});

		map.addLayer({
		'id': 'ZoomInOverlay',
		'type': 'raster',
		'source': 'ZoomInOverlay',
		'layout': {
		// make layer visible by default
		'visibility': 'visible'
		},
		'source-layer': 'ZoomInOverlay'
		});
	}
	
	if(Config.ifzoomout_image){
		map.addSource('ZoomOutOverlay', {
			'type': 'image',
			'url': Config.zoomOutImageFile,
			'coordinates': [
			[-70.376873, 43.692226],
			[-70.269592, 43.692173],
			[-70.269526, 43.647296],
			[-70.376625, 43.647083]
			]
		});

		map.addLayer({
		'id': 'ZoomOutOverlay',
		'type': 'raster',
		'source': 'ZoomOutOverlay',
		'layout': {
		// make layer visible by default
		'visibility': 'visible'
		},
		'source-layer': 'ZoomOutOverlay'
		});

		map.on('click', 'ZoomOutOverlay', function(e) {
			//zoom to layer
			if(Draw.getMode() !== 'draw_line_string'||Draw.getMode() !== 'draw_polygon')
				map.zoomTo(zoomThreshold+1, {duration: 2000});

		});
	}
	

	

	// Add zoom and rotation controls to the map.
	map.addControl(new mapboxgl.NavigationControl(), 'top-left');

	var Draw = new MapboxDraw({
		displayControlsDefault: false,
		controls: {
			polygon: true,
			line_string: true,
			trash: true
		}
	});

	map.addControl(Draw, 'top-left');

	var infoPanel=new InfoPanel('infoPanelDiv',null,{});
	//map.addControl(infoPanel);

	map.addControl(
		new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
			},
			trackUserLocation: true
		})
		, 'top-left'
	);

	map.on('draw.create', updateArea);
	map.on('draw.delete', updateArea);
	map.on('draw.update', updateArea);

	map.on('click',function(e){
		if(Draw.getMode() === 'draw_line_string'||Draw.getMode() === 'draw_polygon'){
			//update info panel
			if(Draw.getAll().features){
				const features = Draw.getAll().features;
				const feature = features[features.length-1];
				if(feature){
					var coordinates = feature.geometry.coordinates;
					var text = "";
					if(feature.geometry.type == 'Polygon'){
						coordinates = coordinates[0];
						for (var i = 0; i< coordinates.length; i++) {
							text += ''+coordinates[i][0] + ', ' + coordinates[i][1]+'\n';
						}
						infoPanel.GeojsonText.value = JSON.stringify(feature.geometry);
						infoPanel.CoordinateText.value = text;
					}
					else{
						for (var i = 0; i< coordinates.length; i++) {
							text += ''+coordinates[i][0] + ', ' + coordinates[i][1]+'\n';
						}
						infoPanel.GeojsonText.value = JSON.stringify(feature.geometry);
						infoPanel.CoordinateText.value = text;
					}
				}
			}
		}
	})

	function updateArea(e){
		console.log(e);
		//e.features[0].editing.enable();
		if(Draw.getAll().features){
			const features = Draw.getAll().features;
			const feature = features[features.length-1];
			if(feature){
				var coordinates = feature.geometry.coordinates;
				var text = "";
				if(feature.geometry.type == 'Polygon'){
					coordinates = coordinates[0];
					for (var i = 0; i< coordinates.length; i++) {
						text += ''+coordinates[i][0] + ', ' + coordinates[i][1]+'\n';
					}
					infoPanel.GeojsonText.value = JSON.stringify(feature.geometry);
					infoPanel.CoordinateText.value = text;
				}
				else{
					for (var i = 0; i< coordinates.length; i++) {
						text += ''+coordinates[i][0] + ', ' + coordinates[i][1]+'\n';
					}
					infoPanel.GeojsonText.value = JSON.stringify(feature.geometry);
					infoPanel.CoordinateText.value = text;
				}
			}
		}
	}

	//load user location

	//polygon layer
	//layer source, two overlays, two markers as small polygon circles when zoomed out (in one layer) and as icons when zoomed in (in another layer), and the green-area polygon with a hole (in a third layer)? Also, what base-map tiles will you be using

	if(Config.ifzoomout_image){
		map.addSource('highlight',{
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'geometry': {
					'type': 'Polygon',
					'coordinates': [
					    [
					      	[-70.376873, 43.692226],
							[-70.269592, 43.692173],
							[-70.269526, 43.647296],
							[-70.376625, 43.647083],
							[-70.376873, 43.692226]
					  	]]
				}
			}
		});

		map.on('click', 'highlight', function(e) {
			map.zoomTo(zoomThreshold+1, {duration: 2000});
			checkZoomSetting();
		});

		map.on('touchstart', function(e) {
			if(map.currentPopup){
				map.currentPopup.remove();
				map.currentPopup = null;
			}
		});

		map.on('click', function(e) {
			if(map.currentPopup){
				map.currentPopup.remove();
				map.currentPopup = null;
			}
		});
		 
		// Change the cursor to a pointer when the mouse is over the states layer.
		map.on('mouseenter', 'highlight', function() {
			map.getCanvas().style.cursor = 'pointer';
		});
		 
		// Change it back to a pointer when it leaves.
		map.on('mouseleave', 'highlight', function() {
			map.getCanvas().style.cursor = '';
		});

		map.addLayer({
			'id': 'highlight',
			'type': 'fill',
			'source': 'highlight',
			'layout': {'visibility': 'visible'},
			'paint': {
			'fill-color': '#0000FF',
			'fill-opacity': 0.02
			}
		});
	}
	

	// load data
	if(polygonData){
		map.addSource('poly', {
		  type: 'geojson',
		  data: polygonData
		});

		map.addLayer({
			'id': 'Polygon',
			'type': 'fill',
			'source': 'poly',
			'layout': {'visibility': 'visible'},
			'paint': {
			'fill-color': ['get', 'color'],
			'fill-opacity': 0.3
			}
		});
	}

	//calculate distance
	const features = polylineData.features;
	for (var i = features.length - 1; i >= 0; i--) {
		var tempFeature = features[i];
		tempFeature.properties.length=turf.length(tempFeature.geometry,{units: 'miles'}).toFixed(2);
	}
	
	if(polylineData){
		map.addSource('line', {
		  type: 'geojson',
		  data: polylineData//'data/polyline.geojson'
		});

		//todo add lable by creating centroid symbol layer and add text
		map.addLayer({
			'id': 'Polyline',
			'type': 'line',
			'source': 'line',
			'layout': {
				'visibility': 'visible',

			},
			'paint': {
			'line-color': ['get', 'color'],
			'line-width': 5,//['get', 'lineWidth'],
			"line-dasharray":[5,1]
			},
			// 'layout': {
			// 	'text-field': ['get', 'text'],
			// 	'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
			// 	'text-radial-offset': 0.5,
			// 	'text-justify': 'auto',
			// }
			// "layout":{
			// 	"symbol-placement":"line",
			// 	'text-field': '{name}'//['format',['get', 'text'],{},
			// }

		});

		map.addLayer({
	      "id": "symbols",
	      "type": "symbol",
	      "source": "line",
	      "layout": {
	        "symbol-placement": "line",
	        "text-font": ["Open Sans Regular"],
	        //"text-field": ['get', 'name'],
	        "text-offset":[1,1],
	        "text-field": [
	            'format',
	            ['get', 'name'],
	            { 'font-scale': 1.2 },
	            '\n     ',
	            {},
	            ['get', 'length'],
	            {
	            'font-scale': 1
	            },
	            ' mi'
	        ],
	        "text-size": 20,
	        "text-rotate": -4,
	        "symbol-spacing": 100,
	        "text-allow-overlap":false
	      },
	      "paint":{
	        "text-translate":[0,-20],
	      }
	    });
	}
	

	//add point geojson instead of loading markers
	if(pointData){
		map.addSource('point', {
		  type: 'geojson',
		  data: pointData//'data/point.geojson'
		});

		map.addLayer({
			'id': 'Parking',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Parking']
		});

		// map.addSource('info', {
		//   type: 'geojson',
		//   data: 'data/info.geojson'
		// });

		map.addLayer({
			'id': 'Info',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Info']
		});

		map.addLayer({
			'id': 'Recreation',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Recreation']
		});

		map.addLayer({
			'id': 'Trail Features',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Trail Features']
		});

		map.addLayer({
			'id': 'Community',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Community']
		});

		map.addLayer({
			'id': 'Local Resources',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Local Resources']
		});

		map.addLayer({
			'id': 'Living & Working',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Living & Working']
		});

		map.addLayer({
			'id': 'Visiting',
			'type': 'circle',
			'source': 'point',
			'layout': {'visibility': 'visible'},
			'paint': {
				'circle-color': ['get', 'color'],
				'circle-opacity': 1,
				'circle-radius':5,
			},
			'filter': ['==', 'type', 'Visiting']
		});

		// map.addLayer({
		// 	'id': 'Other',
		// 	'type': 'circle',
		// 	'source': 'point',
		// 	'layout': {'visibility': 'visible'},
		// 	'paint': {
		// 		'circle-color': ['get', 'color'],
		// 		'circle-opacity': 1,
		// 		'circle-radius':5,
		// 	},
		// 	'filter': ['==', 'type', 'otherType']
		// });

		// map.setPaintProperty('Parking', 'fill-color', [
		// 'interpolate',
		// ['exponential', 0.5],
		// ['zoom'],
		// 15,
		// '#e2714b',
		// 22,
		// '#eee695'
		// ]);
		 
		// map.setPaintProperty('Parking', 'fill-opacity', [
		// 'interpolate',
		// ['exponential', 0.5],
		// ['zoom'],
		// 15,
		// 0,
		// 22,
		// 1
		// ]);
		
		//marker layer
		//markers
		
		// var parkingMarker = {
		// 	'type': 'FeatureCollection',
		// 	'features': [
		// 	{
		// 		'type': 'Feature',
		// 		'properties': {
		// 			'message': 'Foo',
		// 			'iconSize': [32, 32],
		// 			'icon':'parking-icon.png',
		// 			'zoomInIcon':'blue-dot.png',
		// 		},
		// 		'geometry': {
		// 			'type': 'Point',
		// 			'coordinates': [-70.302090,43.679103]
		// 		}
		// 	}]
		// };

		//$.getJSON('data/parking.geojson', function(json){
			//parkingMarker=json;

			markerLayerList.forEach(function(layerName){
				markerLayers[layerName]=[];
				markerLayerVisibility[layerName]=false;
			})

			// add markers to map

			pointData.features.forEach(function(marker) {
				if(markerLayerList.includes(marker.properties.type)){
					// create a DOM element for the marker
					var el = document.createElement('div');
					el.className = 'marker';
					el.style.backgroundImage ='url('+marker.properties.icon+')';;
					el.style.width = marker.properties.iconSize[0] + 'px';
					el.style.height = marker.properties.iconSize[1] + 'px';
					el.style.backgroundSize=marker.properties.iconSize[0] + 'px';
					 
					el.addEventListener('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						//window.alert(marker.properties.message);

						if(map.currentPopup){
							map.currentPopup.remove();
							map.currentPopup = null;
						}

						var popup = new mapboxgl.Popup({ closeOnClick: false })
						.setLngLat(marker.geometry.coordinates)//(marker._lngLat)
						.setHTML(marker.properties.detailText)
						.addTo(map);

						map.currentPopup=popup;
					});

					el.addEventListener('touchstart', function(e) {
						e.preventDefault();
						e.stopPropagation();
						//window.alert(marker.properties.message);

						if(map.currentPopup){
							map.currentPopup.remove();
							map.currentPopup = null;
						}
						
						var popup = new mapboxgl.Popup({ closeOnClick: false })
						.setLngLat(marker.geometry.coordinates)//(marker._lngLat)
						.setHTML(marker.properties.detailText)
						.addTo(map);

						map.currentPopup=popup;
					});
					 
					// add marker to map
					var newMarker = new mapboxgl.Marker(el)
					.setLngLat(marker.geometry.coordinates)
					.addTo(map);
					newMarker.detailText=marker.properties.detailText;
					//newMarker.detailImage=marker.properties.detailImage;
					markerLayers[marker.properties.type].push(newMarker);
				}
				

			});

			// pointData.features.forEach(function(marker) {
			// 	if(marker.properties.type=='Parking'){
			// 		// create a DOM element for the marker
			// 		var el = document.createElement('div');
			// 		el.className = 'marker';
			// 		el.style.backgroundImage ='url(parking-icon.png)';;
			// 		el.style.width = marker.properties.iconSize[0] + 'px';
			// 		el.style.height = marker.properties.iconSize[1] + 'px';
			// 		el.style.backgroundSize=marker.properties.iconSize[0] + 'px';
					 
			// 		el.addEventListener('click', function(e) {
			// 			e.preventDefault();
			// 			e.stopPropagation();
			// 			//window.alert(marker.properties.message);
			// 			var popup = new mapboxgl.Popup({ closeOnClick: false })
			// 			.setLngLat(marker.geometry.coordinates)//(marker._lngLat)
			// 			.setHTML('<h1>Info Window Place Holder</h1>')
			// 			.addTo(map);
			// 		});
					 
			// 		// add marker to map
			// 		var newMarker = new mapboxgl.Marker(el)
			// 		.setLngLat(marker.geometry.coordinates)
			// 		.addTo(map);
			// 		newMarker.detailText=marker.properties.detailText;
			// 		newMarker.detailImage=marker.properties.detailImage;
			// 		parkingMarkers.push(newMarker);
			// 	}
				

			// });

			//checkZoomSetting();
		//});


		// var infoMarker = {
		// 	'type': 'FeatureCollection',
		// 	'features': [
		// 	{
		// 		'type': 'Feature',
		// 		'properties': {
		// 			'message': 'Foo',
		// 			'iconSize': [32, 32],
		// 			'icon':'info-icon.png',
		// 			'zoomInIcon':'blue-dot.png',
		// 			'detailImage':'kiosk.jpg',
		// 			'detailText':'Portland Trails',
		// 		},
		// 		'geometry': {
		// 			'type': 'Point',
		// 			'coordinates': [-70.292771,43.652881]
		// 		}
		// 	}]
		// };

		// var pointMarkers = {
		// 	'type': 'FeatureCollection',
		// 	'features': [
		// 	{
		// 		'type': 'Feature',
		// 		'properties': {
		// 			'message': 'Foo',
		// 			'iconSize': [32, 32],
		// 			'icon':'info-icon.png',
		// 			'zoomInIcon':'blue-dot.png',
		// 		},
		// 		'geometry': {
		// 			'type': 'Point',
		// 			'coordinates': [-70.292771,43.652881]
		// 		}
		// 	},
		// 	{
		// 		'type': 'Feature',
		// 		'properties': {
		// 			'message': 'Foo',
		// 			'iconSize': [32, 32],
		// 			'icon':'parking-icon.png',
		// 			'zoomInIcon':'blue-dot.png',
		// 		},
		// 		'geometry': {
		// 			'type': 'Point',
		// 			'coordinates': [-70.302090,43.679103]
		// 		}
		// 	}]
		// };

		// map.addSource('points',{
		// 	'type':'geojson',
		// 	'data':pointMarkers
		// })

		// map.addLayer({
		// 	'id': 'points',
		// 	'type': 'circle',
		// 	'source': 'points',
		// 	'paint': {
		// 		'circle-color':'#0000FF',
		// 		'circle-radius':5,
		// 	}
		// });
		 
		 
		

		// pointData.features.forEach(function(marker) {
		// 	// create a DOM element for the marker
		// 	if(marker.properties.type=='Info'){
		// 		var el = document.createElement('div');
		// 		el.className = 'marker';
		// 		el.style.backgroundImage = 'url('+marker.properties.icon+')';
		// 		el.style.width = marker.properties.iconSize[0] + 'px';
		// 		el.style.height = marker.properties.iconSize[1] + 'px';
		// 		el.style.backgroundSize=marker.properties.iconSize[0] + 'px';
				 
		// 		el.addEventListener('click', function(e) {
		// 			e.preventDefault();
		// 			e.stopPropagation();
		// 			//window.alert(marker.properties.message);
		// 			var popup = new mapboxgl.Popup({ closeOnClick: false })
		// 			.setLngLat(marker.geometry.coordinates)
		// 			.setHTML('<h1>'+marker.properties.detailText+'</h1>'+'<p></p>')
		// 			.addTo(map);
		// 		});
				 
		// 		// add marker to map
		// 		var newMarker = new mapboxgl.Marker(el)
		// 		.setLngLat(marker.geometry.coordinates)
		// 		.addTo(map);

		// 		InfoMarkers.push(newMarker);
		// 	}
			
		// });


	}
	

	//layer control

	class MyLayerControl {
	  onAdd(map){
	    this.container = document.createElement('div');
	    this.container.classList.add('mapboxgl-ctrl');
	    this.container.classList.add('mapboxgl-ctrl-group');

	    this.btn = document.createElement('button');
	    this.btn.setAttribute('type', 'button');
	    this.btn.textContent=" ";
	    this.btn.classList.add('my-custom-control');
	    this.btn.classList.add('collapse');

	    this.container.appendChild(this.btn);

	    this.map = map;
	    var that=this;
	    this.btn.addEventListener('mouseover', () => {
	      that.onClick();
	    });

	    return this.container;
	  }
	  onRemove(){
	    this.container.parentNode.removeChild(this.container);
	    this.map = undefined;
	  }

	  onClick(){
	  	this.btn.classList.remove('collapse');
	  	this.btn.classList.add('expand');
	  	if(this.menu){
	  		this.menu.classList.remove('collapse');
	  		this.menu.classList.add('expand');
	  	}
	  }

	  onHide(){
	  	this.btn.classList.add('collapse');
	  	this.btn.classList.remove('expand');
	  	if(this.menu){
	  		this.menu.classList.add('collapse');
	  		this.menu.classList.remove('expand');
	  	}
	  }
	}

	class MyLayerControl2 {
	  onAdd(map){
	    this.container = document.createElement('div');
	    this.container.classList.add('mapboxgl-ctrl');
	    this.container.classList.add('mapboxgl-ctrl-group');
	    this.container.classList.add('mapboxgl-ctrl-zoom');
	    this.zoomIn = document.createElement('button');
	    this.zoomIn.setAttribute('type', 'button');
	    this.zoomIn.textContent="zoomin";
	    //this.zoomIn.appendChild(iconPlus());
	    this.zoomOut = document.createElement('button');
	    this.zoomOut.setAttribute('type', 'button');
	    this.zoomOut.textContent="zoomOut";
	    //this.zoomOut.appendChild(iconMinus());
	    this.container.appendChild(this.zoomIn);
	    this.container.appendChild(this.zoomOut);
	    this.map = map;
	    this.zoomIn.addEventListener('click', () => {
	      this.map.zoomIn();
	    });
	    this.zoomOut.addEventListener('click', () => {
	      this.map.zoomOut();
	    });
	    return this.container;
	  }
	  onRemove(){
	    this.container.parentNode.removeChild(this.container);
	    this.map = undefined;
	  }

	}

	myLayerControl = new MyLayerControl();
	var layers = document.getElementById('menu');
	myLayerControl.menu=layers;
	myLayerControl.menu.addEventListener("mouseleave",function(){
		myLayerControl.onHide();
	});
	layers.control=myLayerControl;
	map.addControl(myLayerControl);


	// myLayerControl.btn.addEventListener("mouseover", function(){
	// 	myLayerControl.onClick();
	// 	console.log("click")
	// });
	//myLayerControl.onClick();

	var zoomControl = new ZoomControl();
	map.addControl(zoomControl,"top-left");
	
	var basemapSwitchControl = new BasemapSwitchControl("testdiv",null,{});
	map.addControl(basemapSwitchControl,"top-left");
	// enumerate ids of the layers
	
	 
	// set up the corresponding toggle button for each layer
	for (var i = 0; i < toggleableLayerIds3.length; i++) {
		var id = toggleableLayerIds3[i];

		//<div class="form-check">
		//    <input type="checkbox" class="form-check-input" id="exampleCheck1">
		//    <label class="form-check-label" for="exampleCheck1">Check me out</label>
		//  </div>
		
		var div = document.createElement('div');
		div.className='form-check active';

		var input = document.createElement('input');
		input.type = 'checkbox';
		input.className='form-check-input';
		div.input=input;
		div.appendChild(input);

		var link = document.createElement('label');
		link.href = '#';
		link.className = 'form-check-label';
		link.textContent = id;

		div.appendChild(link);
		 
		div.onclick = function(e) {
			var clickedLayer = this.textContent;
			e.preventDefault();
			e.stopPropagation();

			var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
			if(markerLayerList.includes(clickedLayer)){
				if(map.getZoom() > zoomThreshold){
					if(markerLayerVisibility[clickedLayer]){//if(InfoMarkers[0]._map){
						markerLayers[clickedLayer].forEach(function(marker){
							marker.remove();
						});
						this.input.checked=false;
						markerLayerVisibility[clickedLayer]=false;
						//this.className = '';
					}
					else{
						markerLayers[clickedLayer].forEach(function(marker){
							marker.addTo(map);
						});
						//this.className = 'active';
						this.input.checked=true;
						markerLayerVisibility[clickedLayer]=true;
					}
				}
				else{
					if (visibility === 'visible') {
						map.setLayoutProperty(clickedLayer, 'visibility', 'none');
						//this.className = '';
						this.input.checked=false;
					} else {
						//this.className = 'active';
						this.input.checked=true;
						map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
					}
				}
			}

			// if (clickedLayer=="Info"){
			// 	if(map.getZoom() > zoomThreshold){
			// 		if(visibility === 'visible'){//if(InfoMarkers[0]._map){
			// 			InfoMarkers.forEach(function(marker){
			// 				marker.remove();
			// 			});
			// 			this.input.checked=false;
			// 			//this.className = '';
			// 		}
			// 		else{
			// 			InfoMarkers.forEach(function(marker){
			// 				marker.addTo(map);
			// 			});
			// 			//this.className = 'active';
			// 			this.input.checked=true;
			// 		}
			// 	}
			// 	else{
			// 		if (visibility === 'visible') {
			// 			map.setLayoutProperty(clickedLayer, 'visibility', 'none');
			// 			//this.className = '';
			// 			this.input.checked=false;
			// 		} else {
			// 			//this.className = 'active';
			// 			this.input.checked=true;
			// 			map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			// 		}
			// 	}
				
			// }

			// else if (clickedLayer=="Parking"){
			// 	if(map.getZoom() > zoomThreshold){
			// 		if(visibility === 'visible'){//if(parkingMarkers[0]._map){
			// 			parkingMarkers.forEach(function(marker){
			// 				marker.remove();
			// 			});
			// 			//this.className = '';
			// 			this.input.checked=false;
			// 		}
			// 		else{
			// 			parkingMarkers.forEach(function(marker){
			// 				marker.addTo(map);
			// 			});
			// 			//this.className = 'active';
			// 			this.input.checked=true;
			// 		}
			// 	}
			// 	else{
			// 		if (visibility === 'visible') {
			// 			map.setLayoutProperty(clickedLayer, 'visibility', 'none');
			// 			//this.className = '';
			// 			this.input.checked=false;
			// 		} else {
			// 			//this.className = 'active';
			// 			this.input.checked=true;
			// 			map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			// 		}
			// 	}
			// }


			else{
							// toggle layer visibility by changing the layout object's visibility property
				if (visibility === 'visible') {
					map.setLayoutProperty(clickedLayer, 'visibility', 'none');
					//this.className = '';
					this.input.checked=false;
				} else {
					//this.className = 'active';
					this.input.checked=true;
					map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
				}
			}
			 

			 
			

		
		};

		menuItems[id]=div;
	 
	
		layers.appendChild(div);


	}

	checkZoomSetting();

	//zoom behavior
	
	map.on('zoom', function() {
		checkZoomSetting();
		
	});

	
	//add textbox
	var textBox=new TextBox("textDiv",null,{
		"color":"",
		"fontSize":10,
		"text":Config.text
	});

	map.addControl(textBox, 'bottom-left');

});

function checkZoomSetting(){
	if (map.getZoom() > zoomThreshold) {
		if(Config.ifzoomout_image){
			map.setLayoutProperty("ZoomOutOverlay", 'visibility', 'none');
		}
		if(Config.ifzoomin_image){
			map.setLayoutProperty("ZoomInOverlay", 'visibility', 'visible');
		}
		

		//threshold2 disappear
		//threshold1 blue dot to parking and info icon

		// parkingMarkers.forEach(function(marker){
			
		// 	//marker._element.style.backgroundImage='url(parking-icon.png)';
		// 	marker.addTo(map);
		// });
		// InfoMarkers.forEach(function(marker){
			
		// 	//marker._element.style.backgroundImage='url(info-icon.png)';
		// 	marker.addTo(map);
		// });

		//map.setLayoutProperty('Parking', 'visibility', 'none');
		//map.setLayoutProperty('Info', 'visibility', 'none');

		markerLayerList.forEach(function(layerName){
			markerLayers[layerName].forEach(function(marker){
				marker.addTo(map);
			});
			markerLayerVisibility[layerName]=true;
			map.setLayoutProperty(layerName, 'visibility', 'none');
		})

		updateMenu();

		//add point layer

	} else if(map.getZoom()>(zoomThreshold2+0.5)){
		// parkingMarkers.forEach(function(marker){
		// 	marker.remove();

		// });
		// InfoMarkers.forEach(function(marker){
		// 	marker.remove();

		//});

		markerLayerList.forEach(function(layerName){
			markerLayers[layerName].forEach(function(marker){
				marker.remove();
			});
			markerLayerVisibility[layerName]=false;
			map.setLayoutProperty(layerName, 'visibility', 'visible');
		})
		//map.setLayoutProperty('Parking', 'visibility', 'visible');
		//map.setLayoutProperty('Info', 'visibility', 'visible');


	} else {
		if(Config.ifzoomout_image){
			map.setLayoutProperty("ZoomOutOverlay", 'visibility', 'visible');
		}
		if(Config.ifzoomin_image){
			map.setLayoutProperty("ZoomInOverlay", 'visibility', 'none');
		}

		// parkingMarkers.forEach(function(marker){
		// 	marker.remove();
		// });
		// InfoMarkers.forEach(function(marker){
		// 	marker.remove();
		// });

		// map.setLayoutProperty('Parking', 'visibility', 'none');
		// map.setLayoutProperty('Info', 'visibility', 'none');
		markerLayerList.forEach(function(layerName){
			markerLayers[layerName].forEach(function(marker){
				marker.remove();
			});
			markerLayerVisibility[layerName]=false;
			map.setLayoutProperty(layerName, 'visibility', 'none');
		})

		updateMenu();
	}
}

function updateMenu(){
	toggleableLayerIds2.forEach(function(id){
		if(id == 'ZoomOutOverlay' && !Config.ifzoomout_image){
			return;
		}
		if(id == 'ZoomInOverlay' && !Config.ifzoomin_image){
			return;
		}
		var visibility = map.getLayoutProperty(id, 'visibility');

		if (visibility === 'visible') {
			//menuItems[id].className = 'active';
			menuItems[id].input.checked=true;
		} else {
			//menuItems[id].className = '';
			menuItems[id].input.checked=false;
		}

		// if(parkingMarkers[0]._map){
		// 	//menuItems['Parking'].className = 'active';
		// 	menuItems['Parking'].input.checked=true;
		// }
		// else{
		// 	//menuItems['Parking'].className = '';
		// 	menuItems['Parking'].input.checked=false;
		// }

		// if(InfoMarkers[0]._map){
		// 	//menuItems['Info'].className = 'active';
		// 	menuItems['Info'].input.checked=true;
		// }
		// else{
		// 	//menuItems['Info'].className = '';
		// 	menuItems['Info'].input.checked=false;
		// }
		markerLayerList.forEach(function(layerName){
			if(markerLayerVisibility[layerName]){//if(markerLayers[layerName][0]._map){
				menuItems[layerName].input.checked=true;
			}
			else{
				menuItems[layerName].input.checked=false;
			}

		})

	})
}

