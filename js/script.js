
/******************Air Quality*********************/

var api_key = '56tZjZRYjBJyB6rxG'; 

function getAirAPIdata() {

  // get latest AIR Quality
  fetch('https://api.airvisual.com/v2/nearest_city?lat=52.085519&lon=4.319601&key=' +api_key)
  
  // parse to JSON format
  .then(function(response) {
    return response.json();
  })
  
  .then(function(response) {

    onAirAPISucces(response);
  })
  
  // catch error
  .catch(function (error) {
    // onAPIError();
    console.error('Request failed', error);
  });
}


/**
 */
function onAirAPISucces(response) {
  var aQ = response.data.current.pollution.aqicn;
  var pr = response.data.current.weather.pr;
  var hu = response.data.current.weather.hu;
  var ws = response.data.current.weather.ws; 

  var airQualityBox = document.getElementById('airQuality');

    forecastMessage =  '<div class="airQualityData">';
    forecastMessage += '<h1 class=contentTitle>Air Quality</h1>'
    forecastMessage +=   '<div class="aq"> Air Quality: <strong>'+aQ+'</strong> (AQI value based on China MEP standard) </div>';
    forecastMessage +=   '<div class="pr"> Atmospheric pressure: <strong>'+pr+'</strong> hPa </div>';
    forecastMessage +=   '<div class="hu"> Humidity: <strong>'+hu+'</strong>&#37; </div>';    
    forecastMessage +=   '<div class="ws"> Wind speed: <strong>'+ws+'</strong> m/s </div>';
    forecastMessage += '</div>';

    airQualityBox.innerHTML = forecastMessage;

}

/**
 * Error
 */
function updateAirUIError() {
}


/*********weather******************/

/**
 * Fetch API data
 */
function getWeatherAPIdata() {

  // get latest weather
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=52.085519&lon=4.319601&appid=c9176a6b7f50ae00bdf9a78a7a490cf9')
  
  // parse to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // render weather per day
  .then(function(response) {

    // render weatherCondition
    onAPISucces(response);
  })
  
  // catch error
  .catch(function (error) {
    // onAPIError();
    console.error('Request failed', error);
  });
}


/**
 * Render weather listing
 */
function onAPISucces(response) {

  var weatherBox = document.getElementById('weatherNotice');
  var weatherList = response.list[0];
//console.log(weatherList);



    //console.log(weatherList[i].main.temp - 273.15);
    var weather= weatherList.weather[0].main;
    var temp = Math.floor(weatherList.main.temp - 273.15);
    var iconUrl = 'http://openweathermap.org/img/w/'+weatherList.weather[0].icon+'.png';

    forecastMessage =  '<div class="forecastMoment">';
    forecastMessage +=   '<div class="temp"> '+temp+'&#176;C </div>';
    forecastMessage +=   '<div class="icon"> <img src="'+iconUrl+'"> </div>';
    forecastMessage += '</div>';


    weatherBox.innerHTML = forecastMessage;
  }


/**
 * Error
 */
function updateUIError() {
  var weatherBox = document.getElementById('weatherNotice');
  //weatherBox.className = 'hidden'; 
}




/*----------------google maps--------------------*/

var map;
var service;
var restaurantInfoWindows;

function initMap() {
  var malie_veld= {lat:52.085519,  lng:4.319601}; 
  var mapOptions = {
  center: {lat: 52.085519, lng: 4.319601},
  zoom: 14,
  center: malie_veld,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ],
  mapTypeControlOptions: {
    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain' ]
 }                   
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
     
  var landingSite = new google.maps.Circle({
    center: malie_veld,
    radius: 200,
    strokeColor: "#FFF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFF",
    fillOpacity: 0.4
  });
  landingSite.setMap(map);







var icon = {
  url: "images/arrival.svg",
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(25, 25),
  scaledSize: new google.maps.Size(50, 50)
};





var request ={
    location: malie_veld,
    radius: '5000',
    query: 'restaurant'
  };

  var infowindow = new google.maps.InfoWindow();
  restaurantInfoWindows= new google.maps.InfoWindow({maxWidth:300});
        var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
        location: malie_veld,
    radius: 2500,
    type: ['restaurant']}, callback);


        service.getDetails({
          placeId: 'ChIJ____v3O3xUcRumK6-sQ-Lfk'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
          position: malie_veld,
          map: map,
          title: "Malie Veld",
          icon: icon
            });
            //var title = marker.title;
            google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    map.setCenter(marker.getPosition());
    getWeatherAPIdata();
    getAirAPIdata();
    infowindow.setContent('<div class="landingZoneContent">' +
      '<div id="weatherNotice">' +
      '</div>' +
      '<h1 id="contentHeader">'+ place.name + '</h1>' +
      '<div id="bodyContent">' +
        '<div id="airQuality"></div>' +
     '<div id="location">' + '<h1 class="contentTitle adres">Adres</h1>' +'<div id="adresGegevens">'+ place.formatted_address + '</div>' + '<img id="image" src="'+ place.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) + '">' + '</div>' +        
     '</div>' +
      '</div>');
            });
          }
        });
      }


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var restaurantIcon = {
  url: "images/food.svg",
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(25, 25),
  scaledSize: new google.maps.Size(50, 50)
};
        var marker = new google.maps.Marker({
          map: map,
          icon: restaurantIcon,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          restaurantInfoWindows.setContent(
'<div class="restaurantContent">' +
      '<h1 id="restaurantContentHeader">'+ place.name + '</h1>' +
      '<div id="restaurantBodyContent">' +
     '<div id="restaurantLocation">' + '<img id="restaurantImage" src="'+ place.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}) + '">' + '</div>' +        
     '</div>' +
      '</div>'
            //place.name + place.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250})
            );
          restaurantInfoWindows.open(map, this);
        });
      }