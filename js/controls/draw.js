


// a plugin to get geojson data and add to map
// Author: Yi Yang

//(function() {
//    "use strict";

    class geojsondataForm {
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
        var className = 'geojsonControl',
          container = this._container = document.createElement('div');

        container.className=className;

        // Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
        container.setAttribute('aria-haspopup', true);

        var form = this._form = document.createElement('form');

        //add title
        var title = document.createElement('div');
        title.className="title";
        var label = document.createElement('h3');
        label.innerHTML="Get Geojson";
        var separator = document.createElement('hr');

        title.appendChild(label);
        title.appendChild(separator);

        //add selector
        //<input type="radio" name="group1" value="Milk"> Milk<br>
        //this._addItem(700,true);
        //this._addItem(1200,false);
        //this._addItem(2200,false);
        //this._addItem(4000,false);

        container.appendChild(title);

        //add inputs
        //<div class="input-group mb-3">
        // <div class="input-group-prepend">
        //   <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
        // </div>
        // <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">

        var latInputGroup, lngInputGroup, flcDisInputGroup, flcAltiInputGroup, fabDisInputGroup;
        var latInputLbl,lngInputLbl,flcDisInputLbl, flcAltiInputLbl, fabDisInputLbl;
        var latInput,lngInput,flcDisInput, flcAltiInput, fabDisInput;

        //latitude input
        latInputGroup=document.createElement('div');
        latInputGroup.className="input-group";
        var latInputPre=document.createElement('div');
        latInputPre.className="input-group-prepend";
        latInputLbl=document.createElement('span');
        latInputLbl.className="input-group-text"
        latInputLbl.id="latInputLbl";
        latInputLbl.innerHTML="Latitude";
        latInput=document.createElement('input');
        latInput.setAttribute("type","text");
        latInput.className="form-control";
        latInput.id="latInput";
        latInput.value='43.6532';
        latInput.setAttribute("aria-describedby","latInputLbl");
        //latInput.innerHTML="Latitude";
        latInputPre.appendChild(latInputLbl);
        latInputGroup.appendChild(latInputPre);
        latInputGroup.appendChild(latInput);
        form.appendChild(latInputGroup);

        //lngitude input
        lngInputGroup=document.createElement('div');
        lngInputGroup.className="input-group";
        var lngInputPre=document.createElement('div');
        lngInputPre.className="input-group-prepend";
        lngInputLbl=document.createElement('span');
        lngInputLbl.className="input-group-text"
        lngInputLbl.id="lngInputLbl";
        lngInputLbl.innerHTML="Longitude";
        lngInput=document.createElement('input');
        lngInput.setAttribute("type","text");
        lngInput.className="form-control";
        lngInput.id="lngInput";
        lngInput.value='-79.3832';
        lngInput.setAttribute("aria-describedby","lngInputLbl");
        //latInput.innerHTML="Latitude";
        lngInputPre.appendChild(lngInputLbl);
        lngInputGroup.appendChild(lngInputPre);
        lngInputGroup.appendChild(lngInput);
        form.appendChild(lngInputGroup);

        //flc dis input
        flcDisInputGroup=document.createElement('div');
        flcDisInputGroup.className="input-group";
        var flcDisInputPre=document.createElement('div');
        flcDisInputPre.className="input-group-prepend";
        flcDisInputLbl=document.createElement('span');
        flcDisInputLbl.className="input-group-text"
        flcDisInputLbl.id="flcDisInputLbl";
        flcDisInputLbl.innerHTML="FLC Radius";
        flcDisInput=document.createElement('input');
        flcDisInput.setAttribute("type","text");
        flcDisInput.className="form-control";
        flcDisInput.id="flcDisInput";
        flcDisInput.value='500';
        flcDisInput.setAttribute("aria-describedby","flcDisInputLbl");
        //latInput.innerHTML="Latitude";
        flcDisInputPre.appendChild(flcDisInputLbl);
        flcDisInputGroup.appendChild(flcDisInputPre);
        flcDisInputGroup.appendChild(flcDisInput);
        form.appendChild(flcDisInputGroup);

        //flc altitude input
        flcAltiInputGroup=document.createElement('div');
        flcAltiInputGroup.className="input-group";
        var flcAltiInputPre=document.createElement('div');
        flcAltiInputPre.className="input-group-prepend";
        flcAltiInputLbl=document.createElement('span');
        flcAltiInputLbl.className="input-group-text"
        flcAltiInputLbl.id="flcAltiInputLbl";
        flcAltiInputLbl.innerHTML="FLC Altitude";
        flcAltiInput=document.createElement('input');
        flcAltiInput.setAttribute("type","text");
        flcAltiInput.className="form-control";
        flcAltiInput.id="flcAltiInput";
        flcAltiInput.value='300';
        flcAltiInput.setAttribute("aria-describedby","flcAltiInputLbl");
        //latInput.innerHTML="Latitude";
        flcAltiInputPre.appendChild(flcAltiInputLbl);
        flcAltiInputGroup.appendChild(flcAltiInputPre);
        flcAltiInputGroup.appendChild(flcAltiInput);
        form.appendChild(flcAltiInputGroup);

        //fab distance input
        fabDisInputGroup=document.createElement('div');
        fabDisInputGroup.className="input-group";
        var fabDisInputPre=document.createElement('div');
        fabDisInputPre.className="input-group-prepend";
        fabDisInputLbl=document.createElement('span');
        fabDisInputLbl.className="input-group-text"
        fabDisInputLbl.id="fabDisInputLbl";
        fabDisInputLbl.innerHTML="Fab Radius";
        fabDisInput=document.createElement('input');
        fabDisInput.setAttribute("type","text");
        fabDisInput.className="form-control";
        fabDisInput.id="fabDisInput";
        fabDisInput.value='20000';
        fabDisInput.setAttribute("aria-describedby","fabDisInputLbl");
        //latInput.innerHTML="Latitude";
        fabDisInputPre.appendChild(fabDisInputLbl);
        fabDisInputGroup.appendChild(fabDisInputPre);
        fabDisInputGroup.appendChild(fabDisInput);
        form.appendChild(fabDisInputGroup);

        //submit button
        //<button type="button" class="btn btn-success">Success</button>
        //<button type="button" class="btn btn-warning">Warning</button>

        var submitBtn=document.createElement("button");
        submitBtn.className="btn btn-success";
        submitBtn.setAttribute("type","button");
        submitBtn.innerHTML="Submit";
        

        var resetBtn=document.createElement("button");
        resetBtn.className="btn btn-warning";
        resetBtn.setAttribute("type","button");
        resetBtn.innerHTML="Reset";
        

        form.appendChild(submitBtn);
        form.appendChild(resetBtn);

        container.appendChild(form);

        var parent=document.getElementById(div);
        parent.append(container);

        var that=this;

        submitBtn.onclick=function(){
            that.onSubmit(that);
        }
        resetBtn.onclick=this.onReset;
      }

      onSubmit(param){
        //detect
        var isValid=true;

        if(isNaN(document.getElementById("latInput").value)){
            document.getElementById("latInput").className="form-control is-invalid"
            //return;
            isValid=false;
        }
        else{
            document.getElementById("latInput").className="form-control is-valid"
        }

        if(isNaN(document.getElementById("lngInput").value)){
            document.getElementById("lngInput").className="form-control is-invalid"
            //return;
            isValid=false;
        }
        else{
            document.getElementById("lngInput").className="form-control is-valid"
        }

        if(isNaN(document.getElementById("flcDisInput").value)){
            document.getElementById("flcDisInput").className="form-control is-invalid"
            //return;
            isValid=false;
        }
        else{
            document.getElementById("flcDisInput").className="form-control is-valid"
        }

        if(isNaN(document.getElementById("flcAltiInput").value)){
            document.getElementById("flcAltiInput").className="form-control is-invalid"
            //return;
            isValid=false;
        }
        else{
            document.getElementById("flcAltiInput").className="form-control is-valid"
        }

        if(isNaN(document.getElementById("fabDisInput").value)){
            document.getElementById("fabDisInput").className="form-control is-invalid"
            //return;
            isValid=false;
        }
        else{
            document.getElementById("fabDisInput").className="form-control is-valid"
        }

        if(isValid){
            param.callback(document.getElementById("latInput").value,document.getElementById("lngInput").value,document.getElementById("flcDisInput").value,document.getElementById("fabDisInput").value,document.getElementById("flcAltiInput").value)
            //console.log(param.callback);
        }
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
        var label = document.createElement('label'),
          input;

        var that=this;

        var container = this._container;

        var groupRadioName="filterSelector";

        input = this._createRadioElement(title, groupRadioName, checked);

        label.title=title;
        label.checked=true;

        //L.DomEvent.on(input, 'click', this._clickFilter, this);
        //label.addEventListener('click', this.callback(title), false);
        //label.addEventListener('click', alert("test"), false);
        $(label).on('click', function(e){
          //if(input)
          this.childNodes[0].checked=this.checked=!this.checked;

          that.callback(this.title,!this.checked);
        });
        //label.addEventListener('touchstart', this.callback(title), false);

        var name = document.createElement('span');
        name.innerHTML = ' ' + title+" ";

        label.appendChild(input);
        label.appendChild(name);

        container.appendChild(label);

        return label;
      }

      _createRadioElement (value, name, checked) {
        var radioHtml = '<input type="checkbox" class="leaflet-control-layers-selector" value="'+value+'" name="'+name+'"';
        if (checked) {
          radioHtml += ' checked="checked"';
        }
        radioHtml += '/>';

        var radioFragment = document.createElement('div');
        radioFragment.innerHTML = radioHtml;

        return radioFragment.firstChild;
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

  

