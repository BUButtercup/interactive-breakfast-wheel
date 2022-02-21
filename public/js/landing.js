const bfBtn = document.getElementById('get-bf');
const bfBox = document.getElementById('what-having');
const boxes = document.querySelectorAll('.reset');

const resetBoxes = () =>{
    boxes.forEach(box=> box.textContent = '');
}


// const getBreakfast = e => {
//     e.preventDefault();
//     const choices = ['Pancakes', 'Waffles', 'Veggie Scramble', 'Egg Sandwich', 'Scrambled Eggs w/ Bacon', 'Potato Scramble', 'Omlets', 'Swedish Pancakes', 'Oatmeal', 'Cereal', 'Puffy Pancake']
//     const i = Math.floor(Math.random() * choices.length);
//     bfBox.textContent = choices[i]
// }

const getBreakfast = async e => {
    e.preventDefault();
    const titleBox = document.getElementById('title');
    const servingsBox = document.getElementById('servings');
    const authorBox = document.getElementById('author');
    const ingredientBox = document.getElementById('ingredients');
    const instructionsBox = document.getElementById('instructions');
    resetBoxes();


    const response = await fetch(`/recipe`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log(`-----------------response OK!---------------`)
    const newData = await response.json();
    console.log(newData)
    const dataIDs = [];
    newData.forEach(datum=> {dataIDs.push(datum.id);})
    console.log(`Data IDs: ${dataIDs}`);

    const i = Math.floor(Math.random() * dataIDs.length);
    const j = dataIDs[i];

    const res = await fetch(`/recipe/${j}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (res.ok) {
            const recipe = await res.json();

            titleBox.textContent = recipe.title;
            servingsBox.textContent = recipe.servings;
            if(recipe.author){
                authorBox.textContent = recipe.author;
            } else {authorBox.textContent = '';}

            const ingredients = recipe.ingredients.split(';');
            ingredients.forEach(ingredient=> {
                const newLI = document.createElement('li');
                newLI.textContent = ingredient;
                ingredientBox.appendChild(newLI);
            })

            const instructions = recipe.instructions.split(';');
            instructions.forEach(instruction=> {
                const newLI = document.createElement('li');
                newLI.textContent = instruction;
                instructionsBox.appendChild(newLI);
            })

            
        // document.location.replace(`/`);
        } else {
        alert(response.statusText);
        }
    } else {
    alert('Something went wrong!');
    }
}


bfBtn.addEventListener('click', getBreakfast);