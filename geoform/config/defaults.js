define({
    //Default configuration settings for the applciation. This is where you"ll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings
    //and url parameters.
    "appid": "",
    "webmap": "5f2e2bb86b2f4e4d9e9ed11093bb53f8",
    "form_layer": {
        "id": "DonationLocations_7694"
    },
    "details": {
        "Title": "Donation locations form",
        "Logo": "",
        "Description": "Use this form to add new locations where donations can be made"
    },
    "fields": {
        "DonationLocations_7694": [
            {
                "name": "Name", // field ID
                "alias": "Name", // label
                "fieldDescription": "Add a name", // help text
                
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Town", // field ID
                "alias": "Town", // label
                "fieldDescription": "Add a town", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Clothes", // field ID
                "alias": "Clothes", // label
                "fieldDescription": "Can clothes be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Toys", // field ID
                "alias": "Toys", // label
                "fieldDescription": "Can toys be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Books", // field ID
                "alias": "Books", // label
                "fieldDescription": "Can books be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Furniture", // field ID
                "alias": "Furniture", // label
                "fieldDescription": "Can furniture be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Food", // field ID
                "alias": "Food", // label
                "fieldDescription": "Can food be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "CellPhones", // field ID
                "alias": "Phones", // label
                "fieldDescription": "Can phones be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "Other", // field ID
                "alias": "Other things", // label
                "fieldDescription": "Can other things be donated?", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            },
            {
                "name": "ContactNumber", // field ID
                "alias": "Contact (number / address / email)", // label
                "fieldDescription": "Add a contact for the location", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            }, {
                "name": "Description", // field ID
                "alias": "Description", // label
                "fieldDescription": "Add a description for the location", // help text
                "visible": true, // show this field?
                "typeField": false, // subtype field?
                "tooltip": "", // placeholder text
                "displayType": "text" // text, checkbox, radio, textarea, url, email
            }
    ]
    },
    "theme": "paper", // see values in themes.js
    "oauthappid": null,
    //Enter the url to the proxy if needed by the applcation. See the "Using the proxy page" help topic for details
    // //developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "",
    //Example of a template specific property. If your template had several color schemes
    //you could define the default here and setup configuration settings to allow users to choose a different
    //color theme.
    //Enter the url to your organizations bing maps key if you want to use bing basemaps
    "bingmapskey": "",
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": "https://www.arcgis.com",
    "units": null,
    "useSmallHeader": true,
    "enableSharing": true,
    "defaultMapExtent": true,
    "pushpinColor": "blue",
    "nextBasemap": "hybrid",
    "defaultBasemap": "topo",
    "selectedTitleField": {},
    "disableViewer": true,
    "enableAttachments": true,
    "attachmentIsRequired": false,
    "attachmentLabel": "Add attachments (pictures)",
    "attachmentHelpText": "Add a picture",
    "showLayer": true,
    "disableLogo": true,
    "enableBasemapToggle": false,
    "enableOfflineSupport": true,
    "locate":false,
    "locationSearchOptions": {
        "enableMyLocation": true,
        "enableSearch": true,
        "enableLatLng": true,
        "enableUSNG": false,
        "enableMGRS": false,
        "enableUTM": false
    },
    "locationSearch": true,
    //When searchExtent is true the locator will prioritize results within the current map extent.
    "searchExtent": false,
    "searchLayers":[{
        "id": "",
        "fields": []
    }],
    "attachmentInfo":{
        "DonationLocations_7694": {
            "enableAttachments": true,
            "attachmentIsRequired": false,
            "attachmentLabel": "Add an attachment (picture/s)",
            "attachmentHelpText": "Click this button to add an attachment"
        }
    },
    "submitButtonText": "Add a location",
    "viewSubmissionsText": "",
    "helperServices": {
        "geometry": {
            "url": null
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": null
        }]
    }
});