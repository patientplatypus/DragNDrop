const pipesreducer = (state = [], action) => {
  switch (action.type) {
    case 'PIPES_RESET':
    return state = action.data;
    case 'PIPES_DATA':
      // console.log('inside linesreducer and action.data: ', action.data);
      // return Object.assign({}, state, action.data)
      return [...state.slice(0, action.index)]
    case 'PIPES_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default pipesreducer
