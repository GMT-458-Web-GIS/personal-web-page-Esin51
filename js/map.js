// Initialize OpenLayers after script loads
(function initOL(){
  if (!window.ol) return setTimeout(initOL, 150);
  const mapDiv = document.getElementById('ol-map');
  if (!mapDiv) return;

  // Hacettepe Beytepe Campus (approx.)
  const lon = 32.7486;
  const lat = 39.8717;
  const center = ol.proj.fromLonLat([lon, lat]);

  // Marker feature (red pin-like circle with white stroke)
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: "Hacettepe University — Beytepe Campus"
  });
  marker.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({ color: '#e53935' }), // red
      stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 })
    })
  }));

  const map = new ol.Map({
    target: 'ol-map',
    layers: [
      new ol.layer.Tile({ source: new ol.source.OSM() }),
      new ol.layer.Vector({ source: new ol.source.Vector({ features: [marker] }) })
    ],
    view: new ol.View({ center, zoom: 15 })
  });

  // Click: show coords
  map.on('click', (evt) => {
    const [LON, LAT] = ol.proj.toLonLat(evt.coordinate);
    console.log(`Lon: ${LON.toFixed(5)}  Lat: ${LAT.toFixed(5)}`);
  });
})();
