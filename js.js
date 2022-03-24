var list_names = [];

async function name_pokemon_onchange(event){
    let input_name_pokemon = document.getElementById('name_pokemon');
    let image = document.createElement('img');
    let div_image = document.getElementsByClassName('div_image')[0];
    let lbl_name = document.getElementById('lbl_name');
    let lbl_height = document.getElementById('lbl_height');
    let lbl_weight = document.getElementById('lbl_weight');
    

    const url = 'https://pokeapi.co/api/v2/pokemon/' + input_name_pokemon.value;
    let response = await fetch(url);

    
    
    if(response.ok){
        let result = await response.json();
        image.src = result.sprites.front_default;
        lbl_name.textContent = result.name;
        div_image.appendChild(image);
        lbl_height.textContent = 'Altura: ' + result.height;
        lbl_weight.textContent = 'Peso: ' + result.weight
    }
    else{
        div_image.innerHTML = ''
        lbl_name.textContent  = '';
        lbl_height.textContent = '';
        lbl_weight.textContent = '';
    }
    
}

const name_pokemon_onkeyup = (event) =>{
    let input_name_pokemon = document.getElementById('name_pokemon');
    let datalist_names = document.getElementById('datalist_names');
    let name = name_pokemon.value;

    if(!name){
        input_name_pokemon.innerHTML = '';
        return;
    }        

    filter_result = list_names.filter(e => e.toLowerCase().includes(name.toLowerCase()) );    
    
    filter_result.forEach(element => {
        let option = document.createElement('option');
        option.value = element;        
        datalist_names.append(option);
    });        
}

document.addEventListener("DOMContentLoaded", function() {
    fetchPokemosListNames();

    let name_pokemon = document.getElementById('name_pokemon');
    name_pokemon.onkeyup = name_pokemon_onkeyup;
    name_pokemon.onchange = name_pokemon_onchange;
});


async function fetchPokemosListNames (){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1126';
    let response = await fetch(url);
    let result = await response.json();

    list_names = result.results.map((x) => { return x.name; });
}