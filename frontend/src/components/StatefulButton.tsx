import * as React from 'react';
import {Button} from 'react-bootstrap';

interface StatefulButtonProps {
    on: string,
    off: string,
    onClick: (b: boolean) => any,
    initial?: boolean
}

export const StatefulButton = ({on, off, onClick, initial}: StatefulButtonProps) => {
  let [isOn, setOn] = React.useState(initial ?? true);
  let toggle = () => {setOn(!isOn); onClick(isOn)};

  return (<Button type="button" onClick={toggle}>{isOn ? on : off}</Button>);
}