const reg_username = document.querySelector('.reg-username');
const reg_password = document.querySelector('.reg-password');
const reg_password_confirm = document.querySelector('.reg-password-confirm');

const reg_button = document.querySelector('.reg-button');

reg_username.onkeydown = (event) => {
  if (event.key == 'Enter') {
    reg_password.focus();
    event.preventDefault();
  }
};

reg_password.onkeydown = (event) => {
  if (event.key == 'Enter') {
    reg_password_confirm.focus();
    event.preventDefault();
  }
};

reg_password_confirm.onkeydown = (event) => {
  if (event.key == 'Enter') {
    register();
    event.preventDefault();
  }
};

reg_button.onclick = (event) => {
  register();
  event.preventDefault();
};

function register() {
  console.log(reg_username.value);
  console.log(reg_password, reg_password_confirm);
  console.log();
}
