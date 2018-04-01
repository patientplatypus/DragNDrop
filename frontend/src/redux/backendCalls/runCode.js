import axios from 'axios';

var url = 'http://localhost:5000/spinFn'

export const RUNCODE = (payload) => {
  return (dispatch) => {
    var sendurl = url
    console.log('value of payload: ', payload);
    console.log('value of sendurl: ', sendurl);
    axios.post(sendurl, {code: payload})
    .then((response)=>{
      console.log('value of response from runCode: ', response.data.output);
      dispatch(AXIOSRETURNRUNCODE(response.data.output))
    })
    .catch(error => {
      console.log('inside error from runCode and response : ', error);
      dispatch(AXIOSERRORRUNCODE(error))
    })
  }
}

export const AXIOSRETURNRUNCODE = (payload) => {
  return{
    type: 'RUN_CODE_RETURN',
    data: payload
  }
}

export const AXIOSERRORRUNCODE = (payload) => {
  return{
    type: 'RUN_CODE_ERROR',
    data: payload
  }
}
