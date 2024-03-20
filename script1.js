function showMessage(input, message, type){
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    input.className = type ? "success" : "error";

    if (!type) {
        msg.style.color = "red"; 
        input.style.border = "solid 2px red";
    } else {
        msg.style.color = ""; 
        input.style.border = "solid 2px green";
    }
    return type;
}
function showError(input, message) {
    return showMessage(input, message, false);
}
function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
    return showError(input, message);
    }
    return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
    if (!hasValue(input, requiredMsg)) {
    return false;
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}

function validatePassword(input, requiredMsg, invalidMsg) {
    
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    const password = input.value.trim();
    if (!passwordRegex.test(password)) {
        return showError(input, invalidMsg);
    }
    return showSuccess(input);
}

function validateConfirmedPassword(input,requiredMsg){
    if(!hasValue(input, requiredMsg)){
        return false;
    }
    else{
        return true;
    }
} 

function validatePostal(input, requiredMsg, invalidMsg) {
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$|(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const postal = input.value.trim();
    
    if (!postalRegex.test(postal)) {
      return showError(input, invalidMsg);
    }
    return true;
}

function validateCity(input, message) {
    if (input.value.trim() === "select") {
        return showError(input, message)
    }
    else{
        return showSuccess(input);}
}
const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a good email format";
const PASSWORD_REQUIRED = "Please enter your password";
const PASSWORD_INVALID = "Your password must contain at least 6 characters, at least one digit, and one special character";
const CONFIRM_REQUIRED = "Please confirm your password";
const CONFIRM_MISMATCH = "Passwords do not match";
const POSTALCODE_REQUIRED = "Please enter a postal code";
const POSTALCODE_INVALID = "Please enter a good postal code format";
const CITY_REQUIRED = "Please select a city";


document.querySelector("#signup").addEventListener("submit", function (event) {
    event.preventDefault();

    let form = event.target;
    let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    let passwordValid = validatePassword(form.elements["PasswordInput"], PASSWORD_REQUIRED, PASSWORD_INVALID);
    let confirmValid = validateConfirmedPassword(form.elements["RetypePasswordInput"], CONFIRM_REQUIRED,CONFIRM_MISMATCH); 
    let postalValid = validatePostal(form.elements["postal"],POSTALCODE_REQUIRED,POSTALCODE_INVALID);
    let cityValid = validateCity(form.elements["city"], CITY_REQUIRED);

    if (form.elements["PasswordInput"].value !== form.elements["RetypePasswordInput"].value) {
        confirmValid = showError(form.elements["RetypePasswordInput"], CONFIRM_MISMATCH);
    }

    if (nameValid  && emailValid && passwordValid && confirmValid && postalValid && cityValid) {
        const Name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const password = form.elements["PasswordInput"].value;
        const postal = form.elements["postal"].value;
        const city = form.elements["city"].value;
        const text = `
            Name:${Name}
            Email:${email}
            Password:${password}
            City:${city}
            Postal Code:${postal}
        `;
        if(confirm(text)){
            const blob = new Blob([text], {type: "text/plain"});
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "user_data.txt";
            document.body.appendChild(a);
            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        else{
            return false;
        }
    }
});

/*Password Visibility */
const passwordInput = document.getElementById('PasswordInput');
const toggleVisibility = document.getElementById('ToggleVisibility');
const RetypePasswordInput = document.getElementById('RetypePasswordInput');
const toggleVisibility2 = document.getElementById('ToggleVisibility2');

toggleVisibility.addEventListener('change', function(){
    if(toggleVisibility.checked){
        passwordInput.type = 'text';
    }
    else{
        passwordInput.type = 'password';   
    }
});

toggleVisibility2.addEventListener('change', function(){
    if(toggleVisibility2.checked){
        RetypePasswordInput.type = 'text';
    }
    else{
        RetypePasswordInput.type = 'password';   
    }
});

/*Remove City*/ 
    var selectCity = document.getElementById('city');
    var options = selectCity.options;
    var optionToRemove = 'New York City';

    var button = document.getElementById('remove')
    button.addEventListener('click',hideshow,false);

function hide() 
    {
        document.getElementById('remove').style.display = 'block'; 
        document.getElementById('remove').style.display = 'none';
    }

function remove() {
    
    for (var i = 0; i < options.length; i++){
        if(options[i].text === optionToRemove){
            selectCity.remove(i);
            break;
        }
    } 
}

function addOption(){ 
    var option = document.createElement('option');
    option.value = 'QuebecCity';
    option.text = 'Quebec City';
    selectCity.appendChild(option);
}

function removecity()
{ 
    remove();
    hide();
    addOption();
}
