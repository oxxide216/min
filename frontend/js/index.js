const login_form = document.querySelector('.login-form');
const reg_form = document.querySelector('.reg-form');

const login_buttons = document.getElementsByClassName('log-reg-log');
const reg_buttons = document.getElementsByClassName('log-reg-reg');

for (let i = 0; i < login_buttons.length; i++) {
  login_buttons[i].onclick = () => {
    login_form.style.display = 'block';
    reg_form.style.display = 'none';

    document.querySelector('.login-username').value = '';
    document.querySelector('.login-password').value = '';

    document.querySelector('.login-username').focus();
  }
}

for (let i = 0; i < reg_buttons.length; i++) {
  reg_buttons[i].onclick = () => {
    login_form.style.display = 'none';
    reg_form.style.display = 'block';

    document.querySelector('.reg-username').value = '';
    document.querySelector('.reg-password').value = '';
    document.querySelector('.reg-password-confirm').value = '';

    document.querySelector('.reg-username').focus();
  }
}

reg_form.style.display = 'none';
document.querySelector('.login-username').focus();
