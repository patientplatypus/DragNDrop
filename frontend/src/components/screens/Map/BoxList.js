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

import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'

import renderIf from 'render-if';


class MapBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeDrags: 0,
      localBoxes: [{id:'test', controlledPosition:{x: 0, y: 0}, lineID:[], power:'test'}],
      controlledPosition: {x: 0, y: 0}
    }
    var self = this;
  }

  componentWillReceiveProps(nextProps){
    // console.log('inside componentWillReceiveProps for BoxList');
    // console.log('value of this.props.boxesRedux: ', this.props.boxesRedux);
    if (this.props.boxesRedux!=nextProps.boxesRedux){
      console.log('value of nextProps.boxesRedux: ', nextProps.boxesRedux);
      this.setState({
        localBoxes: nextProps.boxesRedux
      }, ()=>{
        // console.log('value of localBoxes in componentWillReceiveProps: ', this.state.localBoxes);
      })
    }
  }

  handleAddLine(id, index){
    var coords = this.state.localBoxes[index]['controlledPosition'];
    this.props.handleAddLine(coords, id, index)
  }

  onStart(lineID) {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  onControlledDrag(e, position, i){
    // console.log('in onControlledDrag');
    // console.log('value of position: ', position);
    // console.log('value of e; ', e);
    const {x, y} = position;
    var tempLocalBoxes = this.state.localBoxes;
    tempLocalBoxes[i]['controlledPosition']['x'] = x;
    tempLocalBoxes[i]['controlledPosition']['y'] = y;
    this.setState({
      localBoxes: tempLocalBoxes
    }, ()=>{
      this.props.onControlledDrag(
            x,
            y,
            Number(i),
            this.state.localBoxes[i]['id'],
            'infrastructure'
      )
    });
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%", position: 'absolute'}}>
        {renderIf(this.state.localBoxes[0]['id']!='test')(
          <div style={{height: "100%", width: "100%", position: 'absolute'}}>
            {[...Array(this.state.localBoxes.length)].map((x, i) =>
                <Draggable
                  bounds="parent"
                  key={i}
                  position={{x: this.state.localBoxes[i]['controlledPosition']['x'], y: this.state.localBoxes[i]['controlledPosition']['y']}}
                  style={{position: "absolute"}}
                  onDrag={(e, position)=>this.onControlledDrag(e, position, i, this.state.localBoxes[i]['id'])}
                >
                  <div className='boxCompute' style={{position:'absolute'}}>
                    <div style={{position: "relative", height: "100%", width: "100%"}}>
                      <FlexColumn>
                        <Flex1>
                          <FlexRow style={{marginTop:"2.5%"}}>
                            <Flex1/>
                            <Flex8>
                              {renderIf(this.state.localBoxes[i]['type']==='compute')(
                                <div  onClick={()=>{console.log('hey you clicked the box!');}}>
                                  <p>
                                    Compute Instance
                                  </p>
                                </div>
                              )}
                              {renderIf(this.state.localBoxes[i]['type']==='VCN')(
                                <div>
                                  <p>
                                    VCN
                                  </p>
                                </div>
                              )}
                              {renderIf(this.state.localBoxes[i]['type']==='balancer')(
                                <div>
                                  <p>
                                    Load Balancer
                                  </p>
                                </div>
                              )}
                              {renderIf(this.state.localBoxes[i]['type']==='block')(
                                <div>
                                  <p>
                                    Block Storage
                                  </p>
                                </div>
                              )}
                              {renderIf(this.state.localBoxes[i].hasOwnProperty('name'))(
                                <div style={{fontWeight: "bold"}}>
                                  <p>
                                    {this.state.localBoxes[i]['name']}
                                  </p>
                                </div>
                              )}
                            </Flex8>
                            <Flex1/>
                            <Flex1>
                              <Popover content={
                                <Menu>
                                  {renderIf(this.state.localBoxes[i]['power']==='off')(
                                    <MenuItem icon="power" text="Turn Power ON" onClick={()=>{
                                      console.log('inside onClick handler');
                                      this.props.onPowerClicked(i);
                                    }}/>
                                  )}
                                  {renderIf(this.state.localBoxes[i]['power']==='on')(
                                    <MenuItem icon="power" text="Turn Power OFF" onClick={()=>{
                                      console.log('inside onClick handler');
                                      this.props.onPowerClicked(i);
                                    }}/>
                                  )}
                                  <MenuItem icon="search-template" text="See Properties" onClick={()=>{
                                    console.log('inside onClick handler');
                                    this.props.setRightMenuObject(this.state.localBoxes[i], "box");
                                  }}/>
                                  <MenuItem icon="link" text="Create Link" onClick={()=>{
                                    console.log('inside onClick handler');
                                    this.handleAddLine(this.state.localBoxes[i]['id'], i);
                                  }}/>
                                  {renderIf(this.state.localBoxes[i]['lineID'].length>0)(
                                    <MenuItem icon="heart-broken" text="Break Link">
                                      {[...Array(this.state.localBoxes[i]['lineID'].length)].map((a, b) =>
                                        <MenuItem text={`Link ${this.state.localBoxes[i]['lineID'][b]['id']}`}
                                        onClick={()=>this.props.handleDeleteLink(this.state.localBoxes[i], this.state.localBoxes[b], this.state.localBoxes[i]['lineID'][b])}
                                        />
                                      )}
                                    </MenuItem>
                                  )}
                                </Menu>
                                } position={Position.RIGHT_TOP}>
                                <Icon className="iconHover" icon="more"/>
                              </Popover>
                            </Flex1>
                            <Flex1/>
                          </FlexRow>
                        </Flex1>
                        <Flex8>
                        </Flex8>
                        <Flex1>
                        </Flex1>
                        <Flex1/>
                      </FlexColumn>
                      <div style={{position: 'absolute', bottom: "10%", right: "10%"}}>
                        {renderIf(this.state.localBoxes[i]['power']==='off')(
                          <Icon icon='power' style={{pointerEvents: "none"}}/>
                        )}
                        {renderIf(this.state.localBoxes[i]['power']==='on')(
                          <Icon icon='power' style={{pointerEvents: "none", color: 'rgb(215,0,0)', textShadow: "0 0 3px"}}/>
                        )}
                      </div>
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
    MapBox
))

// <Tooltip
//   content={<span>POWER IS OFF</span>}
//   style={{textAlign: "center", width: "100%"}}
//   position={Position.TOP}
//   usePortal={true}
// >
// </Tooltip>


// {renderIf(this.state.localBoxes[i]['power']==='on')(
//     <Button type="button" className="pt-button  pt-icon-power" style={{outline:"none"}} onClick={this.powerClicked}></Button>
// )}
// {renderIf(this.state.localBoxes[i]['power']==='off')(
//     <div onClick={()=>{this.powerClicked()}}>
//       <p>
//         click me.
//       </p>
//     </div>
// )}
