import './splashScreen.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function displaySnackBar(message, status) {
    console.log(message, status);
    let snackbar = document.getElementsByClassName("snackbar")[0];
    if (status >= 200 && status < 300) {
        console.log(snackbar);
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

let time = 3000;

function SplashScreen() {
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            fetch(
                "http://127.0.0.1:2000/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            ).then((response) => {
                // response.text().then(text => displaySnackBar(text, response.status))
                if (response.status === 200) {
                    navigate('/main');
                } else {
                    navigate('/auth');
                }
                setLoading(!loading);
            }).catch((error) => {
                setLoading(!setLoading);
                console.log(error);
                displaySnackBar(error.message, 500);
            })
        }, time);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <div className="snackbar flex-center flex-column visibility">
            <p>Message</p>
        </div>
        <div className='splash-screen flex-center flex-column'>
            <div className='logo'>
                <h1>Chat Application</h1>
            </div>
            {loading ? <div className="loader"></div> : <></>}
        </div>
    </>
};

export default SplashScreen;