import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import MapLine from './LineList'
import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import LeftMenuSmall from './LeftMenuSmall';
import LeftMenuBig from './LeftMenuBig';
import RightMenu from './RightMenu';


import { LINESDATA, BOXESDATA, LINESRESET } from '../../../redux';
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
      rightMenuObject: {empty:"true"}
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log('inside componentWillReceiveProps and nextProps: ', nextProps);
    if (this.props!=nextProps){
    }
    if(this.props.boxesRedux!=nextProps.boxesRedux){
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
  } //componentWillReceiveProps

  componentDidMount(){

  } //componentDidMount

  handleAddName(name, id){
    console.log('inside handleAddName and name, id: ', name, " ", id);
    var tempArr = [];
    this.props.boxesRedux.forEach(box=>{
      if (box.id === id){
        var tempBox = box;
        tempBox.name = name;
        tempArr.push(tempBox)
      }else{
        tempArr.push(box)
      }
    })
    console.log('value of tempArr');
    console.log(tempArr);
    this.props.setBoxes(tempArr);
  } //handleAddName

  handleAddInfrustructure(type){
    var tempBoxes = this.props.boxesRedux;
    tempBoxes.push({id: Date.now(), type: type, controlledPosition: {x: 0,y: 0}, timeHolder: Date.now(), lineID:[]});
    this.props.setBoxes(tempBoxes);
  }//handleAddInfrustructure

  setRightMenuObject(obj){
    console.log('inside setRightMenuObject and obj: ', obj);
    this.setState({
      rightMenuObject: obj
    })
  }//setRightMenuObject

  handleDeleteLink(boxa, boxb, link){
    // console.log('inside handleDeleteLink in index.js and id, link: ', id, ", ", link);
    console.log('inside handleDeleteLink and boxa, boxb, link; ', boxa, ", ", boxb, ", ", link );
    var tempLines = []
    var tempBoxes = [];
    this.props.linesRedux.forEach(line=>{
      if (line.id!=link.id){
        tempLines.push(line)
      }
    })
    this.props.boxesRedux.forEach(box=>{
      if (box.id!=boxa.id&&box.id!=boxb.id){
        tempBoxes.push(box)
      }else if(box.id===boxa.id){
        var counterBoxA = 0;
        var tempLineID = [];
        boxa['lineID'].forEach(lineid=>{
          if(lineid.id!=link.id){
            var templineid = lineid;
            if(lineid.type==='parent'){
              templineid.indexLinkParent = counterBoxA;
            }else if(lineid.type==='child'){
              templineid.indexLinkChild = counterBoxA;
            }
            tempLineID.push(lineid)
          }
          counterBoxA++;
        })
        var tempBox = box;
        tempBox.lineID = tempLineID;
        tempBoxes.push(tempBox);
      }else if(box.id===boxb.id){
        var counterBoxB = 0;
        var tempLineID = [];
        boxb['lineID'].forEach(lineid=>{
          if(lineid.id!=link.id){
            var templineid = lineid;
            if(lineid.type==='parent'){
              templineid.indexLinkParent = counterBoxB;
            }else if(lineid.type==='child'){
              templineid.indexLinkChild = counterBoxB;
            }
            tempLineID.push(lineid)
          }
          counterBoxB++;
        })
        var tempBox = box;
        tempBox.lineID = tempLineID;
        tempBoxes.push(tempBox);
      }
    })
    console.log('after handleDeleteLink and value of tempBoxes, tempLines: ', tempBoxes, ", ", tempLines);
    this.props.setBoxes(tempBoxes)
    this.props.resetLines(tempLines)
  }//handleDeleteLink

  handleAddLine(coords, id, index){
    if(this.state.linkHolder.x1===null){
      var tempBoxes = this.props.boxesRedux;
      this.setState({
        linkHolder: {x1: coords.x, y1: coords.y, x2: null, y2: null, parentID: id, childID: null, parentIndex: index, indexLinkParent: this.props.boxesRedux[index]['lineID'].length, childIndex: null}
      })
    }else{
      this.setState({
        linkHolder: {x1: this.state.linkHolder.x1, y1: this.state.linkHolder.y1, x2: coords.x, y2: coords.y, parentID: this.state.linkHolder.parentID, childID: id, parentIndex: this.state.linkHolder.parentIndex, childIndex:index, id: Date.now(), indexLinkParent: this.state.linkHolder.indexLinkParent, indexLinkChild: this.props.boxesRedux[index]['lineID'].length}
      },  ()=>{
        var tempBoxes = this.props.boxesRedux;
        tempBoxes[this.state.linkHolder.parentIndex]['lineID'].push({type: 'parent', id: this.state.linkHolder.id, index:this.state.linkHolder.parentIndex, boxID: this.state.linkHolder.parentID, indexLinkParent: this.state.linkHolder.indexLinkParent});
        tempBoxes[this.state.linkHolder.childIndex]['lineID'].push({type: 'child', id: this.state.linkHolder.id, boxID: this.state.linkHolder.childID, index:this.state.linkHolder.childIndex, indexLinkChild: this.state.linkHolder.indexLinkChild});

        var tempLines = this.props.linesRedux;
        tempLines.push(this.state.linkHolder);

        this.props.setLines(tempLines);
        this.props.setBoxes(tempBoxes);
        this.setState({
          linkHolder: {x1: null, y1: null, x2: null, y2: null, parentID: null, childID: null, parentIndex: null, childIndex: null}
        })
      })
    }
  }//handleAddLine

  onControlledDrag(x, y, index, id) {
    if (x!="" && y!=""){
      var tempBoxes = this.props.boxesRedux;
      tempBoxes[index]['controlledPosition']['x'] = x
      tempBoxes[index]['controlledPosition']['y'] = y
      var tempLines = [];
      this.props.linesRedux.forEach(line=>{
        var tempLine;
        if (line.parentID===id){
          var tempLine = line;
          tempLine['x1'] = x;
          tempLine['y1'] = y;
        }else if(line.childID===id){
          var tempLine = line;
          tempLine['x2'] = x;
          tempLine['y2'] = y;
        }else{
          var tempLine = line;
        }
        tempLines.push(line)
      })
      this.props.setLines(tempLines)
    }
  } //onControlledDrag

  render() {

    return (
      <div>
        <div className='parentGrid'>
          <div className='topbar menustyletop pt-card pt-elevation-4'>
            <LeftMenuSmall/>
          </div>
          <div className='sidebar menustyleside pt-card pt-elevation-4'>
            <LeftMenuBig
              handleAddInfrustructure={(type)=>{this.handleAddInfrustructure(type)}}
            />
          </div>
          <div className='rightbar menustyleside pt-card pt-elevation-4'>
            <RightMenu
              rightMenuObject={this.state.rightMenuObject}
              handleAddName={(name, id)=>this.handleAddName(name, id)}
            />
          </div>
          <div className='map mapstyle backGrey pt-card pt-elevation-1' style={{position: 'relative', padding: '0'}}>
            <MapLine />
            <MapBox
            setRightMenuObject={(obj)=>{this.setRightMenuObject(obj)}}
            handleAddInfrustructure={(type)=>{this.handleAddInfrustructure(type)}}
            handleAddLine={(coords, id, index)=>{this.handleAddLine(coords, id, index)}}
            onControlledDrag={(x, y, index, id)=>{this.onControlledDrag(x, y, index, id)}}
            handleDeleteLink={(boxa, boxb, link)=>{this.handleDeleteLink(boxa, boxb, link)}}
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
      resetLines: (e)=>{dispatch(LINESRESET(e))},
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
