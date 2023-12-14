function checkFilled(id) {
    let element = document.getElementById(id);
    let message = document.getElementById(`message-${id}`);
    if(element.value.length === 0) {
        message.innerHTML = 'This field is required';
        return false;
    } 
    message.innerHTML = '';
    return true;
}


function checkEmail() {
    let email = document.getElementById("email").value;
    if(checkFilled('email')) {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(validRegex.test(email)) {
            return true;
        }
        let message = document.getElementById(`message-email`);
        message.innerHTML = `Please enter a valid email (e.x: ${document.getElementById(`firstName`).value}@mail.com)`;
        return false;
    }
    return false;
}

function checkBirth() {
    let birth = new Date(document.getElementById('birth').value);
    // let birthDay = birth.getDay();
    // let birthMonth = birth.getMonth();
    // let birthYear = birth.getFullYear();
    let currentDate = new Date();
    let eighteenYearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));
    if (birth >= new Date()) {
        document.getElementById('message-birth').innerHTML = 'Please enter a valid birth date';
        return false;
    } else if ( birth > eighteenYearAgo ) {
        document.getElementById('message-birth').innerHTML = 'You must older than 18 to use this page';
        return false;
    } else  
    document.getElementById('message-birth').innerHTML = "";
    return true;
}

function checkUsername() {
    let username = document.getElementById(`username`);
    let message = document.getElementById(`message-username`);
    let usernameRegex = /^(?!.*\s).{6,}$/;
    if(usernameRegex.test(username.value)) {
        message.innerHTML = "";
        return true;
    } 
    message.innerHTML = "This field is required and not allow space";
    return false;
}

function checkPassword() {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    let password = document.getElementById('password');
    let message = document.getElementById("message-password");
    if(passwordRegex.test(password.value)) {
        message.innerHTML = "";
        return true;
    }
    message.innerHTML = "Your password is not met requirements";
    return false;
}

function checkConfirmPassword() {
    let password = document.getElementById('password');
    let paswordConfirm = document.getElementById("re-password");
    let message = document.getElementById("message-re-password");
    if(paswordConfirm.value != password.value) {
        message.innerHTML = "Your password is not match"
        return false;
    }
    else message.innerHTML = "";
    return true;
}


// function validForm() {
//     let isValid = (checkFilled("firstName") && checkFilled("lastName")
//                     && checkFilled("phone") && checkEmail() && checkBirth() 
//                     && checkUsername() && checkPassword() 
//                     && checkConfirmPassword);
//     if(isValid) {
//         document.getElementById("form").innerHTML = "Successfully registered!!";
//     }
//     return isValid;
// }

function validForm() {
    let isFirstNameValid = checkFilled("firstName");
    let isLastNameValid = checkFilled("lastName");
    let isPhoneValid = checkFilled("phone");
    let isEmailValid = checkEmail();
    let isBirthValid = checkBirth();
    let isUsernameValid = checkUsername();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();
    let isValid = (
      isFirstNameValid &&
      isLastNameValid &&
      isPhoneValid &&
      isEmailValid &&
      isBirthValid &&
      isUsernameValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    );

    let gender;
    let genderList = document.getElementsByName("gender");
    for(let i = 0; i < genderList.length; i++) {
        if(genderList[i].checked){
            gender = genderList[i].value;
            break;
        }
    }
    if(isValid) {
        let userList;
        if(localStorage.getItem("userList") !== null){
            userList = JSON.parse(localStorage.getItem("userList"));
        } else userList = [];
        let user = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            birth: document.getElementById("birth").value,
            gender: gender,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            cart: []
        };
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].username === user.username) {
                document.getElementById("message-username").innerHTML = "This user name is already exist"
                return false;
            }
        }
        userList.push(user);
        localStorage.setItem("userList", JSON.stringify(userList));
        document.getElementById("form").innerHTML = 
        "<h1>Successfully registered!!!</h1>" + 
        "<button type='button'> <a href='./login.html'>Go to login</a> </button>";
    }
    return isValid;
}