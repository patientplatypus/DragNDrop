import  { combineReducers }  from 'redux'

import linesreducer from './lines'
import boxesreducer from './boxes'


export default combineReducers({
  // userlogin,
  // loginreturn,
  // registerocireturn,
  // settoken,
  // guireducer1,
  linesreducer,
  boxesreducer
})
