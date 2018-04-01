const runcodereducer = (state = [], action) => {
  switch (action.type) {
    case 'RUN_CODE_RETURN':
      return state = action.data;
    case 'RUN_CODE_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default runcodereducer
