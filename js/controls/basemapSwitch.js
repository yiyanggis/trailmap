class BasemapSwitchControl {
    constructor(div,callback,options) {
          this._options={
            collapsed: true,
            position: 'topright',
            autoZIndex: true,
            exclusiveGroups: [],
            groupCheckboxes: false
          },
          this.callback=callback;
          //this._options=options;
          $.extend(this._options,options);
          //this.init(div,options);
    }

  onAdd(map){
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-zoom');
    this.btn = document.createElement('button');
    this.btn.setAttribute('type', 'button');
    this.btn.setAttribute('aria-label','Satelite View')
    this.btn.setAttribute('title','Satelite View')

    this.icon = document.createElement('span');
    //this.icon.classList.add('mapboxgl-ctrl');
    //this.icon.classList.add('button');
    //this.icon.classList.add('mapboxgl-ctrl-icon');
    this.icon.classList.add('button-icon-earth');
    this.btn.appendChild(this.icon);
    if(Config){    
        //this.icon.setAttribute('background-image','url("'+Config.earthIconURL+'")');
        //this.icon.setAttribute('background-size','29px');
        //this.icon.setAttribute('background-color','white');
    }
    

    this.container.appendChild(this.btn);
    this.map = map;
    this.basemap="basemap";
    this.layers=[];
    // this.zoomIn.addEventListener('click', () => {
    //   this.map.zoomIn();
    // });

    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].id === 'traceMap') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    map.addSource("mapbox-satellite", {
             "type": "raster", "url": "mapbox://mapbox.satellite", "tileSize": 256 }); 
    map.addLayer({ "type": "raster", "id": 'satellite-map', "source": "mapbox-satellite" },firstSymbolId);

    map.setLayoutProperty("satellite-map", 'visibility', 'none');
    // if(layerList){
    //     for (var i = layerList.length - 1; i >= 0; i--) {
    //         var layer = map.getLayer(layerList);
    //         this.layers.push(layer);
    //     }
    // }

    const that = this;
    this.btn.onclick = function(e){
        if(that.basemap == "basemap"){
            //that.map.setStyle('mapbox://styles/mapbox/satellite-v9')
            that.basemap ='satellite';
            // for (var i = that.layers.length - 1; i >= 0; i--) {
            //     that.map.addLayer(that.layers[i]);
            // }
            
            map.setLayoutProperty("satellite-map", 'visibility', 'visible');
            //that.btn.setAttribute('background-image','url('+Config.mapIconURL+')');
            that.icon.classList.remove('button-icon-earth');
            that.icon.classList.add('button-icon-map');
        }
        else{
            //that.map.setStyle(Config.baseStyle)
            map.setLayoutProperty("satellite-map", 'visibility', 'none');
            that.basemap ='basemap';
            // for (var i = that.layers.length - 1; i >= 0; i--) {
            //     that.map.addLayer(that.layers[i]);
            // }
            //add layers

            //that.btn.setAttribute('background-image','url('+Config.earthIconURL+')');
            that.icon.classList.remove('button-icon-map');
            that.icon.classList.add('button-icon-earth');
        }
    }

    return this.container;
  }
  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

}