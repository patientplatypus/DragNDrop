import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import MapLine from './LineList'
// extract specific components
// import { Card, Button, Breadcrumb } from "@blueprintjs/core";
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";


import { LINESDATA, BOXESDATA } from '../../../redux';
import { connect } from 'react-redux'


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      localBoxes: [],
      localLines: [],
      tempX: 100,
      tempY: 100,
      dragID: null,
      linkHolder: {x1: null, y1: null, x2: null, y2: null, parentIndex: null, childIndex: null},
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('inside componentWillReceiveProps and nextProps: ', nextProps);
    if (this.props!=nextProps){
      console.log('props have changed!');
      console.log('value of linesRedux: ', nextProps.linesRedux);
      console.log('value of boxesRedux: ', nextProps.boxesRedux);
    }
    if(this.props.boxesRedux!=nextProps.boxesRedux){
      console.log('inside difference in props boxesRedux');
      console.log('boxesRedux nextProps: ', this.props.boxesRedux);
      console.log('boxesRedux thisProps: ', nextProps.boxesRedux);
      var tempLocalBoxes = nextProps.boxesRedux
      this.setState({
        localBoxes: tempLocalBoxes
      })
    }
    if(this.props.linesRedux!=nextProps.linesRedux){
      var tempLocalLines = nextProps.linesRedux
      this.setState({
        localLines: tempLocalLines
      })
    }

  }

  // componentWillReceiveProps(nextProps){
  //   console.log('inside componentWillReceiveProps: ', nextProps);
  // }

  componentDidMount(){
    // var self = this;
    // function boxesReduxChecker(){
    //   console.log('value of this.props.boxesRedux: ', self.props.boxesRedux[0]);
    //   setTimeout(()=>{
    //     boxesReduxChecker()
    //   }, 1000)
    // }
    // boxesReduxChecker();
  }

  handleAddInfrustructure(type){
    // var tempBoxes = this.state.boxes;
    console.log('inside handleAddInfrustructure');
    var tempBoxes = this.props.boxesRedux
    console.log('value of this.props.boxesRedux ', tempBoxes);
    tempBoxes.push({id: Date.now(), type: type, controlledPosition: {x: 0,y: 0}, timeHolder: Date.now(), lineID:[]})
    this.props.setBoxes(tempBoxes);
    console.log('the value of boxesRedux after setting: ', this.props.boxesRedux);
    // this.setState({
    //   boxes: tempBoxes
    // }, ()=>{
    //   console.log('after setState and boxes: ', this.state.boxes);
    // })
  }

  testFunction(){
    console.log('inside testfunction');
  }

  forceUpdateCallback(){
    // this.forceUpdate();
    console.log('value of this.state.lines in index: ', this.state.lines);
  }

  handleDeleteLink(id){
    console.log('inside handleDeleteLink in indes.js and id: ', id);
    // var tempLines = this.state.lines;
    // var tempBoxes = this.state.boxes;
    var tempLines = this.props.linesRedux;
    var tempBoxes = this.props.boxesRedux;
    var parentIndex = this.props.linesRedux[id]['parentIndex'];
    var childIndex = this.props.linesRedux[id]['childIndex'];
    tempBoxes[parentIndex]['lineID'].splice(id, 1);
    tempBoxes[childIndex]['lineID'].splice(id, 1);
    tempLines.splice(id, 1);
    this.props.setBoxes(tempBoxes);
    this.props.setLines(tempLines);
    // this.setState({
    //   boxes: tempBoxes,
    //   lines: tempLines
    // }, ()=>{
    //   this.forceUpdate();
    // })
  }

  handleAddLine(coords, index){
    console.log('inside handleAddLine and coords', coords);
    console.log('inside handleAddLine and index ', index);
    if(this.state.linkHolder.x1===null){
      // var tempBoxes = this.state.boxes;
      var tempBoxes = this.props.boxesRedux;
      this.setState({
        linkHolder: {x1: coords.x, y1: coords.y, x2: null, y2: null, parentIndex: index, childIndex: null}
      }, ()=>{
        console.log('after setting linkHolder first: ', this.state.linkHolder);
      })
    }else{
      this.setState({
        linkHolder: {x1: this.state.linkHolder.x1, y1: this.state.linkHolder.y1, x2: coords.x, y2: coords.y, parentIndex: this.state.linkHolder.parentIndex, childIndex: index}
      },  ()=>{
        // var tempBoxes = this.state.boxes;
        var tempBoxes = this.props.boxesRedux;
        // console.log('value of this.state.linkHolder.length in handleAddLine: ', this.state.linkHolder.length);
        tempBoxes[this.state.linkHolder.parentIndex]['lineID'].push({type: 'parent', id: this.props.linesRedux.length});
        tempBoxes[this.state.linkHolder.childIndex]['lineID'].push({type: 'child', id: this.props.linesRedux.length});
        // var tempLines = this.state.lines;
        var tempLines = this.props.linesRedux;
        tempLines.push(this.state.linkHolder);

        this.props.setLines(tempLines);
        this.props.setBoxes(tempBoxes);
        this.setState({
          linkHolder: {x1: null, y1: null, x2: null, y2: null, parentIndex: null, childIndex: null}
        })
        // this.setState({
        //   lines: tempLines,
        //   boxes: tempBoxes
        // }, ()=>{
        //   this.setState({
        //     linkHolder: {x1: null, y1: null, x2: null, y2: null, parentIndex: null, childIndex: null}
        //   }, ()=>{
        //     console.log('after handleAddLine setState tree and Lines and linkHolder: ');
        //     console.log('Lines: ', this.state.lines);
        //     console.log('linkHolder: ', this.state.linkHolder);
        //   })
        // })
      })
    }
  }

  onControlledDrag(x, y, index, id) {
    console.log('value of id in onControlledDrag: ', id);
    console.log('value of x: ');
    console.log(x);
    console.log('value of y: ');
    console.log(y);
    console.log('value of index; ');
    console.log(index);
    if (x!="" && y!=""){
      console.log('inside if statement');
      // var tempBoxes = this.state.boxes
      var tempBoxes = this.props.boxesRedux;
      tempBoxes[index]['controlledPosition']['x'] = x
      tempBoxes[index]['controlledPosition']['y'] = y
      console.log('value of tempBoxes after setting: ');
      console.log(tempBoxes);
      this.props.setBoxes(tempBoxes)
      if(this.props.boxesRedux[index]['lineID'].length>0){
        this.props.boxesRedux[index]['lineID'].forEach(lineID=>{
          if(lineID.type === "parent"){
            var tempLines = this.props.linesRedux;
            console.log('in onControlledDrag and tempLines: ', tempLines);
            console.log('value of lineID: ', lineID);
            tempLines[lineID.id]['x1'] = x;
            tempLines[lineID.id]['y1'] = y;
            this.props.setLines(tempLines);
          }else if(lineID.type === "child"){
            var tempLines = this.props.linesRedux;
            console.log('in onControlledDrag and tempLines: ', tempLines);
            console.log('value of lineID: ', lineID);
            tempLines[lineID.id]['x2'] = x;
            tempLines[lineID.id]['y2'] = y;
            this.props.setLines(tempLines);
          }
        })
      }
      // this.setState({
      //   boxes: tempBoxes
      // }, ()=>{
      //   if(this.state.boxes[index]['lineID'].length>0){
      //     this.state.boxes[index]['lineID'].forEach(lineID=>{
      //       if(lineID.type === "parent"){
      //         var tempLines = this.state.lines;
      //         console.log('in onControlledDrag and tempLines: ', tempLines);
      //         console.log('value of lineID: ', lineID);
      //         tempLines[lineID.id]['x1'] = x;
      //         tempLines[lineID.id]['y1'] = y;
      //         this.setState({
      //           lines: tempLines
      //         })
      //       }else if(lineID.type === "child"){
      //         var tempLines = this.state.lines;
      //         console.log('in onControlledDrag and tempLines: ', tempLines);
      //         console.log('value of lineID: ', lineID);
      //         tempLines[lineID.id]['x2'] = x;
      //         tempLines[lineID.id]['y2'] = y;
      //         this.setState({
      //           lines: tempLines
      //         })
      //       }
      //     })
      //   }
      // })
    }
  }

  render() {

    // let mapBoxes;
    //
    // if(this.state.boxes.length!=0){
    //   // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
    //       mapBoxes = this.state.boxes.map((box,i) => {
    //         return (
    //           <MapBox box={box} key={i} index={i}
    //           onControlledDrag={(x, y, index, id)=>this.onControlledDrag(x, y, index, id)}
    //           handleAddLine={(coords, index)=>this.handleAddLine(coords, index)}
    //           lines={this.state.lines}
    //           boxes={this.state.boxes}
    //           handleDeleteLink={(id)=>{this.handleDeleteLink(id)}}
    //           forceUpdateCallback={()=>{this.forceUpdateCallback()}}
    //           />
    //         );
    //       });
    // }
    // let mapBoxes;
    // // console.log('value of this.props.boxesRedux.length: ', this.props.boxesRedux.length);
    // if(this.props.boxesRedux.length>0){
    //   console.log('inside this.props.boxesRedux if statement');
    //   // console.log("this.state.goalsToday if is (first condition)", this.state.goalsToday);
    //     console.log('type of this.state.localBoxes: ', typeof this.props.boxesRedux);
    //       mapBoxes = this.props.boxesRedux.map(({box},i) => {
    //         console.log('value of box from boxesRedux: ', box);
    //         return (
    //           <MapBox box={box} key={i} index={i}
    //           onControlledDrag={(x, y, index, id)=>this.onControlledDrag(x, y, index, id)}
    //           handleAddLine={(coords, index)=>this.handleAddLine(coords, index)}
    //           lines={this.state.localLines}
    //           boxes={this.props.localBoxes}
    //           handleDeleteLink={(id)=>{this.handleDeleteLink(id)}}
    //           forceUpdateCallback={()=>{this.forceUpdateCallback()}}
    //           />
    //         );
    //       });
    // }

    return (
      <div>
        <div className='parentGrid'>
          <div className='topbar menustyletop pt-card pt-elevation-4'>
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
          </div>
          <div className='sidebar menustyleside pt-card pt-elevation-4'>
            <Popover content={
              <Menu>
                <MenuItem icon="graph" text="Compute Instance" onClick={()=>{
                  this.handleAddInfrustructure("compute")
                }} />
                <MenuItem icon="map" text="Block Storage" onClick={()=>{
                  this.handleAddInfrustructure("block")
                }}/>
                <MenuItem icon="th" text="VCN" onClick={()=>{
                  this.handleAddInfrustructure("VCN")
                }}/>
                <MenuItem icon="zoom-to-fit" text="Load Balancer" onClick={()=>{
                  this.handleAddInfrustructure("balancer")
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
          <div className='rightbar menustyleside pt-card pt-elevation-4'>
              <Button>Add </Button>
          </div>
          <div className='map mapstyle backGrey pt-card pt-elevation-1' style={{position: 'relative', padding: '0'}}>
            <MapLine />
            <MapBox
            handleAddInfrustructure={(type)=>{this.handleAddInfrustructure(type)}}
            handleAddLine={(coords, index)=>{this.handleAddLine(coords, index)}}
            onControlledDrag={(x, y, index, id)=>{this.onControlledDrag(x, y, index, id)}}
            handleDeleteLink={(id)=>{this.handleDeleteLink(id)}}
            />
          </div>
        </div>
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
    Map
))
