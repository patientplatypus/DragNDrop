const boxesreducer = (state = [], action) => {
  switch (action.type) {
    case 'BOXES_DATA':
      console.log('inside boxesdata reducer');
      console.log('inside boxesreducer and action.data: ', action.data);
      // return Object.assign({}, state, action.data)
      return [...state.slice(0, action.index)]
      // return [...state, action.data];
    case 'BOXES_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default boxesreducer
