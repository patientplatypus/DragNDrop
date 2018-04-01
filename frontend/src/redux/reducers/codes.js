const codesreducer = (state = [], action) => {
  switch (action.type) {
    case 'CODES_RESET':
      return state = action.data;
    case 'CODES_DATA':
      // console.log('inside boxesdata reducer');
      // console.log('inside boxesreducer and action.data: ', action.data);
      // return Object.assign({}, state, action.data)
      return [...state.slice(0, action.index)]
      // return [...state, action.data];
    case 'CODES_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default codesreducer
