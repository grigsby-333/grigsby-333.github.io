let map = L.map('map');
map.removeControl(map.zoomControl);
map.setView([40, -96], 5);

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);  

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17, 
    attribution: 'Map data: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}{r}.png?key={apikey}', {
    subdomains: 'abcd',
    maxZoom: 20, 
    variant: 'dark_all',
	apikey: 'cb1_4szh_1_c6180b1b433eeb022fb4e081',
    attribution:'<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

const stamenWatercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key={apikey}', {
	minZoom: 1,
	maxZoom: 16,
    apikey: '59efc81c-a8d3-492e-9868-782cd736d785',
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const Thunderforest_OpenCycleMap = L.tileLayer('https://api.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '442885e7e62f4500b79308f9fe45fe13',
	maxZoom: 22
});

const Thunderforest_Pioneer = L.tileLayer('https://api.thunderforest.com/pioneer/{z}/{x}/{y}{r}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '442885e7e62f4500b79308f9fe45fe13',
	maxZoom: 22
});

const Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}?api_key={apikey}', {
	minZoom: 0,
	maxZoom: 20,
     apikey: '59efc81c-a8d3-492e-9868-782cd736d785',
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

const NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
    maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
    
});

const Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
});

var zoomWarningBox = L.control({ position: 'topright' });

zoomWarningBox.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'zoom-warning-box hidden-panel'); 
    this._div.innerHTML = 'If a layer cannot be selected, try zooming out';
    return this._div;
};

zoomWarningBox.addTo(map);

let layer_control = L.control.layers({
    'Streets': streets,
    'Watercolor' : stamenWatercolor,
    'Dark' : dark, 
    'Pioneer' : Thunderforest_Pioneer,
    'Cycling' : Thunderforest_OpenCycleMap,
    'Satellite': satellite,
    'Topograhpic' : topo,
    'Shaded Relief' : Esri_WorldShadedRelief,
    'Outdoors' : Stadia_Outdoors,
    'Earth at Night' : NASAGIBS_ViirsEarthAtNight2012

}) .addTo(map);

var infoBox = L.control({ position: 'bottomleft' });

infoBox.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'layer-info-box'); 
    this.update('Select a map layer from the control panel to view details.');
    return this._div;
};

infoBox.update = function (text) {
    this._div.innerHTML = '<h4>Active Layer Details</h4><p>' + text + '</p>';
};

infoBox.addTo(map);

const layerDescriptions = new Map([
    [streets, '<strong>Esri World Street Map:</strong> Global street map featuring major highways, local roads, and urban layouts. <br/> <a href="https://www.esri.com/en-us/home">esri</a>'],
    [stamenWatercolor, '<strong>Watercolor:</strong> An artistic map designed by Stamen, with hand-painted watercolor-like textures. <br/> <a href="https://stamen.com/">Stamen Design</a>'],
    [dark, '<strong>Carto Dark Matter:</strong> A minimalist dark-themed basemap. <br/> <a href="https://carto.com/">CARTO</a>'],
    [Thunderforest_Pioneer, '<strong>Thunderforest Pioneer:</strong> A travel map styled to evoke historical, utility, and legacy rail layout aesthetics. <br/> <a href="https://www.thunderforest.com/">Thunderforest</a>'],
    [Thunderforest_OpenCycleMap, '<strong>OpenCycleMap:</strong> A map specifically for cyclists, showing regional bike paths, tracks, and altitude contours. <br/> <a href="https://www.thunderforest.com/">Thunderforest</a>'],
    [satellite, '<strong>Esri World Imagery:</strong> Satellite and high-altitude aerial imagery. <br/> <a href="https://www.esri.com/en-us/home">esri</a> '],
    [topo, '<strong>OpenTopoMap:</strong> Topographic map showing geographic terrain features and physical elevation shifts. <br/> <a href="https://www.openstreetmap.org/">OpenStreetMap</a> '],
    [Esri_WorldShadedRelief, '<strong>Esri Shaded Relief:</strong> A surface map focusing visually on terrain structures and shadows. <br/> <a href="https://www.esri.com/en-us/home">esri</a>'],
    [Stadia_Outdoors, '<strong>Stadia Outdoors:</strong> Map made for hiking, trail-running, and general outdoor activities with outdoor recreation areas emphasized. <br/> <a href="https://stadiamaps.com/">Stadia Maps</a>'],
    [NASAGIBS_ViirsEarthAtNight2012, '<strong>NASA Earth at Night:</strong> Composited satellite data showcasing worldwide city lights and night luminescence. <br/> <a href="https://www.nasa.gov/">NASA</a>']
]);

map.on('baselayerchange', function (event) {
    let description = layerDescriptions.get(event.layer) || 'No supplementary data available for this layer.';
    infoBox.update(description);
});
