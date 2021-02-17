import * as React from 'react';
import * as API from '../coinApi';
import {CoinQuote, Displays, DisplayKeys} from '../Types';
import {CoinGraph} from './CoinGraph';

const unCamel = (s: string): string => s.replace(/[a-z][A-Z0-9]/g, (m) => m.charAt(0) + ' ' + m.charAt(1).toLowerCase());

type AppState = {
    coins: CoinQuote[]
}

export default class App extends React.Component<{}, AppState> {
    state: Readonly<AppState> = {
        coins: []
    }

    componentDidMount() {
        this.fetch();
        setInterval(::this.fetch, 1000 * 60 * 10);
    }

    fetch() {
        API.fetchData()
        .then(coins => this.setState({ coins }))
    }

    render() {
        return (
            <div className="stonks-container">
                <select name="graphview" id="graph-select">
                    {DisplayKeys.map(k => (<option value={k}>{unCamel(k)}</option>))}
                </select>
                <CoinGraph coins={this.state.coins} view={Displays.price} />
            </div>
        )
    }
}