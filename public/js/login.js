
const passwordInput = document.getElementById('inputPassword')
const toggleButton = document.getElementById('togglePassword')

const togglePassword = (e) => {
    e.preventDefault();
    if(passwordInput.type==='password'){
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show password';
    }
}

const login = async (e) => {
    e.preventDefault();
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
  
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          console.log(username, password);
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
          alert('Your username or password was incorrect. Try again!');
      }
    } else {
        alert('You must enter both a username and password to log in.')
    }
  };

toggleButton.addEventListener('click', togglePassword);
document.getElementById('login-btn').addEventListener('click', login);