//require('dotenv').config()


mapboxgl.accessToken = TOKEN;

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
const searchFormElement = document.getElementById('upload-submit');

const marker = new mapboxgl.Marker({
  'color': '#314ccd'
})

map.on('click', (evt) => {

  const coord = evt.lngLat;

  lng = coord.lng
  lat = coord.lat

  marker.setLngLat(coord).addTo(map);

  getElevation();
});


async function getElevation() {
  const query = await fetch(
    `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${mapboxgl.accessToken}`,
    { method: 'GET'}
  );
  if (query.status !== 200) return;
  await query.json();
  formElement.textContent = lngLat.toFixed(6)

}

async function getResult() {
  preventDefault();
  const queryForm = await fetch(
    `${baseURL}?city=${cityElement.value}&x_from=${xFormElement.value}&y_from=${yFormElement.value}&view_distance=${viewElement.value}`,
    {method: 'GET', headers: {'Content-Type': 'application/json'}}
  );
  if (queryForm.status !== 200) return;
  await queryForm.json()
}
