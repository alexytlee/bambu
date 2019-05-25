import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import People from './Components/People';
import Peoples from './Components/Peoples';

class Routes extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={Peoples} exact={true} />
					<Route path="/People/:id" component={People} exact={true} />
				</Switch>
			</Router>
		);
	}
}

export default Routes;
