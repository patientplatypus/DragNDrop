import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
// extract specific components
// import { Card, Button, Breadcrumb } from "@blueprintjs/core";
import Draggable, {DraggableCore} from 'react-draggable';
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'


class MapLine extends Component {
  constructor(props){
    super(props);
    this.state = {
      localLines: []
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log('value of Mapline nextProps: ', nextProps);
    // console.log('this.props.lines[this.props.index].x1; ', this.props.lines[this.props.index].x1);
    // console.log('nextProps.lines[this.props.index].x1; ', nextProps.lines[this.props.index].x1);
    // if(nextProps!=this.props){
    //   this.forceUpdate();
    // }
    console.log('**(*&(&(*&(&(*&(*&(*&(&(&(*&(*&(*&(*&())))))))))))))');
    console.log('inside componentWillReceiveProps for LineList');
    console.log('**(*&(&(*&(&(*&(*&(*&(&(&(*&(*&(*&(*&())))))))))))))')
    console.log('and this.props.linesRedux: ', this.props.linesRedux);
    if (this.props.linesRedux!=nextProps.linesRedux){
      this.setState({
        localLines: nextProps.linesRedux
      })
    }
  }

  render() {
    return (
      <svg width="100%" height="100%" style={{position: "absolute", pointerEvents: 'none'}}>
        {[...Array(this.state.localLines.length)].map((x, i) =>
          <line
          x1={this.state.localLines[i].x1+50} y1={this.state.localLines[i].y1+50} x2={this.state.localLines[i].x2+50} y2={this.state.localLines[i].y2+50}
          key={i}
          style={{fill: 'none', stroke: '#000000', strokeWidth: 3}}/>
        )}
      </svg>
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
    MapLine
))
