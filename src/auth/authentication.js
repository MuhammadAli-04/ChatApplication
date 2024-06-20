import './authentication.css';

let wrapperState = false;

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{8,}$/;
    return passwordPattern.test(password);
    // return true;
}

function changeContent() {
    let parent = document.getElementsByClassName("wrapper")[0];
    let children = parent.children;
    if (wrapperState) {
        children[0].classList.remove("visibility");
        children[1].classList.add("visibility");
        parent.classList.remove("left-curve");
        parent.classList.add("left-move", "right-curve");
    } else {
        children[1].classList.remove("visibility");
        children[0].classList.add("visibility");
        parent.classList.remove("right-curve", "left-move");
        parent.classList.add("left-curve");
    }

    wrapperState = !wrapperState;
}

async function login() {
    let child = document.getElementsByClassName("login")[0];
    let email = child.children[1].value; // email
    let password = child.children[2].value; // password
    if (email && password) {
        if (!validateEmail(email)) {
            alert("invalid email");
            return;
        }

        const response = await fetch(
            "http://127.0.0.1:2000/user/authenticate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
                credentials: "include",
            }
        );
        // console.log(response);
        displaySnackBar(await response.text(), response.status);
        if (response.status >= 200 && response.status < 300) {
            document.getElementsByClassName("container")[0].innerHTML =
                "authenticated";
        }
    } else {
        alert(
            `email or password empty -> email: ${email} && password: ${password}`
        );
    }
}

async function register() {
    console.log("register");
    let child = document.getElementsByClassName("register")[0];
    let name = child.children[1].value; // name
    let email = child.children[2].value; // email
    let password = child.children[3].value; //password

    if (name && email && password) {
        if (!validateEmail(email)) {
            alert("invalid email");
            return;
        }

        if (!validatePassword(password)) {
            console.log(password);
            alert("invalid password");
            return;
        }

        const response = await fetch("http://127.0.0.1:2000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            credentials: "include",
        });
        // .then((response) => {
        //   return response.text();
        // })
        // .then((text) => {
        //   document.body.innerHTML = text;
        // });
        displaySnackBar(await response.text(), response.status);
        if (response.status >= 200 && response.status < 300) {
            document.getElementsByClassName("container")[0].innerHTML =
                "registered successfully";
        }
    } else {
        alert(
            `email or password empty -> email: ${email} && password: ${password}`
        );
    }
}

function displaySnackBar(message, status) {
    console.log(message, status);
    let snackbar = document.getElementsByClassName("snackbar")[0];
    if (status >= 200 && status < 300) {
        snackbar.classList.add("snackbar-success");
        snackbar.children[0].innerHTML = message;
        setTimeout(() => {
            snackbar.classList.add("visibility");
            snackbar.classList.remove("snackbar-success");
        }, 3000);
    } else {
        snackbar.classList.add("snackbar-danger");
        snackbar.children[0].innerHTML = message;
        setTimeout(() => {
            snackbar.classList.add("visibility");
            snackbar.classList.remove("snackbar-danger");
        }, 3000);
    }
    snackbar.classList.remove("visibility");
}


function AuthPage() {
    return <>
        <div className="snackbar flex-center flex-column visibility">
            <p>Message</p>
        </div>
        <div className="container">
            <div className="box wrapper right-curve flex-center flex-column left-move">
                <div className="wrapper-children flex-center flex-column">
                    <h2 className="no-space">no account?</h2>
                    <h5 className="no-space">No worries!</h5>
                    <p className="no-space">We got you</p>
                    <button
                        className="auth-button btn-light no-space"
                        onClick={changeContent}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="wrapper-children flex-center flex-column visibility">
                    <h2 className="no-space">Welcome</h2>
                    <h5 className="no-space">Happy to see you back!</h5>
                    <p>Login to your account</p>
                    <button
                        className="auth-button btn-light no-space"
                        onClick={changeContent}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="box left-curve login flex-center flex-column">
                <h2>Login</h2>
                <input
                    type="email"
                    name="emailInput"
                    placeholder="  Email"
                    className="input"
                    required
                />
                <input
                    type="password"
                    name="passwordInput"
                    placeholder="  Password"
                    className="input"
                    required
                />
                <button className="auth-button btn-dark" onClick={login}>Login</button>
            </div>
            <div className="box right-curve register flex-center flex-column">
                <h2>Register</h2>
                <input
                    type="text"
                    name="nameInput"
                    placeholder="  Name"
                    className="input"
                    required
                />
                <input
                    type="email"
                    name="emailInput"
                    placeholder="  Email"
                    className="input"
                    required
                />
                <input
                    type="password"
                    name="passwordInput"
                    placeholder="  Password"
                    minLength="8"
                    className="input"
                    required
                />
                <button className="auth-button btn-dark" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    </>
}


export default AuthPage;