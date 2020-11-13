


// a plugin to get geojson data and add to map
// Author: Yi Yang

//(function() {
//    "use strict";

    class TextBox {
      constructor(div,callback,options) {
          this._options={
            collapsed: true,
            position: 'bottomleft',
            autoZIndex: true,
            exclusiveGroups: [],
            groupCheckboxes: false
          },
          this.callback=callback;
          //this._options=options;
          $.extend(this._options,options);
          this.init(div,options);
      }

      init(div,options){
        this.onAdd(div)
      }

      onAdd(div) {
        this._initLayout(div);
        this._update();

        return this._container;
      }

      onRemove(div) {

      }

      _initLayout(div) {
        var className = 'textControl',
          container = this._container = document.createElement('div');

        container.className=className;

        // Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
        container.setAttribute('aria-haspopup', true);

        //add title
        var title = document.createElement('div');
        var label = document.createElement('p');
        label.style.fontSize='30px';
        label.style.color = "#FF0000";
        title.style.backgroundColor = "#00FF00";
        label.innerHTML="sample textbox text";
        if(this._options.text){
          label.innerHTML=this._options.text
        }

        title.appendChild(label);
        container.appendChild(title);

        return container;
      }

      onReset(e){
        document.getElementById("latInput").value="";
        document.getElementById("lngInput").value="";
        document.getElementById("flcDisInput").value="";
        document.getElementById("flcAltiInput").value="";
        document.getElementById("fabDisInput").value="";

        document.getElementById("latInput").className="form-control";
        document.getElementById("lngInput").className="form-control";
        document.getElementById("flcDisInput").className="form-control";
        document.getElementById("flcAltiInput").className="form-control";
        document.getElementById("fabDisInput").className="form-control";


      }

      updateLocation(latlng){
        document.getElementById("latInput").value=latlng.lat;
        document.getElementById("lngInput").value=latlng.lng;
      }

      addItem(title){
        this._addItem(title,true);
      }

      _addItem (title,checked) {
        
      }

      _expand () {
        //L.DomUtil.addClass(this._container, 'leaflet-control-airspace_filter-expanded');
        // permits to have a scrollbar if overlays heighter than the map.
        //var acceptableHeight = this._map._size.y - (this._container.offsetTop * 4);

      }

      _collapse () {
        this._container.className = this._container.className.replace(' leaflet-control-airspace_filter-expanded', '');
      }

      _update(){

      }

    }
//});

  

