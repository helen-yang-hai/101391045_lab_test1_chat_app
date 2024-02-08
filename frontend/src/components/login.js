import React, {Component} from 'react'
import withNavigateHook from './withNavigateHook';
import AxiosApi from '../api/AxiosApi'
//import "./Components.css";

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleToChat = this.handleToChat.bind(this);
        this.handleToSignup = this.handleToSignup.bind(this);
    }

    useEffect = () => {
        this.handleToSignup();
        this.handleToChat();
    }

    handleToChat() {
        this.props.navigation('/chat');
    }

    handleToSignup(){
        this.props.navigation('/signup');
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    login = () => {
        try{
            AxiosApi.post('login', {
                username: this.state.username,
                password: this.state.password
            }).then(localStorage.setItem('username', this.state.username))
            this.handleToChat()
        }catch(error){
            console.log("error", error);
        }
    }


    render(){
            return (
            <div className='container'>
                <h3>Login</h3>
                <form>
                    <div class="mb-3">
                    <input class="form-control" name='username' type='text' onChange={(e) => this.onValueChanged(e)} placeholder='Username'></input>
                    </div>

                    <div class="mb-3">
                    <input class="form-control" name='password' type='password' onChange={(e) => this.onValueChanged(e)} placeholder='Password'></input>
                    </div>
                
                    <div>
                        <button class="btn btn-primary" onClick = {this.login}>Login in</button>
                        <button class="btn btn-primary" onClick = {this.handleToSignup}>Signup</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withNavigateHook(Login);