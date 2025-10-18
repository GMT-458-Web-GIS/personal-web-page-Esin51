// OpenLayers: OSM base, Ankara center (meets OL requirement)
const map = new ol.Map({
  target: 'ol-map',
  layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
  view: new ol.View({
    center: ol.proj.fromLonLat([32.8597, 39.9334]),
    zoom: 10
  })
});

// Show coords on click
map.on('click', (evt) => {
  const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
  console.log(`Lon: ${lon.toFixed(5)}  Lat: ${lat.toFixed(5)}`);
});
