// Wait until OpenLayers is available & the map div exists
(function initOL(){
  if (!window.ol) return setTimeout(initOL, 150); // retry until ol loads
  if (!document.getElementById('ol-map')) return; // no map on page

  const map = new ol.Map({
    target: 'ol-map',
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
    view: new ol.View({
      center: ol.proj.fromLonLat([32.8597, 39.9334]), // Ankara
      zoom: 10
    })
  });

  map.on('click', (evt) => {
    const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
    console.log(`Lon: ${lon.toFixed(5)}  Lat: ${lat.toFixed(5)}`);
  });
})();
