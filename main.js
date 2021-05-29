/// <reference path="jquery-3.6.0.js"/>
"use strict";

$("#name-button").click(displatCountryWithName)
$("#all-button").click(displatAllCountry)



async function displatAllCountry() {
    try {
        const country = await getJSON("https://restcountries.eu/rest/v2/all")
        addDataToTable(country)
    } catch (err) {
        alert(err.status);

    }

}

async function displatCountryWithName() {
    try {
        if (validation() === -1) return;
        const name = $("input").val()
        const url = `https://restcountries.eu/rest/v2/name/${name}`
        const country = await getJSON(url)
        addDataToTable(country)

    } catch (err) {
        if (err.status === 404)
            alert("this country not found")

    }

}




function addDataToTable(countrys) {
    $("tbody").empty()
    for (const country of countrys) {
        const tr = `
            <tr>
                <td>${country.name}</td>
                <td>${country.topLevelDomain[0]}</td>
                <td>${country.capital}</td>
                <td>${fixCurrencies(country.currencies)}</td>
                <td>${country.borders}</td>
                <td> <img src="${country.flag}"/></td>
            </tr>
        `;
        $("tbody").append(tr);
    }
}


function fixCurrencies(currencies) {
    let currency = `${currencies[0].code}`;
    for (let i = 1; i < currencies.length; i++) {
        currency += `,${currencies[i].code}`
    }
    return currency


}


function validation() {
    const name = $("#name").val()
    if (name === "") {
        alert("please enter country name")
        return -1
    }


    if (!isNaN(name)) {
        alert("please enter string")
        return -1
    }



}