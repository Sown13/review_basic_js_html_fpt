function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let userList;
    if(localStorage.getItem('userList') !== null) {
        userList = JSON.parse(localStorage.getItem('userList'));
    } else {
        userList = [];
    }
    for(let i = 0; i < userList.length; i++) {
        if(username === userList[i].username && password === userList[i].password) {
            localStorage.setItem("currentUser", JSON.stringify(userList[i]));
            window.location.href = "./shop.html";
        }
    }
    document.getElementById('message-login').innerHTML = "Username or Password is wrong";
    return false;
}


function logout() {
    if(localStorage.getItem('currentUser') !==null){
        localStorage.removeItem('currentUser');
    }
}