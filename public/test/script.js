"use strict";

const baseUrl = "http://localhost:3000";

window.addEventListener("load", () => {
    /* First Page Login/Signup - Animation */
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container_log = document.getElementById('container_log');

    signUpButton.addEventListener('click', () => {
        container_log.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container_log.classList.remove("right-panel-active");
    });

    /* User account sign up/sign in */
    document.getElementById("signin-btn").addEventListener("click", () => {
        var phoneInput = document.querySelector("input[type='phone'].signin");
        var passwordInput = document.querySelector("input[type='password'].signin");
        
        if (validLogin(phoneInput, passwordInput)) {
            login(phoneInput.value, passwordInput.value);
        } else {
            setLoginErr("Invalid username or password");
        }
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
        var phoneInput = document.querySelector("input[type='phone'].signup");
        var passwordInput = document.querySelector("input[type='password'].signup");
        var repasswordInput = document.querySelector("input[type='repassword'].signup");
        var emailInput = document.querySelector("input[type='email'].signup");
        var usernameInput = document.querySelector("input[type='username'].signup");

        if (validCreateAccount(usernameInput, phoneInput, passwordInput, repasswordInput, emailInput)) {
            createAccount(usernameInput.value, phoneInput.value, passwordInput.value, emailInput.value);
        }
    });
    
    clearUser();
});

function clearUser() {
    localStorage.removeItem("username");
}

function setLoginErr(msg) {
    let errText = document.getElementById("invalid-login");
    if (msg == null) {
        errText.classList.add("hidden");
    } else {
        errText.textContent = msg;
        errText.classList.remove("hidden");
    }
    
}

function validLogin(phoneInput, passwordInput) {
    let error = false;
    if (!validatePhoneNum(phoneInput.value)) {
//        console.log("Invalid phone number");
        error = true;
        setErrorInput(phoneInput, true);
    } else {
        setErrorInput(phoneInput, false);
    }
    
    if (!validatePassword(passwordInput.value)) {
//        console.log("Invalid password format");
        error = true;
        setErrorInput(passwordInput, true);
    } else {
        setErrorInput(passwordInput, false);
    }
    return !error;
}

function validCreateAccount(usernameInput, phoneInput, passwordInput, repasswordInput, emailInput) {
    let error = false;
    if (!usernameInput.value) {
        error = true;
        setErrorInput(usernameInput, true);
    } else {
        setErrorInput(usernameInput, false);
    }
    
    if (!validatePhoneNum(phoneInput.value)) {
//        console.log("Invalid phone number");
        error = true;
        setErrorInput(phoneInput, true);
    } else {
        setErrorInput(phoneInput, false);
    }
    
    if (!validatePassword(passwordInput.value)) {
//        console.log("Invalid password format");
        error = true;
        setErrorInput(passwordInput, true);
    } else {
        setErrorInput(passwordInput, false);
    }
    
    if (!repasswordInput.value || passwordInput.value != repasswordInput.value) {
//        console.log("Passwords don't match");
        error = true;
        setErrorInput(repasswordInput, true);
    } else {
        setErrorInput(repasswordInput, false);
    }
    
    if (emailInput.value && !validateEmail(emailInput.value)) {
//        console.log("Invalid email");
        error = true;
        setErrorInput(emailInput, true);
    } else {
        setErrorInput(emailInput, false);
    }
    return !error;
}

async function createAccount(username, phone, password, email) {
    //TODO: 
    console.log("creating account: " + phone + password + email);
    let form = new FormData();
    form.append("username", username);
    form.append("phone_num", phone);
    form.append("password", password);
    form.append("email", email);
    
    fetchPost("/register", form, (resp) => {
        console.log(resp.json());

    });
}

async function login(phone, password) {
    console.log("logging in: " + phone + password);
    //TODO: 
//    fetchGet("/login?phone_num=" + phone + "&password=" + password, (data) => {
//        localStorage.setItem("username", data);
//        document.location.href = "./homepage.html";
//    }).catch(err => {
//        console.log("catch err " + err);
//        setLoginErr(err.message);
//        return false;
//    });
//    return true;
    
    fetch(baseUrl + "/login?phone_num=" + phone + "&password=" + password)
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        localStorage.setItem("username", data);
        document.location.href = "./homepage.html";
    })
    .catch(err => {
        setLoginErr("Incorrect account information");
    });
    return true;
}

function setErrorInput(elm, error) {
    if (error) {
        elm.style.border = "1px solid red";
    } else {
        elm.style.border = "none";
    }
}

function validatePhoneNum(num) {
    return num.match(/^0\d{8,9}$/g);
}

function validatePassword(password) {
//    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g);
    return password != "";
}
    
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function fetchGet(url, callBack) {
    fetch(baseUrl + url)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(callBack)
      .catch(handleErr);
}

function fetchPost(url, form, callBack) {
//    let params = new FormData(form);
    fetch(baseUrl + url, { method : "POST", body : form })
      .then(checkStatus)
      .then(resp => resp.text())
      .then(callBack)
      .catch(handleErr);
}

/**
  * Checking status of server from given response.
  * Throw error if server not ready.
  * @param {Promise} response - response from server status.
  * @return {Promise} Promise onject.
 */
function checkStatus(response) {
    if (!response.ok) { // response.status >= 200 && response.status < 300
//        console.log(response);
        throw Error("Error:" + response.status + " in request: " + response.statusText);
    }
    return response;
}

/**
  * Handle error from fetching.
  * @param {error} err - error from fetching data.
*/
function handleErr(err) {
    //showView('error');
    console.log(err);
}