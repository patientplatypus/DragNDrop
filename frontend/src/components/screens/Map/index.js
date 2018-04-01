import React, { Component } from 'react';

import './mainGrid.css'
import './local.css'
import '../../../style/colors.css'
import {Flex1, Flex2, Flex3, Flex4, Flex5, Flex6, Flex7, Flex8, Flex9, Flex10, Flex11, Flex12, FlexRow, FlexColumn} from '../../../style/Flex.js'
import MapBox from './BoxList'
import MapLine from './LineList'

import MapCode from './CodeList'
import MapPipe from './PipeList'


import { AnchorButton, Button, Intent, Switch, Card, Breadcrumb, Spinner, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange, handleNumberChange } from "@blueprintjs/docs-theme";

import LeftMenuSmall from './LeftMenuSmall';
import LeftMenuBig from './LeftMenuBig';
import RightMenu from './RightMenu';


import { LINESDATA, BOXESDATA, LINESRESET, PIPESDATA, CODESDATA, CODESRESET, RUNCODE } from '../../../redux';
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
      rightMenuObject: {empty:"true"},
      tempCodeObjID: null,
      shouldSetRightMenu: false,
      shouldSetObj: null
    }
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.shouldSetRightMenu===true){
      this.setState({
        shouldSetRightMenu: false,
      }, ()=>{
        this.setRightMenuObject(this.state.shouldSetObj, "code")
        this.setState({
          shouldSetObj: null
        })
      })
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log('inside componentWillReceiveProps and nextProps: ', nextProps);
    console.log('inside componentWillReceiveProps');
    console.log('and this.props.codesRedux: ', this.props.codesRedux);
    console.log('and nextProps.codesRedux: ', nextProps.codesRedux);
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
    // if(this.props.codesRedux!=this.props.codesRedux){
    //   console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    //   console.log('value of codesRedux has changed!');
    //   console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    // }
    if(this.props.ranCodeRedux!=nextProps.ranCodeRedux){
      console.log('value of this.props.ranCodeRedux: ', this.props.ranCodeRedux);
      console.log('value of nextProps.ranCodeRedux: ', nextProps.ranCodeRedux);
      var tempArr = [];
      this.props.codesRedux.forEach(code=>{
        console.log('inside loop!');
        console.log('value of code.id: ', code.id);
        console.log('value of this.state.tempCodeObjID: ', this.state.tempCodeObjID);
        if(code.id===this.state.tempCodeObjID){
          console.log('inside if statement!');
          var tempCode = code;
          tempCode.compiled = nextProps.ranCodeRedux;
          tempArr.push(tempCode);
        }else{
          tempArr.push(code)
        }
      })
      console.log('value of tempArr');
      console.log(tempArr);
      this.props.resetCodes(tempArr);
      this.setState({
        shouldSetRightMenu: true,
        shouldSetObj: tempArr[tempArr.length-1]
      })
    }
  } //componentWillReceiveProps

  componentDidMount(){

  } //componentDidMount

  handleAddName(name, id, type){
    console.log('inside handleAddName and name, id: ', name, " ", id, " ", type);
    if (type==='box'){
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
    }else if(type==='code'){
      var tempArr = [];
      console.log('value of this.props.codesRedux: ', this.props.codesRedux);
      this.props.codesRedux.forEach(code=>{
        console.log('value of code.id and code; ', code.id, ' ', code);
        if (code.id === id){
          console.log('inside === statement');
          var tempCode = code;
          tempCode.name = name;
          tempArr.push(tempCode)
        }else{
          tempArr.push(tempCode)
        }
      })
      console.log('value of tempArr');
      console.log(tempArr);
      this.props.resetCodes(tempArr);
    }
  } //handleAddName

  handleAddCode(programCode, id, type){
    console.log('inside handleAddCode and programCode, id, type: ', programCode, " ", id, " ", type);
    var tempArr = [];
    console.log('value of this.props.codesRedux: ', this.props.codesRedux);
    this.props.codesRedux.forEach(code=>{
      console.log('value of code.id and code; ', code.id, ' ', code);
      if (code.id === id){
        console.log('inside === statement');
        var tempCode = code;
        tempCode.program = programCode;
        tempArr.push(tempCode)
      }else{
        tempArr.push(tempCode)
      }
    })
    console.log('value of tempArr');
    console.log(tempArr);
    this.props.setCodes(tempArr);
  } //handleAddCode

  handleCodeRun(obj){
    console.log('inside handleCodeRun in index and obj: ', obj);
    // console.log('and obj ', obj);
    // this.props.codeRun(this.props.codesRedux[index])
    this.setState({
      tempCodeObjID: obj.id
    }, ()=>{
      this.props.runCode(obj.program)
    })
  }//handleCodeRun

  handleAddInfrustructure(type){
    var tempBoxes = this.props.boxesRedux;
    tempBoxes.push({id: Date.now(), type: type, controlledPosition: {x: 0,y: 0}, timeHolder: Date.now(), lineID:[], power: "off"});
    this.props.setBoxes(tempBoxes);
  }//handleAddInfrustructure

  handleAddCodeBlock(){
    console.log('inside handleAddCodeBlock');
    var tempCode = this.props.codesRedux;
    tempCode.push({id: Date.now(), controlledPosition: {x: 0, y:0}, timeHolder: Date.now(), pipeID: [], program:"", compiled:""})
    this.props.setCodes(tempCode)
  }//handleAddCodeBlock

  setRightMenuObject(obj, type){
    console.log('inside setRightMenuObject and obj: ', obj, " and type: ", type);
    this.setState({
      rightMenuObject: obj,
      rightMenuType: type
    })
  }//setRightMenuObject

  onPowerClicked(index){
    console.log('inside onPowerClicked');
    console.log('inside onPowerClicked and index: ', index);
    var tempBoxes = this.props.boxesRedux;
    console.log('value of tempBoxes[index][power]: ', tempBoxes[index]['power']);
    if(tempBoxes[index]['power']==="off"){
      console.log('inside first if');
      tempBoxes[index]['power']="on"
      console.log('before setting and tempBoxes: ', tempBoxes);
      this.props.setBoxes(tempBoxes);
    }else if(tempBoxes[index]['power']==="on"){
      console.log('inside second if');
      tempBoxes[index]['power']="off"
      console.log('before setting and tempBoxes: ', tempBoxes);
      this.props.setBoxes(tempBoxes);
    }
  }//onPowerClicked

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
        tempBoxes[this.state.linkHolder.childIndex]['lineID'].push({type: 'child', id: this.state.linkHolder.id, index:this.state.linkHolder.childIndex, boxID: this.state.linkHolder.childID,  indexLinkChild: this.state.linkHolder.indexLinkChild});

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

  onControlledDrag(x, y, index, id, type) {
    if (x!="" && y!="" && type==='code'){
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
    if (x!="" && y!="" && type==='infrastructure'){
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
              handleAddCodeBlock={()=>this.handleAddCodeBlock()}
            />
          </div>
          <div className='rightbar menustyleside pt-card pt-elevation-4'>
            <RightMenu
              handleCodeRun={(obj)=>this.handleCodeRun(obj)}
              rightMenuObject={this.state.rightMenuObject}
              rightMenuType={this.state.rightMenuType}
              handleAddName={(name, id, type)=>this.handleAddName(name, id, type)}
              handleAddCode={(name, id, type)=>this.handleAddCode(name, id, type)}
            />
          </div>
          <div className='map mapstyle backGrey pt-card pt-elevation-1' style={{position: 'relative', padding: '0'}}>
            <MapLine />
            <MapBox
            setRightMenuObject={(obj, type)=>{this.setRightMenuObject(obj, type)}}
            handleAddInfrustructure={(type)=>{this.handleAddInfrustructure(type)}}
            handleAddLine={(coords, id, index)=>{this.handleAddLine(coords, id, index)}}
            onControlledDrag={(x, y, index, id, type)=>{this.onControlledDrag(x, y, index, id, type)}}
            handleDeleteLink={(boxa, boxb, link)=>{this.handleDeleteLink(boxa, boxb, link)}}
            onPowerClicked={(index)=>{this.onPowerClicked(index)}}
            />

            <MapCode
              onControlledDrag={(x, y, index, id)=>{this.onControlledDrag(x, y, index, id)}}
              setRightMenuObject={(obj, type)=>{this.setRightMenuObject(obj, type)}}
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
      setPipes: (e)=>{dispatch(PIPESDATA(e))},
      setCodes: (e)=>{dispatch(CODESDATA(e))},
      resetCodes: (e)=>{dispatch(CODESRESET(e))},
      runCode: (e)=>{dispatch(RUNCODE(e))}
    })
}

function mapStateToProps(state) {
    return({
      linesRedux: state.linesreducer,
      boxesRedux: state.boxesreducer,
      codesRedux: state.codesreducer,
      pipesRedux: state.pipesreducer,
      ranCodeRedux: state.runcodereducer
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    Map
))
