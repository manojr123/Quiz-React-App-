import React from 'react'
import logo from './logo.svg'
import './App.css'
import Quiz from './Quiz'
import questions from './questions'


function App() {
    	return (
            <div>
                <Quiz questions={questions}/>
            </div>           
	    )

}

export default App















/*
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.jsx</code> and save to reload!
				</p>
				<span className="App-link">Hello from codedamn :)</span>
			</header>
		</div>

*/