import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "bootswatch/dist/lux/bootstrap.min.css";

import List from "./containers/List"

const App = () => {
    return(
        <main className="bg-dark">
            <div className="container">
                <List />
            </div>
        </main>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
