const userRecipes = document.querySelectorAll('.recipe-li');

userRecipes.forEach(li=>{
    li.addEventListener('click', e=>{
        e.preventDefault();
        if(li.dataset.indexNumber){
            const res = await fetch(`/dashboard/${li.dataset.indexNumber}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            })
                if (res.ok) {
                document.location.replace(`/dashboard/${li.dataset.indexNumber}`);
                } else {
                alert(res.statusText);
                }
        } else{
            document.location.replace('/dashboard/new')
        }
    })
})