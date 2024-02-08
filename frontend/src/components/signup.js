import React, { Component } from 'react'
import AxiosApi from '../api/AxiosApi'
import withNavigateHook from './withNavigateHook';
//import "./Components.css";


export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            password: ""
        }
        this.handleToLogin = this.handleToLogin.bind(this);
    }

    useEffect = () => {
        this.handleToLogin();
    }

    handleToLogin() {
        this.props.navigation('/');
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signup = () => {
        try{
            const newUser = {
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: this.state.password
            }
            AxiosApi.post('signup', 
                newUser
            ).then(res => console.log("res data", res.data))
            this.handleToLogin()
        }catch(error){
            console.log("error", error);
        }
    }

  render() {
    return (
      <div className='container'>
        <h3>Sign Up</h3>
        <form>
            <div class="mb-3">
                <label class="form-label">Username:
                <input class="form-control" name="username" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='Username'></input>
                </label>
            </div>

            <div class="mb-3">
                <label class="form-label">Firstname:
                <input class="form-control" name="firstname" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='Firstname'></input>
                </label>
            </div>

            <div class="mb-3">
                <label class="form-label">Lastname:
                <input class="form-control" name="lastname" type="text" onChange={(e) => this.onValueChanged(e)} placeholder='Lastname'></input>
                </label>
            </div>

            <div class="mb-3">
                <label class="form-label">Password:
                <input class="form-control" name="password" type="password" onChange={(e) => this.onValueChanged(e)} placeholder='Password'></input>
                </label>
            </div>

            <div>
                <button class="btn btn-primary" onClick={this.signup}>Signup</button>
                <button class="btn btn-primary" onClick={this.handleToLogin}>Cancel</button>
            </div>
        </form>
      </div>
    )
  }
}

export default withNavigateHook(Signup);