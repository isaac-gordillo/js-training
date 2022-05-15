const API_BASE_URL = 'http://localhost:3001'
const POKEMONS_URL = 'pokemons';
const COUNTRIES_URL = 'countries';

let pokemons = [];
let countries = [];
async function main() {
    pokemons = await fetch(`${API_BASE_URL}/${POKEMONS_URL}`).then(res => res.json());
    countries = await fetch(`${API_BASE_URL}/${COUNTRIES_URL}`).then(res => res.json());

    render();
}

function render() {
    const itemList = [pokemons, countries];
    const tables = itemList.map(items => createTable(items));
    document.getElementById('content').innerHTML = tables.join('');
}

function createPokemonTable(pokemons) {
    let table = `<table><tr><th>Name</th><th>Type</th><th>Image</th></tr>`;
    pokemons.forEach(pokemon => {
        table += `<tr><td>${pokemon.name}</td><td>${pokemon.type}</td><td class="pokemon-image"><img src="${pokemon.image}"/></td></tr>`;
    });
    table += '</table>';

    return table;
}

function createTable(items) {
    console.log(items);
    if(items.length === 0) {
        console.error(`No items to render`);
        return;
    }

    const columns = Object.keys(items[0]);
    let table = `<table>`;
    table += createTableHeaders(columns);

    table += createTableRows(items, columns);

    return table;
}

function createTableHeaders(columns) {
    let headers = `<tr>`;
    columns.forEach(column => {
        headers += `<th>${column}</th>`;
    });
    headers += `<th>Actions</th>`;
    headers += '</tr>';

    return headers;
}

function createTableRows(items, columns) {
    let rows = '';
    items.forEach((item, index) => {
        rows += '<tr>';
        columns.forEach(column => {
            if (column === 'image') {
                rows += `<td style="text-align:center"><img src="${item[column]}"></td>`;
            } else {
                rows += `<td style="max-width: 200px">${item[column]}</td>`;
            }
        });
        rows += `
            <td>
                <button onclick="deleteItem('${item.id}')">
                    <i style="font-size:3em" class="material-icons mdc-button__icon" aria-hidden="true">delete</i>
                </button>
            </td>`;
        rows += '</tr>';
    });

    rows += '</table>';
    return rows;
}

function deleteItem(id) {
    alert('Deleting item with id: ' + id);
    const index = pokemons.findIndex(pokemon => pokemon.id == id);

    pokemons.splice(index, 1);

    console.log(index, pokemons);

    render();
}

main();