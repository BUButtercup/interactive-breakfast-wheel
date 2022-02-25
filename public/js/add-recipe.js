
//form inputs
const title = document.getElementById('recipe-title');
const author = document.getElementById('recipe-author');
const servings = document.getElementById('recipe-servings');
const allergenChecks = document.querySelectorAll('input[type=checkbox]');
const ingredientBox = document.getElementById('ingredients');
const instructionBox = document.getElementById('instructions');

//form buttons
const nextIngBtn = document.getElementById('next-ing');
const nextInstBtn = document.getElementById('next-inst');
const prevIngBtn = document.getElementById('prev-ing');
const prevInstBtn = document.getElementById('prev-inst');
const saveBtn = document.getElementById('save-recipe');
const resetForm = document.getElementById('reset-form')

//preview displays
const titleDisplay = document.getElementById('new-title');
const authorDisplay = document.getElementById('new-author');
const servingDisplay = document.getElementById('new-servings');
const allergenDisplay = document.getElementById('new-allergen');
const ingredientDisplay = document.getElementById('new-ingredients');
const instructionDisplay = document.getElementById('new-instructions');

const ingEditBox = document.getElementById('hidden-ing-box');
const ingEditInpt = document.getElementById('ing-edit');
const ingValueBox = document.getElementById('ing-value');
const ingEditBtn = document.getElementById('edit-ing');
const instEditBox = document.getElementById('hidden-inst-box');
const instEditInpt = document.getElementById('inst-edit');
const instValueBox = document.getElementById('inst-value');
const instEditBtn = document.getElementById('edit-inst');

//display placeholders
const authorPH = document.getElementById('author-placeholder');
const servingPH = document.getElementById('servings-placeholder');
const allergenPH = document.getElementById('allergen-placeholder');
const ingredientPH = document.getElementById('ingredients-placeholder');
const instructionPH = document.getElementById('instructions-placeholder');

title.addEventListener('change', e =>{
    e.preventDefault();
    titleDisplay.textContent = '';
    titleDisplay.textContent = title.value;
    // title.value = '';
})
author.addEventListener('change', e =>{
    e.preventDefault();
    authorPH.setAttribute('style', 'display:none')
    authorDisplay.setAttribute('style', 'display:inline')
    authorDisplay.textContent = '';
    authorDisplay.textContent = author.value;
    // author.value = '';
})
servings.addEventListener('change', e =>{
    e.preventDefault();
    servingPH.setAttribute('style', 'display:none')
    servingDisplay.setAttribute('style', 'display:inline')
    servingDisplay.textContent = '';
    servingDisplay.textContent = servings.value;
    // serving.value = '';
})

allergenChecks.forEach(check=>{
    check.addEventListener('click', e=>{
        
        allergenPH.setAttribute('style', 'display: none;');
        if(e.target.checked){
            const newLI = document.createElement('li');
            newLI.setAttribute('data-value', `${check.value}`)
            newLI.classList.add('allergen-LI')
            newLI.textContent = check.value;
            allergenDisplay.appendChild(newLI);
            allergenDisplay.setAttribute('style', 'display: inline')
        } else {
            const allergenLIs = document.querySelectorAll('.allergen-LI');
            allergenLIs.forEach(li=>{
                if(li.dataset.value===e.target.value){
                    allergenDisplay.removeChild(li);
                }
            })
        }
    })
})

//ingredient list
let i = 1;

nextIngBtn.addEventListener('click', e=>{
    e.preventDefault();
    if(!ingredientBox.value){
        console.log(i)
        return
    } else {
        ingredientPH.setAttribute('style', 'display: none;');
        const newLI = document.createElement('li');
        newLI.setAttribute('data-value', `${i}`)
        newLI.classList.add('ingredient-LI')
        newLI.textContent = ingredientBox.value;
        newLI.addEventListener('click', e=>{
            e.preventDefault();
            ingEditInpt.value = e.target.textContent;
            ingEditBox.setAttribute('style', 'display: flex;');
            ingValueBox.innerHTML = e.target.dataset.value;
            console.log('data value', e.target.dataset.value)
        })
        ingredientBox.value = '';
        ingredientDisplay.appendChild(newLI);
        ingredientDisplay.setAttribute('style', 'display: inline')
        i++;
        console.log('i', i)
        return i;
    }
})

