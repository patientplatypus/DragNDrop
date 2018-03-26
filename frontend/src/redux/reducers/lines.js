const linesreducer = (state = [], action) => {
  switch (action.type) {
    case 'LINES_RESET':
    return state = action.data;
    case 'LINES_DATA':
      // console.log('inside linesreducer and action.data: ', action.data);
      // return Object.assign({}, state, action.data)
      return [...state.slice(0, action.index)]
    case 'LINES_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default linesreducer
