import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';

const CryptoApi = ({pa}) => {
    let {dataId} = useParams();
    if(pa !== undefined && dataId === undefined)
        dataId = pa;
    if(dataId === undefined)
        dataId = 'bitcoin';
    let [coin, setCoin] = React.useState('')
       React.useEffect(() => {
        axios({
            "method":"GET",
            "url":"https://coingecko.p.rapidapi.com/coins/"+dataId.toLowerCase(),
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"coingecko.p.rapidapi.com",
            "x-rapidapi-key":"a883fc58e6msh5ddecf03c777f85p16c295jsn47cb261e4668",
            "useQueryString":true
            },"params":{
            "developer_data":"true",
            "market_data":"true",
            "sparkline":"false",
            "community_data":"true",
            "localization":"true",
            "tickers":"true"
            }
            })
            .then((response)=>{
              //console.log(response);
              setCoin(response.data);
            })
            .catch((error)=>{
              console.log(error)
            })
   }, [dataId],[1])
    return (
        <div style={{}}>
            {/* <h2>Data View for {dataId.toString().toUpperCase()}</h2> */}
            {coin && <div style={{paddingLeft: "30px"}}>
                <table>
                    <caption style={{width: "400px", color:"black", fontWeight: 600}} >Quote as of {coin['last_updated']} for {dataId.toUpperCase()}</caption>
                    <thead>
                    <tr>
                        <th>Current</th>
                        <th>All Time High</th>
                        <th>All Time Low</th>
                        <th>High 24h</th>
                        <th>Low 24h</th>
                        <th>Price Change 24h</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>${coin['market_data']['current_price']['usd']}</td>
                        <td>${coin['market_data']['ath']['usd']}</td>
                        <td>${coin['market_data']['atl']['usd']}</td>
                        <td>${coin['market_data']['high_24h']['usd']}</td>
                        <td>${coin['market_data']['low_24h']['usd']}</td>
                        <td>${coin['market_data']['price_change_24h_in_currency']['usd']}</td>
                    </tr>
                    </tbody>
                </table>
            </div>}
            <br/>
        </div>
    )
}

export default CryptoApi
