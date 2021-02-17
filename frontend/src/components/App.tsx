import * as React from 'react';
import * as API from '../coinApi';
import {CoinQuote} from '../Types';
import {CoinGraph} from './CoinGraph';

type AppState = {
    coins: CoinQuote[]
}

export default class App extends React.Component<{}, AppState> {
    state: Readonly<AppState> = {
        coins: []
    }

    componentDidMount() {
        API.fetchData()
        .then(coins => this.setState({ coins }))
    }

    render() {
        return (
            <div className="stonks-container">
                <CoinGraph coins={this.state.coins}/>
            </div>
        )
    }
}