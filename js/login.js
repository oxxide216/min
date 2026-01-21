const login_username = document.querySelector('.login-username');
const login_password = document.querySelector('.login-password');

const login_button = document.querySelector('.login-button');

login_username.onkeydown = (event) => {
  if (event.key == 'Enter') {
    login_password.focus();
    event.preventDefault();
  }
};

login_password.onkeydown = (event) => {
  if (event.key == 'Enter') {
    login();
    event.preventDefault();
  }
};

login_button.onclick = (event) => {
  login();
  event.preventDefault();
};

function login() {

}
