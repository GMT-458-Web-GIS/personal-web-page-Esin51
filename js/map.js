// Hacettepe Geomatics (Harita) Mühendisliği — bina odağı + tıklamayla taşınabilir pin
(function initOL(){
  if (!window.ol) return setTimeout(initOL, 150);
  const mapDiv = document.getElementById('ol-map');
  if (!mapDiv) return;

  // Yaklaşık koordinat (binaya yakın)
  const deptLonLat = [32.7469, 39.8709]; // [lon, lat]
  const deptCenter = ol.proj.fromLonLat(deptLonLat);

  // Pin + etiket
  const pinStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({ color: '#7b6dff' }),
      stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 })
    }),
    text: new ol.style.Text({
      text: 'Geomatics Eng. Dept.',
      font: '600 12px Poppins, sans-serif',
      offsetY: -16,
      fill: new ol.style.Fill({ color: '#1b1740' }),
      stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 })
    })
  });

  const marker = new ol.Feature({
    geometry: new ol.geom.Point(deptCenter),
    name: 'Hacettepe – Geomatics Eng. Dept.'
  });
  marker.setStyle(pinStyle);

  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({ features: [marker] })
  });

  const map = new ol.Map({
    target: 'ol-map',
    layers: [
      new ol.layer.Tile({ source: new ol.source.OSM() }),
      vectorLayer
    ],
    view: new ol.View({
      center: deptCenter,
      zoom: 17
    })
  });

  // Tek tıkla pini taşı → istediğin pik noktayı yakalayabilirsin
  map.on('singleclick', (evt) => {
    marker.getGeometry().setCoordinates(evt.coordinate);
    const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
    console.log(`Marker moved to Lon: ${lon.toFixed(6)}  Lat: ${lat.toFixed(6)}`);
  });
})();
