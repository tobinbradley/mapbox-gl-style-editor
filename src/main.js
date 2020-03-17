/******************************************
 * Set style here
 ******************************************/
const mapStyle = './gl-style/style.json'



/******************************************
 * Ignore the rest of this stuff
 ******************************************/
const map = new mapboxgl.Map({
  container: 'map',
  style: mapStyle,
  hash: true
})

map.on('error', err => {
  const errorDiv = document.querySelector('#errors')
  errorDiv.innerHTML = err.error.message
  errorDiv.style.display = 'block'
})

map.on('click', e => {
  const features = map.queryRenderedFeatures(e.point)
  var displayProperties = [
    'type',
    'properties',
    'id',
    'layer',
    'source',
    'sourceLayer',
    'state'
  ]
  var displayProperties = ['properties', 'id', 'layer']

  var displayFeatures = features.map(function(feat) {
    var displayFeat = {
      id: feat.layer.id,
      type: feat.layer.type,
      'source-layer': feat.layer['source-layer'],
      source: feat.layer.source
    }
    return displayFeat
  })

  if (displayFeatures.length > 0) {
    new mapboxgl.Popup({ maxWidth: '500px'})
      .setLngLat(e.lngLat)

      .setHTML(
        '<pre style="max-height: 50vh; overflow: auto;">' +
          JSON.stringify(displayFeatures, null, 2) +
          '</pre>'
      )
      .addTo(map)
  }
})
