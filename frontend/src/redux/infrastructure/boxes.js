import axios from 'axios';

export const BOXESDATA = (payload) => {
  // console.log('inside boxedata!');
  return{
    type: 'BOXES_DATA',
    data: payload
  }
}
