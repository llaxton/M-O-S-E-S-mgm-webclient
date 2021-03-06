import * as React from "react";
import { Store } from 'redux'
import { Region, Estate } from '../../lib/Immutable';
import shallowequal = require('shallowequal');

import { BusyButton } from '../BusyButton';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import { RegionStatView } from './RegionStatView';

interface props {
  isRunning: boolean,
  hasHost: boolean,
  start: () => Promise<void>,
  stop: () => Promise<void>,
  content: () => void,
  kill: () => Promise<void>
}

export class Control extends React.Component<props, {}> {

  shouldComponentUpdate(nextProps: props) {
    return !shallowequal(this.props, nextProps);
  }

  render() {
    return (
      <div>
        <BusyButton bsSize="xsmall" disabled={this.props.isRunning} onClick={this.props.start}><i className="fa fa-play" aria-hidden="true" ></i></BusyButton>
        <BusyButton bsSize="xsmall" disabled={!this.props.isRunning} onClick={this.props.stop}><i className="fa fa-stop" aria-hidden="true" ></i></BusyButton>
        <Button bsSize="xsmall" disabled={!this.props.isRunning} onClick={this.props.content}><i className="fa fa-floppy-o" aria-hidden="true" ></i></Button>
        <BusyButton bsSize="xsmall" disabled={!this.props.isRunning} onClick={this.props.kill}><i className="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i></BusyButton>
      </div>
    )
  }
}