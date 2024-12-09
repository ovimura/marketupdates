import React, { Component } from 'react';

import '../css/Login.css';

class Login extends Component {
  state = { toggle: true, userInputValue: '', pwdInputValue: '' };

  clicked = () => {
    console.log('click');
    this.setState({ toggle: !this.state.toggle });
    console.log(this.state.toggle);
  };

  handleUserInputValue = (e) => {
    this.setState({
      toggle: this.state.toggle,
      userInputValue: e.target.value,
    });
  };

  handlePwdInputValue = (e) => {
    this.setState({
      toggle: this.state.toggle,
      userInputValue: this.state.userInputValue,
      pwdInputValue: e.target.value,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h1>Login</h1>
        <br />
        <hr />
        <div className="content">
          <p></p>
          <span>
            User:{' '}
            <input
              type="text"
              value={this.state.userInputValue}
              onChange={this.handleUserInputValue}
            />
          </span>
          <span style={{ paddingLeft: '10px' }}>
            Password:{' '}
            <input
              type="password"
              value={this.state.pwdInputValue}
              onChange={this.handlePwdInputValue}
            />
          </span>
          <span style={{ paddingLeft: '20px' }}>
            <input
              type="button"
              value={'Login'}
              className="login-btn"
              onClick={this.clicked}
            />
          </span>
        </div>
        <hr />
        <div>
          {/* <span>{this.state ? 'ON' : 'OFF'}</span> */}User input value:{' '}
          {this.state.userInputValue}
          <p></p>
          Pwd input value:
          {this.state.pwdInputValue}
        </div>
      </div>
    );
  }
}

export default Login;
