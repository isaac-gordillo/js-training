const API_BASE_URL = 'http://localhost:3001'
const POKEMONS_URL = 'pokemons';
const COUNTRIES_URL = 'countries';

async function main() {
    const pokemons = await fetch(`${API_BASE_URL}/${POKEMONS_URL}`).then(res => res.json());
    const pokemonTable = createTable(pokemons);

    const countries = await fetch(`${API_BASE_URL}/${COUNTRIES_URL}`).then(res => res.json());
    const countryTable = createTable(countries);
    document.getElementById('pokemon-table').innerHTML = pokemonTable + countryTable;
}

function createPokemonTable(pokemons) {
    let table = `<table><tr><th>Name</th><th>Type</th><th>Image</th></tr>`;
    pokemons.forEach(pokemon => {
        table += `<tr><td>${pokemon.name}</td><td>${pokemon.type}</td><td class="pokemon-image"><img src="${pokemon.image}"/></td></tr>`;
    });
    table += '</table>';
    
    return table;
}

function createTable(items){
    const columns = Object.keys(items[0]);
    let table = `<table>`;
    table += createTableHeaders(columns);

    table += createTableRows(items, columns);

    return table;
}

function createTableHeaders(columns){
    let headers = `<tr>`;
    columns.forEach(column => {
        headers += `<th>${column}</th>`;
    });
    headers += '</tr>';

    return headers;
}

function createTableRows(items, columns) {
    let rows = '';
    items.forEach(item => {
        rows += '<tr>';
        columns.forEach(column => {
            if (column === 'image') {
                rows += `<td style="text-align:center"><img src="${item[column]}"></td>`;
            } else {
                rows += `<td>${item[column]}</td>`;
            }
        });
        rows += '</tr>';
    });
    rows += '</table>';
    return rows;
}


main();