ingEditBtn.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('.ingredient-LI').forEach(li=>{
        if(li.dataset.value===ingValueBox.innerHTML){
            li.textContent = ingEditInpt.value;
        }
    })
    ingValueBox.innerHTML = '';
    ingEditInpt.value = '';
    ingEditBox.setAttribute('style', 'display: none;');
})

//instruction list
let j = 1;

nextInstBtn.addEventListener('click', e=>{
    e.preventDefault();
    if(!instructionBox.value){
        console.log(j)
        return
    } else {
        instructionPH.setAttribute('style', 'display: none;');
        const newLI = document.createElement('li');
        newLI.setAttribute('data-value', `${j}`)
        newLI.classList.add('instruction-LI')
        newLI.textContent = instructionBox.value;
        newLI.addEventListener('click', e=>{
            e.preventDefault();
            instEditInpt.value = e.target.textContent;
            instEditBox.setAttribute('style', 'display: flex;');
            instValueBox.innerHTML = e.target.dataset.value;
            console.log('data value', e.target.dataset.value)
        })
        instructionBox.value = '';
        instructionDisplay.appendChild(newLI);
        instructionDisplay.setAttribute('style', 'display: inline')
        j++;
        console.log('j', j)
        return j;
    }
})

instEditBtn.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('.instruction-LI').forEach(li=>{
        if(li.dataset.value===instValueBox.innerHTML){
            li.textContent = instEditInpt.value;
        }
    })
    instValueBox.innerHTML = '';
    instEditInpt.value = '';
    instEditBox.setAttribute('style', 'display: none;');
})

resetForm.addEventListener('click', e=>{
    document.getElementById('create-recipe').reset();
    titleDisplay.textContent = 'My Recipe';
    authorDisplay.textContent = '';
    authorDisplay.setAttribute('style', 'display:none');
    authorPH.setAttribute('style', 'display:inline');
    servingDisplay.textContent = '';
    servingDisplay.setAttribute('style', 'display:none');
    servingPH.setAttribute('style', 'display:inline');
    allergenDisplay.textContent = '';
    allergenDisplay.setAttribute('style', 'display:none');
    allergenPH.setAttribute('style', 'display:inline');
    ingredientDisplay.textContent = '';
    ingredientDisplay.setAttribute('style', 'display:none');
    ingredientPH.setAttribute('style', 'display:inline');
    instructionDisplay.textContent = '';
    instructionDisplay.setAttribute('style', 'display:none');
    instructionPH.setAttribute('style', 'display:inline');
})

saveBtn.addEventListener('click', e=>{
    e.preventDefault();
    const saveRecipe = async (obj) => {
        const response = await fetch(`/api/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
      });
        if (response.ok) {
            console.log(`response OK!`)
        // const newData = await response.json();
        // console.log(newData)
        // const res = await fetch(`/dashboard/gardens/${newData.id}`, {
        //     method: 'GET',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        // })
        //     if (res.ok) {
            document.location.replace(`/dashboard/`);
            } else {
            alert(response.statusText);
            }
        // } else {
        // alert('Something went wrong!');
        // }
    }
    const buildObj = () => {
        const allergenArr = [];
        document.querySelectorAll('.allergen-LI').forEach(li=>{
            allergenArr.push(li.textContent);
        })
        
        const ingredientArr = [];
        document.querySelectorAll('.ingredient-LI').forEach(li=>{
            ingredientArr.push(li.textContent);
        })

        const instructionArr = [];
        document.querySelectorAll('.instruction-LI').forEach(li=>{
            instructionArr.push(li.textContent);
        })

        const newRecipe = {
            title: titleDisplay.textContent,
            author: authorDisplay.textContent,
            servings: servingDisplay.textContent,
            ingredients: ingredientArr.join(';'),
            instructions: instructionArr.join(';'),
            allergens: allergenArr.join(';')
        }

        saveRecipe(newRecipe);
    }

        
    
    buildObj()
})