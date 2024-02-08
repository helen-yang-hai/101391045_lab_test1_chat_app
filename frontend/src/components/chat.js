import React, {Component} from 'react'
import withNavigateHook from './withNavigateHook';
import io from 'socket.io-client'
//import "./Components.css";
//const socketIO = require('socket.io')

export class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            room: ''
        }
        this.clientSocket = io('http://localhost:8081')
        this.handleToChatRoom = this.handleToChatRoom.bind(this);
    }

    
    handleToChatRoom(room) {
        var url = `/chat/${room}`
        this.props.navigation(url);
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    joinChat = () => {
        try{
            const {username, room} = this.state
            this.clientSocket.emit('join_room', room )
            this.handleToChatRoom(room)
        }catch(error){
            console.log("error", error);
        }
    }


    render(){
            return (
            <div className='container'>
                <h3>Chat</h3>
                <form>
                    <div class="mb-3">
                        <input class="form-control" name='username' type='text' onChange={(e) => this.onValueChanged(e)} placeholder='Username'></input>
                    </div>

                    <div class="mb-3">
                        <label class="form-control">Room</label>
                        <select name='room' type='text' onChange={(e) => this.onValueChanged(e)}>
                        <option value="devops">Devops</option>
                        <option value="cloudComputing">Cloud Computing</option>
                        <option value="covid19">Covid19</option>
                        <option value="sports">Sports</option>
                        <option value="nodeJS">NodeJS</option>
                        </select>         
                    </div>
                
                    <div>
                        <button class="btn btn-primary" onClick = {this.joinChat}>Join Chat Room</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withNavigateHook(Chat);