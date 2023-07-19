mapboxgl.accessToken = REST_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [30.317404, 59.951005], 
  zoom: 12, 
})

const baseURL = 'http://10.32.1.65:5000/api/v2/visibility_analysis/visibility_analysis';

const formElement = document.getElementById('upload-form');
const cityElement = document.getElementById('city');
const xFormElement = document.getElementById('x_from');
const yFormElement = document.getElementById('y_from');
const viewElement = document.getElementById('view_distance');
const sendFormElement = document.getElementById('upload-submit');

const marker = new mapboxgl.Marker({
  'color': '#314ccd'
})

const layerPaint = {
  'fill-color': "#0080ff", 
  'fill-opacity': 0.5,
};

const sourceName = "isochrone";


map.on('click', (evt) => {

  const coord = evt.lngLat;

  lng = coord.lng
  lat = coord.lat

  marker.setLngLat(coord).addTo(map);
  xFormElement.value = lat.toFixed(6);
  yFormElement.value = lng.toFixed(6);

});

const addRouteLayer = (json) => {
  console.log(json);
  return json
}

map.on('load', () => { 
    map.addSource(sourceName, {
      type: "geojson",
      data: {
        'type': 'FeatureCollection',
        'features': []
      }
    });

    map.addLayer({
      id: "polygon",
      type: "fill",
      source: sourceName, 
      layout: {},
      paint: layerPaint
    });
})

const formSubmitHandler = (evt => {
  evt.preventDefault()

  fetch(`${baseURL}?city=${cityElement.value}&x_from=${xFormElement.value}&y_from=${yFormElement.value}&view_distance=${viewElement.value}`,{
    method: "GET",
    headers: {"Content-Type": "application/json"}
  }) 
  .then(data => data.json())
  .then(data => updateSource(data))
})

let updateSource = (geojson) => {
  map.getSource(sourceName).setData(geojson);
}


formElement.addEventListener('submit', formSubmitHandler)
