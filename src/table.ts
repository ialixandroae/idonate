import * as _FeatureLayer from 'esri/layers/FeatureLayer';
import * as $ from '../dashboard/assets/js/core/jquery.min';
import {_getDataValues} from '../src/dashboard';

$(document).ready(function () {
    let layerData = _getDataValues('https://services6.arcgis.com/MLuUQwq7FiARivuF/arcgis/rest/services/DonationLocations/FeatureServer');
    layerData.then(data => {
        _initTable(data);
        let cities = _getCities(data);
        _initDropDownCity(cities);
        _filterCheckboxes(data);
        _filterSelectCity(data);
        _resetSelectCityFilter(data);
    });

});
function _initTable(data: object[]): void {
    const table: HTMLElement = document.getElementById('tableBodyAllFeatures');
    data.map((feature, index) => {
        let tableRow = `<tr>
                            <td>${index + 1}</td>
                            <td>${feature['attributes']['Name']}</td>
                            <td>${feature['attributes']['Town']}</td>
                            <td>${feature['attributes']['Clothes'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['Toys'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['Books'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['Furniture'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['Food'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['CellPhones'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['Other'] === 0 ? 'Yes' : 'No'}</td>
                            <td>${feature['attributes']['ContactNumber'] }</td>
                            <td>${feature['attributes']['Description']}</td>
                        </tr>`;
        table.innerHTML += tableRow;
    });
};
function _getCities(data: object[]): string[] {
    let cityList = [];
    data.map(feature => {
        if (cityList.indexOf(feature['attributes']['Town']) === -1) {
            cityList.push(feature['attributes']['Town']);
        }
    });
    // console.log(cityList);
    return cityList;
};
function _initDropDownCity(data: string[]): void {
    const dropDown: HTMLElement = document.getElementById('filtruCity');
    data.map(city => {
        let dropDownOption = `<a class="dropdown-item" id="dropDownCity" href="#">${city}</a>`;
        dropDown.innerHTML += dropDownOption;
    });
};
function _filterByType(type: string[], data: object[]): object[] {
    let returnData = []
    type.map(_type => {
        switch (_type) {
            case 'Clothes':
                let _returnDataClothes = data.filter(feature => {
                    return feature['attributes']['Clothes'] === 0;
                });
                returnData.push(..._returnDataClothes);
                break;
            case 'Toys':
                let _returnDataToys = data.filter(feature => {
                    return feature['attributes']['Toys'] === 0;
                });
                returnData.push(..._returnDataToys);
                break;
            case 'Books':
                let _returnDataBooks = data.filter(feature => {
                    return feature['attributes']['Books'] === 0;
                });
                returnData.push(..._returnDataBooks);
                break;
            case 'Furniture':
                let _returnDataBooksFurniture = data.filter(feature => {
                    return feature['attributes']['Furniture'] === 0;
                });
                returnData.push(..._returnDataBooksFurniture);
                break;
            case 'Food':
                let _returnDataBooksFood = data.filter(feature => {
                    return feature['attributes']['Food'] === 0;
                });
                returnData.push(..._returnDataBooksFood);
                break;
            case 'Phones':
                let _returnDataBooksPhones = data.filter(feature => {
                    return feature['attributes']['CellPhones'] === 0;
                });
                returnData.push(..._returnDataBooksPhones);
                break;
            case 'Other':
                let _returnDataBooksOther = data.filter(feature => {
                    return feature['attributes']['Other'] === 0;
                });
                returnData.push(..._returnDataBooksOther);
                break;
        }
    });
    return returnData;
};
function _filterCheckboxes(data: object[]):void {
    
    Array.from(document.querySelectorAll('.form-check-input'))
        .map(input => {
            // console.log(input['checked']);
            input.addEventListener('click', () => {
                let checkedTypes = [];
                Array.from(document.querySelectorAll('.form-check-input'))
                    .map(_input => {
                        if (_input['checked'] === true) {
                            checkedTypes.push(_input['value']); 
                        };
                    });
                document.getElementById('dropdownMenuButtonCity').innerHTML = 'Filter by city';
                // console.log(checkedTypes);
                if(checkedTypes.length > 0){
                    let filteredData = _filterByType(checkedTypes, data);
                    _resetTable('tableBodyAllFeatures');
                    _initTable(filteredData);
                } else {
                    _resetTable('tableBodyAllFeatures');
                    _initTable(data); 
                }
            }); 
        });
};
function _resetTable(tableId: string):void {
    document.getElementById(tableId).innerHTML = '';
};
function _filterSelectCity(data: object[]): void {
    const dropDown: HTMLCollection = document.getElementsByClassName('dropdown-item');
    Array.from(dropDown)
        .map(dropDown => {
            dropDown.addEventListener('click', () => {
                let city = dropDown.innerHTML;
                document.getElementById('dropdownMenuButtonCity').innerHTML = city;
                (<HTMLInputElement>document.getElementById("resetBtn")).disabled = false;
                _uncheckCheckboxes();
                let filteredData = data.filter(feature => {
                    return feature['attributes']['Town'] === city;
                });
                // console.log(filteredData);
                _resetTable('tableBodyAllFeatures');
                _initTable(filteredData);
            });
        });
};
function _resetSelectCityFilter(data: object[]): void {
    const resetBtn = <HTMLButtonElement> document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
        document.getElementById('dropdownMenuButtonCity').innerHTML = 'Filter by city';
        resetBtn.disabled = true
        _resetTable('tableBodyAllFeatures');
        _initTable(data);
    });
};
function _uncheckCheckboxes(): void {
    Array.from(document.querySelectorAll('.form-check-input'))
        .map(input => {
            if (input['checked'] === true) {
                input['checked'] = false;
            }
        });
};