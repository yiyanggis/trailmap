class ZoomControl {
  onAdd(map){
    this.container = document.createElement('div');
    this.container.classList.add('mapboxgl-ctrl');
    this.container.classList.add('mapboxgl-ctrl-group');
    this.container.classList.add('mapboxgl-ctrl-zoom');
    this.zoomIn = document.createElement('button');
    this.zoomIn.setAttribute('type', 'button');

    this.container.appendChild(this.zoomIn);
    this.map = map;
    // this.zoomIn.addEventListener('click', () => {
    //   this.map.zoomIn();
    // });

    const that = this;
    that.zoomIn.textContent=that.map.getZoom().toFixed(1);

    this.map.on('zoom', function() {
		that.zoomIn.textContent=that.map.getZoom().toFixed(1);
		
	});

    return this.container;
  }
  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }

}