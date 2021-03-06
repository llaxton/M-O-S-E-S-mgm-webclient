import * as React from "react";
import { Action } from "redux";
import { Map, Set } from 'immutable';
import shallowequal = require('shallowequal');

import { Estate, User } from '../../lib/Immutable';
import { ReduxStore } from '../../lib/Redux';

import { EstateView } from './EstateView';

import { Grid, Row, Col, Button } from 'react-bootstrap'
import { AddEstateModal } from './AddEstateModal';

interface props {
    store: ReduxStore,
    estates: Map<number, Estate>
    estateMap: Map<string, number>,
    managers: Map<number, Set<string>>,
    users: Map<string, User>,
    isAdmin: boolean
}

interface state {
    showAdd: boolean
}

export class EstateList extends React.Component<props, {}> {
    state: state
    constructor(props: props) {
        super(props);
        this.state = {
            showAdd: false
        }
    }

    shouldComponentUpdate(nextProps: props, nextState: state) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }

    showAddEstate() {
        this.setState({
            showAdd: true
        })
    }
    cancelNewEstate() {
        this.setState({
            showAdd: false
        })
    }

    render() {
        let regionCount: { [key: number]: number } = {};
        this.props.estateMap.map((estateID: number, regionId: string) => {
            if (regionCount[estateID]) {
                regionCount[estateID] += 1;
            } else {
                regionCount[estateID] = 1;
            }
        })
        let estates = this.props.estates.toArray()
            .sort((a: Estate, b: Estate) => { return a.EstateName.localeCompare(b.EstateName) })
            .map((e: Estate) => {
                return <EstateView
                    key={e.EstateID.toString()}
                    isAdmin={this.props.isAdmin}
                    store={this.props.store}
                    users={this.props.users}
                    managers={this.props.managers.get(e.EstateID)}
                    estate={e}
                    regionCount={regionCount[e.EstateID] || 0} />
            })
        return (
            <Grid>
                <h1>Estates</h1>
                <Row>
                    <Col md={3}>Name</Col>
                    <Col md={1}>Regions</Col>
                    <Col md={3}>Owner</Col>
                    <Col md={4}>Managers</Col>
                    <Col md={1}>
                        {this.props.isAdmin ?
                            <Button onClick={this.showAddEstate.bind(this)}>Add Estate</Button> :
                            <span />
                        }
                    </Col>
                </Row>
                {estates}
                <AddEstateModal
                    store={this.props.store}
                    show={this.state.showAdd}
                    cancel={this.cancelNewEstate.bind(this)}
                    users={this.props.users}
                    estates={this.props.estates} />
            </Grid>
        );
    }
}