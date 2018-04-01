import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, Flex2, Flex3, Flex4, Flex5, Flex6, Flex7, Flex8, Flex9, Flex10, Flex11, Flex12, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import Draggable, {DraggableCore} from 'react-draggable';
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position, Input, TextArea} from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'

import renderIf from 'render-if'


class RightMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      tempCode: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.rightMenuObject!=this.props.rightMenuObject){
      console.log('nextProps rightMenuObject: ', nextProps.rightMenuObject);
      console.log('thisProps rightMenuObject: ', this.props.rightMenuObject);
      console.log('value of nextProps.rightMenuObject.program', nextProps.rightMenuObject.program);
      this.setState({
        tempCode: nextProps.rightMenuObject.program
      }, ()=>{
        console.log('after setting tempCode and this.state.tempCode: ', this.state.tempCode);
      })
      // this.forceUpdate();
      // console.log('here is the new value of the rightMenuObject: ', nextProps.rightMenuObject);
      // console.log("*****");
      // console.log('had a props change: this.props', this.props.rightMenuObject, " nextProps ", nextProps.rightMenuObject);
      // console.log("*****");
      // if
    }
    // if(nextProps.rightMenuObject.program!=this.props.rightMenuObject.program){
    //   console.log("*****");
    //   console.log('inside componentWillReceiveProps and nextProps: ', nextProps.rightMenuObject);
    //   console.log('and program ', nextProps.rightMenuObject.program, " ", this.props.rightMenuObject.program);
    //   var prevProgram = this.props.rightMenuObject.program;
    //   var thisProgram = nextProps.rightMenuObject.program;
    //   console.log('prevProgram: ', prevProgram);
    //   console.log('thisProgram: ', thisProgram);
    //
    //   console.log("*****");
    //   this.setState({
    //     tempCode: nextProps.rightMenuObject.program
    //   }, ()=>{
    //     console.log('after setting state and tempCode: ', this.state.tempCode);
    //     console.log('after setting state and nextProps: ', nextProps.rightMenuObject['program'].toString());
    //   })
    // }
  }

  handleNameChange = (e) => {
    if (e.key == "Enter") {
      this.props.handleAddName(e.target.value, this.props.rightMenuObject.id, this.props.rightMenuType)
    }
  }

  handleCodeChange = () => {
    console.log('inside handleCodeChange');
    this.props.handleAddCode(this.state.tempCode, this.props.rightMenuObject.id, this.props.rightMenuType)
  }

  handleCodeRun = ()=>{
    console.log('inside handleCodeRun');
    this.props.handleCodeRun(this.props.rightMenuObject)
  }



  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        {renderIf(this.props.rightMenuType==="box")(
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
                  <Flex1>
                    <p>
                      BOX IS POWERED: {this.props.rightMenuObject.power}
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
        )}
        {renderIf(this.props.rightMenuType==="code")(
          <div style={{height: "100%", width: "100%"}}>
            {renderIf(!this.props.rightMenuObject.hasOwnProperty("empty"))(
              <div style={{height: "100%", width: "100%"}}>
                <FlexColumn style={{height: "100%"}}>
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
                        This code has no name.
                      </p>
                      <input className="pt-input .modifier" type="text" placeholder="Give it a name?" dir="auto" onKeyPress={this.handleNameChange.bind(this)}
                      />
                    </Flex1>
                  )}
                  {renderIf(this.props.rightMenuObject.hasOwnProperty("name"))(
                    <Flex1>
                      <p>
                        Name: {this.props.rightMenuObject.name}
                      </p>
                    </Flex1>
                  )}
                  <Flex5 style={{marginTop:"2.5%"}}>
                    <TextArea style={{width:"95%", height:"80%", marginLeft:"2.5%", marginRight:"2.5%"}}
                    onChange={(e)=>{
                      this.setState({
                        tempCode: e.target.value
                      });
                    }}
                    value={this.state.tempCode}
                    >
                    </TextArea>
                    <button onClick={()=>{this.handleCodeChange()}}>Save Code</button>
                    <button onClick={()=>{this.handleCodeRun()}}>Run Code</button>
                  </Flex5>
                  <Flex3>
                    <TextArea style={{width:"95%", height:"100%", marginLeft:"2.5%", marginRight:"2.5%"}}
                    value={this.props.rightMenuObject.compiled}
                    >
                    </TextArea>
                  </Flex3>
                </FlexColumn>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

// {renderIf(this.state.tempCode==="")(
//   <Flex5 style={{marginTop:"2.5%"}}>
//     <textarea className="pt-input" dir="auto" style={{width:"95%", height:"100%", marginLeft:"2.5%", marginRight:"2.5%"}}
//     onKeyPress={this.handleCodeChange.bind(this)}
//     ></textarea>
//   </Flex5>
// )}
// {renderIf(this.state.tempCode!="")(
//   <Flex5 style={{marginTop:"2.5%"}}>
//     <textarea className="pt-input" dir="auto" style={{width:"95%", height:"100%", marginLeft:"2.5%", marginRight:"2.5%"}}
//     onKeyPress={this.handleCodeChange.bind(this)}
//     >{this.state.tempCode}</textarea>
//   </Flex5>
// )}

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
