import React from 'react';
import './App.css';
import Card from './components/card/Card';
import Navbar from './components/navbar/Narbar';
import {posts} from './data.js';
import {io} from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user: null,
      socket: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const socket = io("http://localhost:5000");
    this.setState({ socket });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const { username, socket } = this.state;  
    this.setState({ user: {username} }, () => {
      console.log(this.state.user)
      this.state.socket.emit("newUser", this.state.user.username);
    });
  }

  render() {
    return (
      <>
        { this.state.user ? (
          <div  className="container">
            <Navbar socket={this.state.socket}/>

          {posts.map((post) => (
            <Card key={post.id} post={post} socket={this.state.socket} user={this.state.user}/>
          ))}

            <span className='username'>{this.state.user.username}</span>
          </div>
          ) : (
          <>
            <h1>Login</h1>
            <form className='login-form' onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <button type="submit">Submit</button>
            </form>
          </>
          )
        }
      </>
    );
  }

}

export default App;
