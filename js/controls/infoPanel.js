


// a plugin to get geojson data and add to map
// Author: Yi Yang

//(function() {
//    "use strict";

    class InfoPanel {
      constructor(div,callback,options) {
          this._options={
            collapsed: true,
            position: 'bottomright',
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
        var className = 'infoControl',
          container = this._container = document.createElement('div');

        container.className=className;

        // Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
        container.setAttribute('aria-haspopup', true);

        var form = this._form = document.createElement('form');

        //add title
        var title = document.createElement('div');
        title.className="title";
        var label = document.createElement('h3');
        label.innerHTML="Tracing Tool";
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


        //addd text area
        //<div class="form-group">
        //    <label for="exampleFormControlTextarea1">Example textarea</label>
        //    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        //</div>
        
        var textArea1 = document.createElement('textarea');
        textArea1.className='form-control';
        textArea1.id='dataTextArea1';
        //textArea1.value='-100, 60';

        this.CoordinateText=textArea1;

        var textArea2 = document.createElement('textarea');
        textArea2.className='form-control';
        textArea2.id='dataTextArea2';
        //textArea2.innerHTML=

        this.GeojsonText=textArea2;

        var testGeojson = {
            'type': 'Polygon',
            'coordinates': [
                [
                  [
                    -70.2947116,
                    43.6776338
                  ],
                  [
                    -70.2964282,
                    43.6778356
                  ],
                  [
                    -70.3002691,
                    43.6793099
                  ]
                ]
            ]
        };

        //textArea2.value = JSON.stringify(testGeojson);

        var label1=document.createElement("label");
        label1.innerHTML="Coordinates";

        var label2=document.createElement("label");
        label2.innerHTML="Geojson";

        form.appendChild(label1);
        form.appendChild(textArea1);
        form.appendChild(label2);
        form.appendChild(textArea2);

        var submitBtn=document.createElement("button");
        submitBtn.className="btn btn-error";
        submitBtn.setAttribute("type","button");
        submitBtn.innerHTML="Delete";
        

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

  

