import axios from 'axios';

export const CODESDATA = (payload) => {
  console.log('inside codesdata!');
  return{
    type: 'CODES_DATA',
    data: payload
  }
}

export const CODESRESET = (payload) => {
  // console.log('inside boxedata!');
  console.log('inside codesreset!');
  return{
    type: 'CODES_RESET',
    data: payload
  }
}
