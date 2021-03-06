import * as React from "react";
import { Map, Set, Iterable } from 'immutable';
import shallowequal = require('shallowequal');

import { Group, Member, Role, User } from '../../lib/Immutable';

import { Grid, Row, Col } from 'react-bootstrap';

interface props {
  group: Group
  members: Map<string, Member>
  roles: Map<string, Role>
  users: Map<string,User>
}

export class GroupView extends React.Component<props, {}> {

  shouldComponentUpdate(nextProps: props) {
        return !shallowequal(this.props, nextProps);
    }

  render() {
    let roles: JSX.Element[];
    if (this.props.roles) {
      roles = this.props.roles.toArray().map((m: Role) => {
        return <span key={m.RoleID}>{m.Name} </span>
      });
    }
    let founder: string = this.props.group.FounderID;
    if( this.props.users.get(founder) )
      founder = this.props.users.get(founder).name();
    return (
      <Row>
        <Col md={3}>{this.props.group.Name}</Col>
        <Col md={3}>{founder}</Col>
        <Col md={1}>{this.props.members ? this.props.members.size : 0}</Col>
        <Col md={5}>{roles}</Col>
      </Row>
    )
  }
}
