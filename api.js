//require('dotenv').config()


mapboxgl.accessToken = "pk.eyJ1Ijoic2hhbS1hbmFzdGFzaWEiLCJhIjoiY2xpeDdiMTZqMDU1ODNlbzE1eTU3eDB3cSJ9.v94ID-OfPNLsdY3TkQ3RHQ";

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
  xFormElement.value = lat;
  yFormElement.value = lng;

});
const addLayerToMap = (data) => {
  map.addSource("data", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    }
  })
  map.addLayer({
    id: "layer",
    type: "fill",
    source: "data", 
    layout: {},
    paint: {
      "fill-color": "#0080ff", 
      "fill-opacity": 0.5,
    },
  })
}

const blockSubmitButton = () => {
  sendFormElement.disabled = true;
}
const unblockSubmitButton = () => {
  sendFormElement.disabled = false;
};

formElement.addEventListener('submit', (evt) => {

  //evt.preventDefault();

  if (evt === "") {
    blockSubmitButton();

    sendData(
      () => {
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }



  fetch(`${baseURL}?city=${cityElement.value}&x_from=${xFormElement.value}&y_from=${yFormElement.value}&view_distance=${viewElement.value}`,{
    method: "GET",
    headers: {"Content-Type": "application/json"}
  }) 

  .then(


    map.on('load', () => {
      addLayer(data)({
        id: "",
        type: "line",
        source: "data",
        layout: {},
        paint: {
        "line-color": "#000",
        "line-width": 3
        }
      })
    }) 
  )
})   
  
  console.log(addLayerToMap)

