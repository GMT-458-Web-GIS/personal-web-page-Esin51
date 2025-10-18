// Hacettepe Geomatics (Harita) Mühendisliği — kesin koordinat + tıklamayla pin taşı
(function initOL(){
  if (!window.ol) return setTimeout(initOL, 120);

  const mapDiv = document.getElementById('ol-map');
  if (!mapDiv) return;

  // >>> DOĞRU KOORDİNAT (lat: 39.86581451233189, lon: 32.73393670185093)
  // OpenLayers lon,lat ister:
  const deptLonLat = [32.73393670185093, 39.86581451233189];

  const center = ol.proj.fromLonLat(deptLonLat);

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

  const marker = new ol.Feature({ geometry: new ol.geom.Point(center) });
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
      center, zoom: 18    // yakınlaştırmayı bir tık arttırdım
    })
  });

  // Tek tıkla pini taşı (kontrol amaçlı konsola yaz)
  map.on('singleclick', (evt) => {
    marker.getGeometry().setCoordinates(evt.coordinate);
    const [lon, lat] = ol.proj.toLonLat(evt.coordinate);
    console.log(`Marker @ Lon ${lon.toFixed(8)}  Lat ${lat.toFixed(8)}`);
  });

  // Koordinatın gerçekten geldiğini konsolda görelim:
  console.log('Map centered @', deptLonLat);
})();
