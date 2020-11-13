Config = {
	"baseStyle":"mapbox://styles/yiyanggis/ckckymfs205ga1imyr0hcysc4", // style code in mapbox studio
	"APIKey":"pk.eyJ1IjoieWl5YW5nZ2lzIiwiYSI6ImEyM2M0YmE5MWNiMTFkOWViNDFmMjY2NzM2NmE4NmJjIn0.vtR53ah0_BF1iqMoOZWMrg", //mapbox api key
	"filename":"zoomed-in-overlay.png",
	"format":"png",
	"coordinates":[[-70.476873, 43.692226], // coordinates for overlay image extent
			[-70.369592, 43.692173],
			[-70.369526, 43.647296],
			[-70.476625, 43.647083]],
	"center":[-71.574899, 42.635893],
	"zoominthreshold1":10,
	"zoomoutthreshold1":12,
	///layer visibility
	"ifzoomin_image":false, //if display zoom in overlay image
	"zoomInImageFile":"zoomed-in-overlay2b.png",
	"ifzoomout_image":true, // if display zoom out overlay image
	"zoomOutImageFile":"zoomed-out-overlay.jpg",

	//text displayed in overlay textbox widget
	"text": "this is sample text from config",
	"textColor":"#FF0000",
	"textBackGroundColor":null,
	"textFontSize":10,
	"dataFile":"data/data.geojson",
	"layerList":["Trail Features","Community","Local Resources","Living & Working","Visiting","Parking", "Info"]
}
