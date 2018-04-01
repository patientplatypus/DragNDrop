import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, Flex2, Flex3, Flex4, Flex5, Flex6, Flex7, Flex8, Flex9, Flex10, Flex11, Flex12, FlexRow, FlexColumn} from '../../../style/Flex.js'
// extract specific components
// import { Card, Button, Breadcrumb } from "@blueprintjs/core";
import Draggable, {DraggableCore} from 'react-draggable';
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Icon, Popover, Position, Tooltip } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import { LINESDATA, BOXESDATA, LINESRESET, PIPESDATA, CODESDATA } from '../../../redux';
import { connect } from 'react-redux'

import renderIf from 'render-if';


class MapCode extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeDrags: 0,
      localCodes: [{id:'test', controlledPosition:{x: 0, y: 0}, pipeID:[]}],
      controlledPosition: {x: 0, y: 0}
    }
    var self = this;
  }

  componentWillReceiveProps(nextProps){
    // console.log('inside componentWillReceiveProps for BoxList');
    // console.log('value of this.props.boxesRedux: ', this.props.boxesRedux);
    if (this.props.codesRedux!=nextProps.codesRedux){
      console.log('value of nextProps.codesRedux: ', nextProps.codesRedux);
      this.setState({
        localCodes: nextProps.codesRedux
      }, ()=>{
        // console.log('value of localBoxes in componentWillReceiveProps: ', this.state.localBoxes);
      })
    }
  }

  // handleAddPipe(id, index){
  //   var coords = this.state.localBoxes[index]['controlledPosition'];
  //   this.props.handleAddLine(coords, id, index)
  // }

  onControlledDrag(e, position, i){
    // console.log('in onControlledDrag');
    // console.log('value of position: ', position);
    // console.log('value of e; ', e);
    const {x, y} = position;
    var tempLocalCodes = this.state.localCodes;
    tempLocalCodes[i]['controlledPosition']['x'] = x;
    tempLocalCodes[i]['controlledPosition']['y'] = y;
    this.setState({
      localCodes: tempLocalCodes
    }, ()=>{
      this.props.onControlledDrag(
            x,
            y,
            Number(i),
            this.state.localCodes[i]['id'],
            'code'
      )
    });
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        {renderIf(this.state.localCodes[0]['id']!='test')(
          <div style={{height: "100%", width: "100%"}}>
            {[...Array(this.state.localCodes.length)].map((x, i) =>
                <Draggable
                  bounds="parent"
                  key={i}
                  position={{x: this.state.localCodes[i]['controlledPosition']['x'], y: this.state.localCodes[i]['controlledPosition']['y']}}
                  style={{position: "absolute"}}
                  onDrag={(e, position)=>this.onControlledDrag(e, position, i, this.state.localCodes[i]['id'])}
                >
                  <div className='codeBox' style={{position:'absolute'}}>
                    <div style={{position: "relative", height: "100%", width: "100%"}}>
                      <FlexColumn>
                        <Flex1/>
                        <Flex1>
                          <FlexRow>
                            <Flex1/>
                            <Flex8>
                              <p>
                                Code Block
                              </p>
                            </Flex8>
                            <Flex1>
                              <Popover content={
                                <Menu>
                                  <MenuItem icon="code" text="See Code" onClick={()=>{
                                    this.props.setRightMenuObject(this.state.localCodes[i], "code")
                                  }}/>
                                </Menu>
                                } position={Position.RIGHT_TOP}>
                                <Icon className="iconHover" icon="more"/>
                              </Popover>
                            </Flex1>
                            <Flex1/>
                          </FlexRow>
                        </Flex1>
                        <Flex1 style={{paddingLeft: "5%"}}>
                        {renderIf(this.state.localCodes[i].hasOwnProperty('name'))(
                          <div style={{fontWeight: "bold"}}>
                            <p>
                              {this.state.localCodes[i]['name']}
                            </p>
                          </div>
                        )}
                        </Flex1>
                        <Flex9/>
                      </FlexColumn>
                    </div>
                  </div>
                </Draggable>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return({
      setLines: (e)=>{dispatch(LINESDATA(e))},
      resetLines: (e)=>{dispatch(LINESRESET(e))},
      setBoxes: (e)=>{dispatch(BOXESDATA(e))},
      setPipes: (e)=>{dispatch(PIPESDATA(e))},
      setCodes: (e)=>{dispatch(CODESDATA(e))}
    })
}

function mapStateToProps(state) {
    return({
      linesRedux: state.linesreducer,
      boxesRedux: state.boxesreducer,
      codesRedux: state.codesreducer,
      pipesRedux: state.pipesreducer
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    MapCode
))
