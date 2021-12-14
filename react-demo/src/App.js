// import './App.css'

import HomeContainers from "./containers/HomeContainers";

import React, {useState} from 'react';

function App(props) {

    const [user, setLoginUser] = useState({})

    return (
        <div className="App">

            <HomeContainers/>
        </div>
    );
}

export default App;
