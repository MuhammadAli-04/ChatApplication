import './mainPage.css';

let menuState = false;
let chatMenuState = false;

function handleMenuButton() {
    const menu = document.getElementsByClassName('menu')[0];
    if (menuState) {
        menu.children[0].classList.remove('rotate-left');
        menu.children[1].classList.remove('visibility');
        menu.children[2].classList.remove('rotate-right');
    } else {
        menu.children[0].classList.add('rotate-left');
        menu.children[1].classList.add('visibility');
        menu.children[2].classList.add('rotate-right');
    }
    menuState = !menuState;
}

function handleChatMenuButton() {
    const menu = document.getElementsByClassName('menu')[1];
    if (chatMenuState) {
        menu.children[0].classList.remove('rotate-left');
        menu.children[1].classList.remove('visibility');
        menu.children[2].classList.remove('rotate-right');
    } else {
        menu.children[0].classList.add('rotate-left');
        menu.children[1].classList.add('visibility');
        menu.children[2].classList.add('rotate-right');
    }
    chatMenuState = !chatMenuState;
}

function MainPage() {
    return <div className="main-div flex-column">
        <nav className="navbar">
            <div className="brand-name">
                <h2 className="no-space">Chat Application</h2>
            </div>
            <div onClick={handleMenuButton} className="menu">
                <div className="menubar"></div>
                <div className="menubar"></div>
                <div className="menubar"></div>
            </div>
        </nav>
        <div className="index-box flex-row">
            <div className="users-section">
                <div className="search-box">
                    <input
                        type="search"
                        name="searchInput"
                        id="searchInput"
                        className="search-input"
                        placeholder="Search"
                    />
                </div>
                <div className="user-box flex-row">
                    <div className="user-img"></div>
                    <div className="space-x"></div>
                    <div className="flex-column">
                        <div className="user-name">Muhammad Ali</div>
                        <div className="space-y"></div>
                        <div className="last-msg">Hello, how are you?</div>
                    </div>
                </div>
            </div>
            <div className="chat-box flex-column">
                <div className="conversation-header flex-row">
                    <div className="user-info flex-row flex-center">
                        <div className="user-img"></div>
                        <div className="space-x"></div>
                        <div className="user-name">Muhammad Ali</div>
                    </div>
                    <div onClick={handleChatMenuButton} className="menu">
                        <div className="menubar"></div>
                        <div className="menubar"></div>
                        <div className="menubar"></div>
                    </div>
                </div>
                <div className="conversation-box flex-column">
                    <div className="msg other-msg">
                        <p className="no-space">hello</p>
                    </div>
                    <div className="msg own-msg">
                        <p className="no-space">hi</p>
                    </div>
                </div>
                <div className="conversation-footer flex-row flex-center">
                    <div className="icons attachment-box"></div>
                    <div className="space-x"></div>
                    <div className="icons emojis-box"></div>
                    <div className="space-x"></div>
                    <div className="message-box">
                        <textarea
                            type="text"
                            className="message-input"
                            name="messageInput"
                            id="messageInput"
                            placeholder="Type a message..."
                            rows="1"
                        ></textarea>
                    </div>
                    <div className="space-x"></div>
                    <div className="icons microphone-box"></div>
                </div>
            </div>
        </div>
    </div>
};


export default MainPage;