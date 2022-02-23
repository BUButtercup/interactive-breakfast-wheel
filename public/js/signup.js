
const passwordInput = document.getElementById('inputNewPassword')
const passwordConfirm = document.getElementById('confirmNewPassword')

const toggleButton = document.getElementById('togglePassword')

const togglePassword = (e) => {
    e.preventDefault();
    if(passwordInput.type==='password'){
        passwordInput.type = 'text';
        passwordConfirm.type = 'text';
        toggleButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        passwordConfirm.type = 'password';
        toggleButton.textContent = 'Show password';
    }
}

const createUser = async (e) => {
    e.preventDefault();
    const username = document.getElementById('inputNewUsername').value.trim();
    const password = document.getElementById('inputNewPassword').value.trim();
    const confPassword = document.getElementById('confirmNewPassword').value.trim();
  
  
    if (username && password && confPassword) {
      // Send a POST request to the API endpoint
        if(password===confPassword){
            const response = await fetch('/api/user/', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
        
                if (response.ok) {
                    console.log(username, password);
                    // If successful, redirect the browser to the profile page
                    document.location.replace('/dashboard');
                } else {
                    alert('Uh oh! Something went wrong.');
                }
        } else {alert('Your passwords must match. Please check and try again.')}
    } else {
        alert('You must enter both a username and matching passwords.')
    }
  };

  passwordConfirm.addEventListener('blur', e=>{
    if (passwordConfirm.value!==passwordInput.value){
      document.getElementById('check-pw').setAttribute('style', 'visibility: visible')
    } else {
      document.getElementById('check-pw').setAttribute('style', 'visibility: hidden')
    }
  })

toggleButton.addEventListener('click', togglePassword);
document.getElementById('signup-btn').addEventListener('click', createUser);