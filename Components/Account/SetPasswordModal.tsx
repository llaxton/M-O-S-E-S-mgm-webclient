import * as React from "react";

import { Modal, Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';

interface props {
  submit: (password: string) => void,
  cancel: () => void,
  show: boolean
}

export class SetPasswordModal extends React.Component<props, {}> {
  state: {
    p1: string
    p2: string
    error: string
  }

  constructor(props: props) {
    super(props);
    this.state = {
      p1: '',
      p2: '',
      error: ''
    }
  }

  handleSubmit(e: React.FormEvent<any>) {
    e.preventDefault();
    if (this.state.p1 === '') {
      this.setState({
        error: 'Password may not be blank'
      });
    }
    if (this.state.p1 !== this.state.p2) {
      this.setState({
        error: 'Passwords do not match'
      });
    }
    this.props.submit(this.state.p1);
  }

  onP1(e: { target: { value: string } }) {
    this.setState({ p1: e.target.value })
  }

  onP2(e: { target: { value: string } }) {
    this.setState({ p2: e.target.value })
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.cancel}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Modal.Header>
            <Modal.Title>Set Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Password: </ControlLabel>
            <FormControl type="password" placeholder="" onChange={this.onP1.bind(this)} />
            <ControlLabel>Repeat: </ControlLabel>
            <FormControl type="password" placeholder="" onChange={this.onP2.bind(this)} />
            { this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : <div /> }
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
            <Button onClick={this.props.cancel}>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}