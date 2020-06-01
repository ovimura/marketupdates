import React, { Component } from 'react';
import '../css/News.css';
import axios from 'axios';

class News extends Component {
    state = {
        allnews: []
    }
    
    componentDidMount() {
        axios({
            "method":"GET",
            "url":"https://finnhub.io/api/v1/news?category=general&token=bqrml5frh5resd1bpilg",
            "headers":{
            "content-type":"application/json",
            }
            })
            .then((response)=> {
                //console.log(response);
                var data = response.data;
                var arr = [];
                for(var i=0; i<data.length; i++) {
                    arr.push([data[i]['source'],data[i]['headline'],data[i]['category'], data[i]['datetime'], data[i]['url'], data[i]['summary'], data[i]['image'], data[i]['id']]);
                }
                this.setState({allnews: arr});
            })
            .catch((error) => {
              console.log(error)
            });
    }

    renderNews() {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return this.state.allnews.map((e, idx) => {
            var date = new Date(e[3]*1000);
            var yr = Math.trunc(date.getUTCFullYear());
            var m = months[date.getMonth()];
            var d = date.getDate();
            var h = date.getUTCHours();
            var min = date.getUTCMinutes();
            var sec = date.getUTCSeconds();
            var dt = (d+" "+m+", "+yr + "\n" + h + ":"+min + ":" + sec);
            if(idx%2===0)
                return (<tr key={idx}><td className="source">{e[0]}</td><td>{e[1]}</td><td className="dt">{dt}</td></tr>)
            else
        return (<tr key={idx} className="even"><td className="source">{e[0]}</td><td>{e[1]}</td><td className="dt">{dt}</td></tr>)
        })
    }

    render() {
            return (
                <div  className="container-fluid">
                    <h1>News</h1>
                    <div>
                    <table className="headTbl"> 
                        <thead>
                            {/* <tr><th>Source</th><th>Headline</th><th className="money">Reserve Price</th><th className="money">Current Bid</th></tr>  */}
                            <tr><th className="hsource">Source</th><th className="headline">Headline</th><th className="hdate">Date/Time</th></tr> 
                        </thead>
                    </table> 
                    <article className="scroll">
                        <table>
                            <tbody>
                                {this.renderNews()}
                            </tbody>
                        </table>
                    </article>
                    </div>
                </div>
            );
    }
}

export default News;
