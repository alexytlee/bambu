import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import axios from 'axios';

class People extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			isLoading: false,
			data: []
		};
	}
	// after component mounts, fetch data
	componentDidMount() {
		this.setState({ isLoading: true });
		axios
			.get(`https://swapi.co/api/people/${this.state.id}`)
			.then(response => {
				this.setState({ data: response.data });
				this.setState({ isLoading: false });
			})
			.catch(function(error) {
				alert(`I felt a great disturbance in the Force... (${error})`);
				this.setState({ isLoading: false });
			});
	}

	render() {
		if (!this.state.isLoading) {
			return (
				<div>
					<h3>{this.state.data.name}</h3>
					<div>
						<ListGroup>
							<ListGroupItem>
								<b>Height: </b>
								{this.state.data.height}LBS
							</ListGroupItem>
							<ListGroupItem>
								<b>Mass: </b> {this.state.data.mass}KG
							</ListGroupItem>
							<ListGroupItem>
								<b>Eye Color: </b>
								{this.state.data.eye_color}
							</ListGroupItem>
							<ListGroupItem>
								<b>Hair Color: </b>
								{this.state.data.hair_color}
							</ListGroupItem>
							<ListGroupItem>
								<b>Birth Year: </b>
								{this.state.data.birth_year}
							</ListGroupItem>
							<ListGroupItem>
								<b>Gender:</b> {this.state.data.gender}
							</ListGroupItem>
							<ListGroupItem>
								{' '}
								<b>Skin Color: </b>
								{this.state.data.skin_color}
							</ListGroupItem>
							<ListGroupItem>
								<b>Created: </b>
								{this.state.data.created}
							</ListGroupItem>
							<ListGroupItem>
								<b>Edited: </b>
								{this.state.data.edited}
							</ListGroupItem>
						</ListGroup>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<h2>{this.state.data.name}</h2>
					<Spinner />
				</div>
			);
		}
	}
}

export default People;
