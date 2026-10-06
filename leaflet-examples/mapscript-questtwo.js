const map = L.map('map', { 
    center: [40.4416, -80.0097], 
    zoom: 15
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

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



const museums = [
    { name: "Fort Pitt Museum",  coords: [40.44064532652455, -80.0096605520375] },
    { name: "Andy Warhol Museum", coords: [40.44846160738356, -80.00251925552047] }
    
]

const things_to_do = [
    {name: "Point State Park",   coords: [40.44157866395688, -80.00789291482751]},
    { name: "National Aviary",   coords: [40.453342321168094, -80.00964288863806] }
]


const landmarks = [
    { name: "Duquesne Incline",   coords: [40.439869623578296, -80.01751050889243] },
    { name: "Kaufmann's Clock",  coords: [40.43998781806773, -79.99859287565022] }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],  // match SVG's width/height
        iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
        popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
    });
}

const museums_COLOR    = '#a6531c';
const LANDMARK_COLOR = '#1fbf78';
const todo_COLOR    = '#1f78bf'



const monongahela = [
    [40.43325924382228, -79.98482853974716],
    [40.43297115130987, -79.99666985814015],
    [40.437163739653876, -80.00694213469491], 
    [40.442601003422666, -80.01678387842416]
];

const allegheny = [
    [40.45870375926256, -79.98201947345297],
    [40.44773140063637, -79.996524860089459],
    [40.445036812969136, -80.0047476196454], 
    [40.442601003422666, -80.01678387842416] 
]

const ohio = [
    [40.442601003422666, -80.01678387842416],
    [40.447078277152215, -80.028196347283], 
    [40.4547853150222, -80.03780938458054]
]





// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const pnc = [
    // outer ring
    [
        [40.448096472358635, -80.00441397245788],
        [40.44761176731459, -80.00727032817437],
        [40.447391899956564, -80.00738195586905],
        [40.44628255822608, -80.00707333812497],
        [40.4462175962059, -80.00690917975045],
        [40.44605768942717, -80.00684351640065],
        [40.445892785163146, -80.00696171043029],
        [40.445822825656194, -80.00681068472575],
        [40.44609266906751, -80.00522163166046],
        [40.446527414507045, -80.00396089534424]
    ],
    // hole
    [
        [40.44713705280067, -80.00633790860715],
        [40.44733193600682, -80.00508373862588],
        [40.447217004953615, -80.00486048323656],
        [40.44675228173443, -80.00489988124643],
        [40.44633752604026, -80.00532012668518],
        [40.4462725640732, -80.00579946913875]
    ]
]

// multipolygon
const park = 
[
    // polygon 1
    [
        // first ring
        [
            [40.44303294517674, -80.00907324694022],
            [40.44215887638173, -80.01307089080382],
            [40.44167141000171, -80.01323653903022],
            [40.439914820796474, -80.00996774736274],
            [40.44067784012806, -80.00941026267041],
            [40.44140098496363, -80.00919902829318],
            [40.44223204240221, -80.00900971623659]
        ]
    ],
    // polygon 2
    [
        [
            [40.44233060014126, -80.00841847490945],
            [40.43999409718979, -80.00895959244899],
            [40.4395486395684, -80.00836325883398],
            [40.439615878643785, -80.00761232020768],
            [40.440918622455435, -80.00693868408702],
            [40.44243985908309, -80.00753501770203]
        ]
    ]
]

// 1. Points Layers Group

const museumsLayer = L.layerGroup(
    museums.map(f => L.marker(f.coords, { icon: svgIcon(museums_COLOR) })
        .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`)))
        .addTo(map);

const todoLayer = L.layerGroup(
  things_to_do.map(f => L.marker(f.coords, { icon: svgIcon(todo_COLOR) }) // construct a new array
    .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`)))
.addTo(map);

const landmarksLayer = L.layerGroup(
  landmarks.map(f => L.marker(f.coords, { icon: svgIcon(LANDMARK_COLOR) }) // construct a new array
  .bindPopup(`<strong>${f.name}</strong><br/>${f.note}`)))
.addTo(map);

// 2. Lines Layer
const linesLayer = L.layerGroup([
    L.polyline(monongahela, { color: '#2db0fc', weight: 20 }),
    L.polyline(allegheny, { color: '#1c7fa6', weight: 20 }),
    L.polyline(ohio, { color: '#09e6ee', weight: 20 })
]).addTo(map);

// 3. Polygon Layer
const polygon_style = {color: '#1f6f78', fillColor: '#128b5d', fillOpacity: 0.25};

const placeLayer = L.layerGroup([
    L.polygon(park, polygon_style),
    L.polygon(pnc, polygon_style)
]).addTo(map);

// 4. Create the control with all layers


const radar = L.tileLayer.wms('https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi', {
    layers: 'nexrad-n0r',
    format: 'image/png',
    transparent: true,
    attribution: 'Weather data &copy; Iowa Environmental Mesonet'
})

L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "Museums": museumsLayer, "Things to Do": todoLayer, "Landmarks": landmarksLayer, 
        "Rivers": linesLayer, "Places": placeLayer, "Radar": radar }
).addTo(map);