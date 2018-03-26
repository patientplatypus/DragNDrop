import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import Draggable, {DraggableCore} from 'react-draggable';
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position, Input} from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'

import renderIf from 'render-if'


class RightMenu extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.rightMenuObject!=this.props.rightMenuObject){
      // console.log('here is the new value of the rightMenuObject: ', nextProps.rightMenuObject);
    }
  }

  handleNameChange = (e) => {
    if (e.key == "Enter") {
      this.props.handleAddName(e.target.value, this.props.rightMenuObject.id)
    }
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        {renderIf(!this.props.rightMenuObject.hasOwnProperty("empty"))(
          <div style={{height: "100%", width: "100%"}}>
            <FlexColumn style={{height: "20%"}}>
              <Flex1>
                <p>
                  ID: {this.props.rightMenuObject.id}
                </p>
              </Flex1>
              <Flex1>
                <p>
                  TYPE: {this.props.rightMenuObject.type}
                </p>
              </Flex1>
              {renderIf(!this.props.rightMenuObject.hasOwnProperty("name"))(
                <Flex1>
                  <p>
                    This box has no name.
                  </p>
                  <input className="pt-input .modifier" type="text" placeholder="Give it a name?" dir="auto" onKeyPress={this.handleNameChange.bind(this)}/>
                </Flex1>
              )}
              {renderIf(this.props.rightMenuObject.hasOwnProperty("name"))(
                <Flex1>
                  <p>
                    Name: {this.props.rightMenuObject.name}
                  </p>
                </Flex1>
              )}
            </FlexColumn>
          </div>
        )}
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
    RightMenu
))
