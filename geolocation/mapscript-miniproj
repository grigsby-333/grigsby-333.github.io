// Map part

const map = L.map('map', { 
    center: [39.82833, -98.57948],
    zoom: 4
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);  

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm }
).addTo(map);



// Geolocation part

let options = {
    enableHighAccuracy: true,
    timeout: 45000
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
} else {
    alert('Your browser does not natively support geolocation.');
}

function successCallback(position) {

    let msg = `<strong>You are here!</strong><br/>
        Longitude: ${position.coords.longitude.toFixed(7)}&deg;<br/>
        Latitude: ${position.coords.latitude.toFixed(7)}&deg;<br/>
        Accuracy: ${position.coords.accuracy.toFixed(2)} meters<br/>
        Time: ${new Date(position.timestamp).toLocaleString()}<br/>` // watch out spelling of locale

    if (position.coords.altitude)
        msg += `Altitude: ${position.coords.altitude.toFixed(2)} meters<br/>`
    if (position.coords.altitudeAccuracy)
    	msg += `Altitude Accuracy: ${position.coords.altitudeAccuracy} meters<br/>`
    if (position.coords.heading)
    	msg += `Heading: ${position.coords.heading}&deg;<br/>`
    if (position.coords.speed) {
    	msg += `Speed: ${position.coords.speed} m/s`;
    }
    
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let accuracy = position.coords.accuracy;   

    // center the map on the user's location
    map.flyTo([lat, lng], 17);

        L.marker([lat, lng])
        .addTo(map)
        .bindPopup(msg)

        L.circle([lat, lng], {
        radius: accuracy,      
        color: '#0078ff',      
        fillColor: '#0078ff',  
        fillOpacity: 0.15,    
        weight: 1.5           
    })
    .addTo(map);
        
}

function errorCallback(error) {
    const msgs = { 
        [error.PERMISSION_DENIED]: alert('Permission denied'),
        [error.POSITION_UNAVAILABLE]: alert('Position unavailable'),
        [error.TIMEOUT]: 'Request timeout',
        [error.UNKNOWN_ERROR]: 'Unknown error'
    };
    document.getElementById("log").innerHTML = `Error: ${msgs[error.code]}`;
    
}
