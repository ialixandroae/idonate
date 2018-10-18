import * as _FeatureLayer from 'esri/layers/FeatureLayer';
import * as $ from '../dashboard/assets/js/core/jquery.min';
import * as Chartist from '../dashboard/assets/js/plugins/chartist.min';


$(document).ready(function(){
    const columnChart: HTMLElement = document.getElementById('columnChart');
    
    let layerData = _getDataValues('https://services6.arcgis.com/MLuUQwq7FiARivuF/arcgis/rest/services/DonationLocations/FeatureServer');
    layerData.then(data => {
        let _flData = _processData(data);
        // console.log(_flData);
        _initColumnChart(columnChart, _flData);
        _initLatestData(data);
        _initCardValues(_flData);
    });
    
});

export async function _getDataValues(url: string): Promise<object[]> {
    const featureLayer = new _FeatureLayer({
        url,
        outFields: ['*']
    });
    let toReturnArray = [];
    
    let data = await featureLayer.queryFeatures();
    data.features.map(feature => toReturnArray.push(feature));
    return toReturnArray;
};
function _processData(data: object[]): number[] {
    let toReturn = [];
    const types = ['Clothes', 'Toys', 'Books', 'Furniture', 'Food', 'CellPhones', 'Other'];
    types.map(type => {
        let count = 0;
        data.map(feature => {
            if (feature['attributes'][type] === 0) {
                count += 1;
            }
        });
        toReturn.push(count);
    })
    return toReturn;
};

function _initColumnChart(chartElement: HTMLElement, data: number[]): void {
    const dataObject = {
        labels: ['Clothes', 'Toys', 'Books', 'Furniture', 'Food', 'Phones', 'Other'],
        series: [
            data
        ]
    };
    const optionsObject = {
        low: 0,
        high: Math.max(...data), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        height: 284,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    }
    const columChart = new Chartist.Bar(chartElement, dataObject, optionsObject);
    const dataUpdate:HTMLElement = document.getElementById('columnChartDataUpdate');
    const today = new Date();
    const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dataUpdate.innerText = 'updated at: ' + time + ', ' + date;
};
function _initLatestData(data: object[]): void {
    let reverseData = data.reverse().slice(0, 5);
    const latestDataTable:HTMLElement = document.getElementById('latestLocationTableBody');
    reverseData.map((feature,index) => {
        let tableRow = `<tr><td>${index+1}</td><td>${feature['attributes']['Name']}</td><td>${feature['attributes']['Town']}</td></tr>`;
        latestDataTable.innerHTML += tableRow;
    });
};
function _initCardValues(data: number[]):void {
    const clothesCard: HTMLElement = document.getElementById('cardClothesValue');
    const toysCard: HTMLElement = document.getElementById('cardToysValue');
    const booksCard: HTMLElement = document.getElementById('cardBooksValue');
    const furnitureCard: HTMLElement = document.getElementById('cardFurnitureValue');
    const foodCard: HTMLElement = document.getElementById('cardFoodValue');
    const phonesCard: HTMLElement = document.getElementById('cardPhonesValue');
    const otherCard: HTMLElement = document.getElementById('cardOtherValue');

    const cardElements = [
        clothesCard, toysCard, booksCard, furnitureCard,
        foodCard, phonesCard, otherCard
    ];
    cardElements.map((card, index) => card.innerHTML = data[index].toString());
};
