// OpenLayers: OSM zemin, Ankara merkez
const map = new ol.Map({
  target: 'map',
  layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
  view: new ol.View({
    center: ol.proj.fromLonLat([32.8597, 39.9334]),
    zoom: 10
  })
});

// Tıklayınca koordinatı konsola yaz
map.on('click', (evt) => {
  const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
  console.log(`Koordinat: ${lon.toFixed(5)}, ${lat.toFixed(5)}`);
});
