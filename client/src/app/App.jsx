import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Main from '../pages/Main'
import Emails from '../pages/Emails'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/main'>
					<Main />
				</Route>
				<Route path='/maillist'>
					<Emails />
				</Route>
				<Redirect to='/main' />
			</Switch>
		</BrowserRouter>
	)
}

export default App
