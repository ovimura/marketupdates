import React, { Component } from 'react';
import '../css/News.css';
import axios from 'axios';
//import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';

class News extends Component {
    state = {
        allnews: [],
        selectedSrc: "",
        selectedHL: "",
        selectedCategory: "",
        selectedDt: "",
        selectedUrl: "",
        selectedSummary: "",
        selectedImg: "",
        selectedId: ""
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
                var data = response.data;
                var arr = [];
                for(var i=0; i<data.length; i++) {
                    arr.push([data[i]['source'],data[i]['headline'],data[i]['category'], data[i]['datetime'], data[i]['url'], data[i]['summary'], data[i]['image'], data[i]['id']]);
                }
                this.setState({allnews: arr});
                var src = "";
                var imgurl = "";
                var summary = "";
                var hl = "";
                var category = "";
                var readMore = "";
                var date, yr, m, d, h, min, sec, dt, id;
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                if(arr !== undefined) {
                    src = arr[0][0];
                    imgurl = arr[0][6];
                    summary = arr[0][5];
                    hl = arr[0][1];
                    category = arr[0][2];
                    readMore = arr[0][4];
                    date = new Date(arr[0][3]*1000);
                    yr = Math.trunc(date.getUTCFullYear());
                    m = months[date.getMonth()];
                    d = date.getUTCDate();
                    h = date.getUTCHours();
                    min = date.getUTCMinutes();
                    sec = date.getUTCSeconds();
                    dt = (d+" "+m+", "+yr + " @" + h + ":"+min + ":" + sec);
                    id = arr[0][7];
                }
                this.setState({selectedCategory: category, selectedDt: dt, selectedHL: hl, selectedId: id, selectedImg: imgurl, selectedSrc: src, selectedSummary: summary, selectedUrl: readMore});
            })
            .catch((error) => {
              console.log(error)
            });
    }

    handleClick = (id) => {
        var src = "";
        var imgurl = "";
        var summary = "";
        var hl = "";
        var category = "";
        var readMore = "";
        var date, yr, m, d, h, min, sec, dt;
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        if(this.state.allnews[0] !== undefined) {
            src = this.state.allnews[id][0];
            imgurl = this.state.allnews[id][6];
            summary = this.state.allnews[id][5];
            hl = this.state.allnews[id][1];
            category = this.state.allnews[id][2];
            readMore = this.state.allnews[id][4];
            date = new Date(this.state.allnews[id][3]*1000);
            yr = Math.trunc(date.getUTCFullYear());
            m = months[date.getMonth()];
            d = date.getUTCDate();
            h = date.getUTCHours();
            min = date.getUTCMinutes();
            sec = date.getUTCSeconds();
            dt = (d+" "+m+", "+yr + " @" + h + ":"+min + ":" + sec);
        }
        this.setState({selectedCategory: category, selectedDt: dt, selectedHL: hl, selectedId: id, selectedImg: imgurl, selectedSrc: src, selectedSummary: summary, selectedUrl: readMore});
        var trs = document.getElementsByClassName("trnewss");
        for(var i=0; i<trs.length; i++) {
            if(trs[i].className.includes("selected")) {
                trs[i].className = trs[i].className.replace("selected", "");
            }
        }
        trs[id].className += " selected";
    };

    renderNews() {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return this.state.allnews.map((e, idx) => {
            var date = new Date(e[3]*1000);
            var yr = Math.trunc(date.getUTCFullYear());
            var m = months[date.getMonth()];
            var d = date.getUTCDate();
            var h = date.getUTCHours();
            var min = date.getUTCMinutes();
            var sec = date.getUTCSeconds();
            var dt = (d+" "+m+", "+yr + "\n" + h + ":"+min + ":" + sec);
            if(idx%2===0)
                return (<tr key={idx} className="trnewss" id={idx.toString(10)} onClick={() => this.handleClick(idx)}><td className="tdnews source">{e[0]}</td><td className="tdnews">{e[1]}</td><td className="tdnewss dt">{dt}</td></tr>)
            else
        return (<tr key={idx} className="trnewss even" id={idx.toString(10)} onClick={() => this.handleClick(idx)}><td className="tdnews source">{e[0]}</td><td className="tdnews">{e[1]}</td><td className="tdnewss dt">{dt}</td></tr>)
        })
    }

    renderNewsDetails() {
        var src = "";
        var imgurl = "";
        var summary = "";
        var hl = "";
        var category = "";
        var readMore = "";
        var dt;
        if(this.state.allnews[0] !== undefined) {
            src = this.state.selectedSrc;
            imgurl = this.state.selectedImg;
            summary = this.state.selectedSummary;
            hl = this.state.selectedHL;
            category = this.state.selectedCategory;
            readMore = this.state.selectedUrl;
            dt = this.state.selectedDt;
            category = category.toUpperCase().substring(0,1) + category.substring(1,category.length);
        }
        return (<>
                    <article> 
                        <figure>  
                            <img src={imgurl} className="coverImg" alt="news" />  
                            <figcaption>Source: {src} <br></br> Category: {category}</figcaption> 
                        </figure> 
                            <hgroup>  
                                <h2>{hl}</h2>  
                                <h3><span style={{fontSize:"14px", float:"right", paddingRight: "10px", width:"100%", textAlign:"right", marginBottom:"2px"}}>{dt}</span></h3>
                            </hgroup> 
                            <p>{summary}</p> 
                            <span><a href={readMore} style={{color:"red", fontWeight:"600", fontSize: "14px"}}>Read More</a></span>
                    </article>
                </>)
    }

    render() {
            return (
                <div  className="canv container-fluid">
                    <div role="main">
                    <h1>News</h1>
                    <table className="lft">
                        <tbody>
                        <tr>
                            <td> <div>
                                <table className="headTbl tablenews">
                                    <thead>
                                        <tr className="trnews"><th className="thnews hsource">Source</th><th className="thnews headline">Headline</th><th className="thnews hdate">Date/Time</th></tr> 
                                    </thead>
                                </table> 
                                <article className="scroll" tabIndex="0">
                                    <table>
                                        <tbody>
                                            {this.renderNews()}
                                        </tbody>
                                    </table>
                                </article>
                                </div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                                <aside className="view">
                                    {this.renderNewsDetails()}
                                </aside>

                </div>
            );
    }
}

export default News;
