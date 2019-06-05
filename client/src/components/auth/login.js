import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default class login extends Component {
	state = {
		username: '',
		password: '',
	};

	updateCreds = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		axios
			.post('http://localhost:5000/api/login', {
				username,
				password,
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.error(err);
			});
	};

	render() {
		return (
			<div>
				<Container maxWidth="sm">
					<h2>Login</h2>
					<form onSubmit={this.submit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="username"
							label="Username"
							type="text"
							id="username"
							autoComplete="username"
							onChange={this.updateCreds}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="password"
							onChange={this.updateCreds}
						/>
						<Button type="submit" fullWidth variant="text" color="primary">
							Sign In
						</Button>
					</form>
				</Container>
			</div>
		);
	}
}
