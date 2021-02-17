import * as React from 'react';
import { Form, Dropdown, DropdownButton, Button } from 'react-bootstrap';

interface DropdownProps {
  fields: string[]
  onSubmit: (selected: string[]) => any
}


export class DropDown extends React.Component<DropdownProps, object> {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state =
      Object.fromEntries(props.fields.map(f => [f, true]));
  }
  
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.checked });
  }

  onSubmit(ev) {
    ev.preventDefault();
    let selected = [...Object.keys(this.state)].filter(k => this.state[k]);
    this.props.onSubmit(selected);
  }

  render() {
    let keys = [...Object.keys(this.state)];
    return (
      <Dropdown>
        <DropdownButton id="currency-dropdown-toggle" title="Select coins">
          <Form onSubmit={::this.onSubmit}>
          { keys.map((k, i) => (
            <Form.Check

              inline
              onChange={::this.onChange}
                checked={this.state[k]}
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