import React, {Component} from 'react'
import AxiosApi from '../api/AxiosApi'
import withNavigateHook from './withNavigateHook';
import io from 'socket.io-client'
//import "./Components.css";
//const socketIO = require('socket.io')


export class JoinGroupChat extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            room: '',
            message: '',
            message_list: []
        }
        this.clientSocket = io('http://localhost:8081');
        this.handleToLogin = this.handleToLogin.bind(this);
        this.clientSocket = null
    }

    componentDidMount() {
        const {room}  = this.props.match.params;
        console.log("room is " + room)
        const username = localStorage.getItem('username')
       this.setState({ username, room });

        this.clientSocket = io('http://localhost:8081');

        this.clientSocket.on('new_group_message', (data)=> {
            const newMessage = data.message
            this.state.message_list.appendChild(newMessage)
            this.setState(prevState => ({
                message_list: [...prevState.message_list, data.message]
            }));
        })
        
    }

    handleToLogin(){
        this.props.navigation('/');
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    sendMsg = (message) => {
        try{
            const { username, room, message } = this.state;
            const date_sent = new Date();

            AxiosApi.post(`chat/${room}`, {
                from_user: username,
                room: room,
                message: message
            }).then(res => console.log("res data", res.data))

            const msg = `${username} ${date_sent}\n${message}`
            this.clientSocket.emit('group_chat', msg)
        }catch(error){
            console.log("error", error);
        }
    }

    leave = () => {
        this.clientSocket.emit('leave_room', this.state.room)
        this.handleToLogin()
    }


    render(){
        const { username, room } = this.state;
        return (
        <div className='container'>
            <h3>Group Chat Room</h3>
            <p>Room Name: {room}</p>
            <p>Members: {username}</p>


            <div id='message_list'>
            
            </div>

            <div>
                <input type="text" id="group_message" placeholder='Enter Your Message Here...' onChange={(e) => this.onValueChanged(e)}></input>
                <button class="btn btn-primary" onClick = {this.sendMsg}>send</button>
            </div>

            <div>
                <button class="btn btn-primary" onClick = {this.leave}>Leave Room</button>
            </div>
        </div>
        )
        }
}

export default withNavigateHook(JoinGroupChat);