import * as React from 'react';
import * as API from '../coinApi';
import {BTCDisplaysKeys, BTCTimeData, CoinQuote, Displays, DisplaysKeys} from '../Types';
import {CoinGraph} from './CoinGraph';
import {DropDown} from './Dropdown';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {QuoteGraph} from './QuoteGraph';
import {StatefulButton} from './StatefulButton';

const unCamel = (s: string): string => s.replace(/[a-z][A-Z0-9]/g, (m) => m.charAt(0) + ' ' + m.charAt(1).toLowerCase());

type AppState = {
    coins: CoinQuote[],
    show: Set<string>,
    display: Displays,
    showAll: boolean,
    timeData: BTCTimeData

}

export default class App extends React.Component<{}, AppState> {
    state: Readonly<AppState> = {
        coins: [],
        show: new Set(),
        display: 'price',
        showAll: true,
        timeData: [],
        timeDataShow: 'price_open'
    }

    componentDidMount() {
        this.fetch();
        setInterval(::this.fetch, 1000 * 60 * 10);
    }

    fetch() {
        API.fetchData()
        .then(coins => this.setState(st => 
            ({ coins
             , show: st.show.size ? st.show : new Set(coins.map(c => c.symbol)) 
            })
        )).then(API.fetchBTCTimeSeries)
          .then(timeData => this.setState({timeData}));
    }

    showBTCHist() {
        console.log(this.state.showAll);
        this.setState(st => ({showAll: st.showAll ^ true}));
    }
    onViewChange(show) {
        this.setState({show: new Set(show)});
    }

    onBTCChange(ev) { //TODO refactor
        this.setState({timeDataShow: ev.target.value});
    }
    onDispChange(ev) {
        this.setState({display: ev.target.value});
    }
    
    render() {
        let {coins, show, display, showAll, timeData, timeDataShow} = this.state;
        console.log(timeData);
        let showCoins = coins.filter(c => show.has(c.symbol));
        return (
            <div className="stonks-container">
                <h1>//S T O N K S// (it's like Questrade but even less functional)</h1>
                {do {
                    if (showAll) {
                    <>
                    <Form.Control onChange={::this.onDispChange} as="select" name="graphview" id="graph-select">
                        {DisplaysKeys.map((k, i) => (<option key={i} value={k}>{unCamel(k)}</option>))}
                    </Form.Control>
                    <DropDown key={coins.length} fields={coins.map(c => c.symbol)} onSubmit={::this.onViewChange}/>
                <CoinGraph coins={showCoins} view={display} />
                { do {
                        if (coins.length) {
                    (<div className="last-updated-stamp">
                        Last updated: {new Date(coins[0].lastUpdated).toLocaleString()}
                    </div>)
                } else {
                    null
                }
                    }    }
                    </>
                    } else {

                        <>
                    <Form.Control onChange={::this.onBTCChange} as="select" name="graphview" id="graph-select">
                        {BTCDisplaysKeys.map((k, i) => (<option key={i} value={k}>{unCamel(k)}</option>))}
                    </Form.Control>
                        <QuoteGraph data={timeData} view={timeDataShow}/>
                        </>
                }
                }}
            <StatefulButton on="Historical BTC Data" off="Current Crypto Data" onClick={::this.showBTCHist} />
            {/* <Button onClick={::this.showBTCHist}>Historical BTC Data</Button> */}
            <img style={{ display: 'block', maxWidth: "30%", height: "auto"}}src='https://pbs.twimg.com/media/ETeSb5HUYAUhGWb?format=jpg&name=medium'></img>
            </div >
        )
    }
}