import * as _Map from 'esri/Map';
import * as _MapView from 'esri/views/MapView';
import * as _FeatureLayer from 'esri/layers/FeatureLayer';
import * as _SimpleRenderer from 'esri/renderers/SimpleRenderer';
import * as _PopupTemplate from 'esri/PopupTemplate';
import * as _Expand from 'esri/widgets/Expand';
import * as _Search from 'esri/widgets/Search';
import * as _Locator from 'esri/tasks/Locator';
import * as _Point from 'esri/geometry/Point';
import * as _WatchUtils from 'esri/core/watchUtils';
import './style.scss';

const checkBoxes:NodeList = document.querySelectorAll('input');
const resetBtn: HTMLElement = document.getElementById('btnReset');

// Function to reset checkboxes back to unchecked
function _resetCheckbox(nodelist, layer): void {
    Array.prototype.forEach.call(nodelist, function (node) {
        if (node.checked === true) {
            node.checked = false;
        };
    });
    layer.definitionExpression = '1=1';
};

// Function that filters the data based on the checkboxes
function _filterData(nodelist, layer): void {
    Array.prototype.forEach.call(nodelist, function(node){
        node.addEventListener('click', (e: Event) => {
            let filterVals: string[] = [];
            let sqlString: string = '';
            Array.prototype.forEach.call(nodelist, function (node) {
                if (node.checked === true) {
                    // console.log(node.id);
                    filterVals.push(node.id.toString());
                };
            });
            let sqlExp = _sqlExpression(filterVals, sqlString);
            layer.definitionExpression = sqlExp;
        });
    });
};

// Function that constructs the sql expression used in the _filterData() method
// It uses an array of used checkboxes
function _sqlExpression(valuesArray: string[], initialSQLString: string): string {
    valuesArray.forEach(value => {
        if (value === 'clothes') {
            initialSQLString += ' Clothes = 0 OR'
        }
        else if (value === 'toys') {
            initialSQLString += ' Toys = 0 OR'
        }
        else if (value === 'books') {
            initialSQLString += ' Books = 0 OR'
        }
        else if (value === 'furniture') {
            initialSQLString += ' Furniture = 0 OR'
        }
        else if (value === 'food') {
            initialSQLString += ' Food = 0 OR'
        }
        else if (value === 'cellphones') {
            initialSQLString += ' CellPhones = 0 OR'
        }
        else if (value == 'other') {
            initialSQLString += ' Other = 0 OR'
        }
    });
    let sqlExp = initialSQLString.slice(0, -2);
    // console.log(sqlExp);
    return sqlExp;
};
// Function that gets the centers of the map and returns the name of the city
// After, the string is placed in the header of the page (right side)
function _getMapLocation(mapView){
    let address = _cityFromCoordinates(mapView.center);
    let mapLocationDiv: HTMLElement = document.getElementById('mapCity');
    let mapLocationMobileDiv: HTMLElement = document.getElementById('mapCityMobile');
    address.then(address => mapLocationDiv.innerHTML = address['attributes']['City'] + ", " + address['attributes']['CountryCode']);
    address.then(address => mapLocationMobileDiv.innerHTML = address['attributes']['City'] + ", " + address['attributes']['CountryCode']);
};
// Async function that gets the name of the city using the coordinates from the center of the map
async function _cityFromCoordinates(location: object): Promise<object> {
    let mapPoint = new _Point({latitude: location['latitude'], longitude: location['longitude']});
    let address = await mapLocator.locationToAddress(mapPoint);
    return address;
};
// Locator constructor
const mapLocator = new _Locator({
    url: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
});
// Feature layer constructor
const _featureLayer = new _FeatureLayer({
    url: 'https://services6.arcgis.com/MLuUQwq7FiARivuF/arcgis/rest/services/DonationLocations/FeatureServer',
    outFields: ['*'],
    popupEnabled: true,
    renderer: new _SimpleRenderer({
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 16,
            color: "red",
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 1,
                color: "white"
            }
        } 
    }),
    popupTemplate: new _PopupTemplate({
        title: '{Name}',
        content: [{
            type: 'fields',
            fieldInfos: [
                { fieldName: 'Town', label: 'Town' } ,
                { fieldName: 'Clothes', label: 'Can clothes be donated?' } ,
                { fieldName: 'Toys', label: 'Can toys be donated?' } ,
                { fieldName: 'Books', label: 'Can books be donated?' } ,
                { fieldName: 'Furniture', label: 'Can furniture be donated?' } ,
                { fieldName: 'Food', label: 'Can food be donated?' } ,
                { fieldName: 'CellPhones', label: 'Can phones be donated?' } ,
                { fieldName: 'Other', label: 'Can other things be donated?' } ,
                { fieldName: 'ContactNumber', label: 'Contact number/address' } ,
                { fieldName: 'Description', label: 'Description' } 
            ]
        },
        {
            type: "attachments"
        }]
    })
});
// Map constructor
const _map = new _Map({
    basemap: "dark-gray"
});
_map.add(_featureLayer);
// Map View constructor
const _mapView = new _MapView({
    container: 'mapDiv',
    map: _map,
    zoom: 13, // Sets zoom level based on level of detail (LOD)
    center: [26.10, 44.43], // Sets center point of view using longitude,latitude
    constraints: {
        rotationEnabled: false
    },
    popup: {
        dockEnabled: true,
        dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
            position: 'bottom-left'
        }
    }
});
document.getElementById('controls').style.display = 'block';
// Expand widget constructor
const layerListExpand = new _Expand({
    expandIconClass: "icon-ui-filter",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
    // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
    view: _mapView,
    content: document.getElementById("controls")
});
// Search widget constructor
const searchWidget = new _Search({
    view: _mapView,
    popupEnabled: false,
    popupOpenOnSelect: false,
    resultGraphicEnabled: false
});

_mapView.ui.add(layerListExpand, "top-right");
_mapView.ui.add(searchWidget, 'top-left');
_getMapLocation(_mapView);
// It watches when the map becomes stationary (no more moves) and after 
// _getMapLocation() method is called
_WatchUtils.whenTrue(_mapView, 'stationary', () => {
    _getMapLocation(_mapView);
});

// _filterData() method is called
_filterData(checkBoxes, _featureLayer);
// Event placed on the checkboxes that will reset all checkboxes when 
// reset button is clicked
resetBtn.addEventListener('click', (e: Event) => _resetCheckbox(checkBoxes, _featureLayer));

