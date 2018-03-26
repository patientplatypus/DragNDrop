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


class LeftMenuSmall extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    return (
      <FlexColumn style={{height: '100%', width: '100%'}}>
        <Flex1/>
        <Flex1>
          <div className="pt-button-group pt-fill">
            <button className="pt-button">Get Started</button>
            <button className="pt-button">Open Project</button>
            <button className="pt-button">Upload Project</button>
          </div>
        </Flex1>
        <Flex1/>
      </FlexColumn>
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
    LeftMenuSmall
))
