//require('dotenv').config()

mapboxgl.accessToken = procces.env.REST_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [30.317404, 59.951005], 
  zoom: 10, 
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

map.on('click', (evt) => {

  const coord = evt.lngLat;

  lng = coord.lng
  lat = coord.lat

  marker.setLngLat(coord).addTo(map);
  xFormElement.value = lat.toFixed(6);
  yFormElement.value = lng.toFixed(6);
});

const addRouteLayer = (json) => {
 /* map.addSource("route", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    }
  });
  map.addLayer({
    id: "route",
    type: "line",
    source: "isochrone",
    paint: {
      'line-color': '#877b59',
      'line-width': 1
    }
  });*/
  console.log(json);
}

const addLayerToMap = (data) => {
  map.addSource("isochrone", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    }
  });
  map.addLayer({
    id: "isochrone",
    type: "fill",
    source: "isochrone", 
    layout: {},
    paint: {
      'fill-color': "#0080ff", 
      'fill-opacity': 0.5,
    },
  });
  map.addLayer({
    id: "route",
    type: "line",
    source: "isochrone",
    paint: {
      'line-color': '#877b59',
      'line-width': 1
    }
  });
  console.log(addLayerToMap(data));
}

const formSubmitHandler = (evt => {
  evt.preventDefault()

  fetch(`${baseURL}?city=${cityElement.value}&x_from=${xFormElement.value}&y_from=${yFormElement.value}&view_distance=${viewElement.value}`,{
    method: "GET",
    headers: {"Content-Type": "application/json"}
  }) 
  .then(data => data.json())
  .then(addRouteLayer)
})

formElement.addEventListener('submit', formSubmitHandler)


