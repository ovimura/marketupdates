import React, { Component } from 'react';

// import {DatePicker} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Homepage extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date()
      };
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      handleChangeStart = date => {
        this.setState({
          startDate: date
        });
        console.log(date.getFullYear());
        console.log(this.months[date.getMonth()]);
        console.log(date.getDate());
        console.log("lllllllllllll>");
        var from = date.getDate() + " "+ this.months[date.getMonth()] + ", " + date.getFullYear()
        var doc = document.getElementById("sp1");
        if(doc.innerHTML != "")
            doc.innerHTML = "";
        doc.appendChild(document.createTextNode(from));
      };

      handleChangeEnd = date => {
        this.setState({
          endDate: date
        });
        console.log(date.getFullYear());
        console.log(this.months[date.getMonth()]);
        console.log(date.getDate());
        console.log("aaaaaaaaaaa>");
        var to = date.getDate() + " "+ this.months[date.getMonth()] + ", " + date.getFullYear()
        var doc = document.getElementById("sp2");
        if(doc.innerHTML != "")
            doc.innerHTML = "";
        doc.appendChild(document.createTextNode(to));
      };

    render() {
        return (
            <>
            <div  className="container-fluid">
                <h1>Home Page Content</h1>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div style={{width: "300px"}}>
                <div style={{float: "left", paddingLeft:"10px", width: "100px"}}>
                    From: 
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeStart}
                />
                <p>{this.state.startDate.getDate() + " " + this.months[this.state.startDate.getMonth()] + ", " + this.state.startDate.getFullYear()}</p>
                <span id="sp1"></span>
                </div>
                <div style={{float: "right", paddingLeft:"10px", width: "100px"}}>
                    To:
                    <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChangeEnd}
                />
                <p>{this.state.endDate.getDate() + " " + this.months[this.state.endDate.getMonth()] + ", " + this.state.endDate.getFullYear()}</p>
                <span id="sp2"></span>
                </div>
              </div>
              </>
        );
    }
}

export default Homepage;

