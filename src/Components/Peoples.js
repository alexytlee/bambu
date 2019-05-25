import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Table, Spinner } from 'reactstrap';
import axios from 'axios';

class Peoples extends Component {
	Style = {
		input: {
			width: '650px'
		},
		form: {
			display: 'flex',
			justifyContent: 'center'
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			input: '',
			isLoading: false,
			data: []
		};
	}

	// table creation
	getTable = () => {
		let table = [];

		this.state.data.forEach(people => {
			const LinkButton = withRouter(({ history }) => (
				<Button
					color="secondary"
					onClick={() => {
						history.push(`/people/${people.id}`);
					}}
				>
					See More about {people.name}
				</Button>
			));

			let row = [];
			row.push(<td key={people.id}>{people.id}</td>);
			row.push(<td key={people.name}>{people.name}</td>);
			row.push(<td key={people.gender}>{people.gender}</td>);
			row.push(
				<td key={people.id}>
					<LinkButton />
				</td>
			);
			table.push(<tr key={people.id}>{row}</tr>);
		});
		return (
			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Gender</th>
						<th />
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</Table>
		);
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});

		if (this.state.input.length >= 2) {
			this.setState({ isLoading: true });
			axios
				.get(`https://swapi.co/api/people?search=${this.state.input}`)
				.then(response => {
					this.setState({ data: response.data.results });
					this.state.data.forEach(e => {
						e.id = e.url.split('/')[5];
					});
					this.setState({ isLoading: false });
				})
				.catch(function(error) {
					this.setState({ data: [] });
					console.log(`The error is ${error}`);
					this.setState({ isLoading: false });
				});
		}
	};

	render() {
		if (!this.state.isLoading) {
			return (
				<div>
					<h2>People in the Star Wars Universe</h2>
					<br />
					<div style={this.Style.form}>
						<Form>
							<FormGroup>
								<Input
									type="text"
									style={this.Style.input}
									placeholder="Search for people in the Star Wars Universe"
									onChange={this.handleChange('input')}
								/>
							</FormGroup>
						</Form>
					</div>
					<br />
					{this.getTable()}
				</div>
			);
		} else {
			return (
				<div>
					<h2>People in the Star Wars Universe</h2>
					<br />
					<div style={this.Style.form}>
						<Form>
							<FormGroup>
								<Input
									type="text"
									style={this.Style.input}
									placeholder="Search for people in the Star Wars Universe"
									onChange={this.handleChange('input')}
								/>
							</FormGroup>
						</Form>
					</div>
					<br />
					<Spinner />
				</div>
			);
		}
	}
}

export default Peoples;
