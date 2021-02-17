import * as React from 'react';
import { Form, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { CoinSearch } from './CoinSearch';

interface DropdownProps {
  fields: string[]
  onSubmit: (selected: string[]) => any
}

interface DropDownState {
  vals: object,
  show: Set<string>
}
export class DropDown extends React.Component<DropdownProps, DropDownState> {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      vals: Object.fromEntries(props.fields.map(f => [f, true])),
      show: new Set(props.fields),
    }
  }
  
  onFind(show) {
    // console.log(show);
    this.setState({show: new Set(show)});
  }

  onChange(ev) {
    this.setState(st => { 
      let vals = {...st.vals};
      vals[ev.target.name] = ev.target.checked;
      return {vals};
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    let {vals} = this.state;
    let selected = [...Object.keys(vals)].filter(k => vals[k]);
    this.props.onSubmit(selected);
  }

  render() {
    let {vals, show} = this.state;
    let keys = [...Object.keys(vals)].filter(k => show.has(k));
    // console.log(keys);
    return (
      <Dropdown>
        <DropdownButton id="currency-dropdown-toggle" title="Select coins">
          <Form onSubmit={::this.onSubmit}>
          <CoinSearch values={this.props.fields} onFind={::this.onFind} />
          { keys.map((k, i) => (
            <Form.Check
              inline
              onChange={::this.onChange}
              checked={vals[k]}
              name={k}
              label={k}
              type="checkbox"
              key={k}
              id={k}
            />))
          }
          <Button type="submit">Submit</Button>
          </Form >
        </DropdownButton>
      </Dropdown >               
        )

  }
}