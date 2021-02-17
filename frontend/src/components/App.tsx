import * as React from 'react';
import * as API from '../coinApi';
import {CoinQuote, Displays, DisplayKeys} from '../Types';
import {CoinGraph} from './CoinGraph';
import {DropDown} from './Dropdown';
import Form from 'react-bootstrap/Form';

const unCamel = (s: string): string => s.replace(/[a-z][A-Z0-9]/g, (m) => m.charAt(0) + ' ' + m.charAt(1).toLowerCase());

type AppState = {
    coins: CoinQuote[],
    show: Set<string>
    display: Displays

}

export default class App extends React.Component<{}, AppState> {
    state: Readonly<AppState> = {
        coins: [],
        show: new Set(),
        display: 'price'
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
        ))
    }

    onViewChange(show) {
        this.setState({show: new Set(show)});
    }

    onDispChange(ev) {
        this.setState({display: ev.target.value});
    }
    
    render() {
        let {coins, show, display} = this.state;
        let showCoins = coins.filter(c => show.has(c.symbol));
        return (
            <div className="stonks-container">
                <h1>S T O N K S</h1>
                <Form.Control onChange={::this.onDispChange} as="select" name="graphview" id="graph-select">
                    {DisplayKeys.map((k, i) => (<option key={i} value={k}>{unCamel(k)}</option>))}
                </Form.Control>
                <DropDown key={coins.length} fields={coins.map(c => c.symbol)} onSubmit={::this.onViewChange}/>
                <CoinGraph coins={showCoins} view={display} />
            </div>
        )
    }
}