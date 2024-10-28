import React, { Component } from 'react';

import '../css/About.css';

class About extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>About</h1>
        <br />
        <hr />
        <div className="content">
          <p>Author: Ovidiu Mura</p>
          <p>Email: ovioamu@gmail.com</p>
          <p>
            Repo:{' '}
            <a
              href="https://github.com/ovimura/marketupdates"
              className="aAbout"
            >
              marketupdates
            </a>
          </p>
        </div>
        <hr />
      </div>
    );
  }
}

export default About;
