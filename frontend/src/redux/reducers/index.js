import  { combineReducers }  from 'redux'

import linesreducer from './lines'
import boxesreducer from './boxes'
import codesreducer from './codes'
import pipesreducer from './pipes'
import runcodereducer from './runCode'


export default combineReducers({
  // userlogin,
  // loginreturn,
  // registerocireturn,
  // settoken,
  // guireducer1,
  linesreducer,
  boxesreducer,
  codesreducer,
  pipesreducer,
  runcodereducer
})
