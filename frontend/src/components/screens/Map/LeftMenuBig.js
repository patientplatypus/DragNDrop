import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import Draggable, {DraggableCore} from 'react-draggable';
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'


class LeftMenuBig extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <Popover content={
          <Menu>
            <MenuItem icon="graph" text="Compute Instance" onClick={()=>{
              this.props.handleAddInfrustructure("compute")
            }} />
            <MenuItem icon="map" text="Block Storage" onClick={()=>{
              this.props.handleAddInfrustructure("block")
            }}/>
            <MenuItem icon="th" text="VCN" onClick={()=>{
              this.props.handleAddInfrustructure("VCN")
            }}/>
            <MenuItem icon="zoom-to-fit" text="Load Balancer" onClick={()=>{
              this.props.handleAddInfrustructure("balancer")
            }}/>
            <MenuDivider />
            <MenuItem icon="cog" text="Settings...">
                <MenuItem icon="add" text="Add new application" disabled={true} />
                <MenuItem icon="remove" text="Remove application" />
            </MenuItem>
          </Menu>
          } position={Position.RIGHT_TOP}>
          <Button icon="share" text="Add Infrastructure" />
        </Popover>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return({
      setLines: (e)=>{dispatch(LINESDATA(e))},
      setBoxes: (e)=>{dispatch(BOXESDATA(e))},
    })
}

function mapStateToProps(state) {
    return({
      linesRedux: state.linesreducer,
      boxesRedux: state.boxesreducer,
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    LeftMenuBig
))
