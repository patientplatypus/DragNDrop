
export const LINESDATA = (payload) => {
  return{
    type: 'LINES_DATA',
    data: payload
  }
}

export const LINESRESET = (payload) => {
  return{
    type: 'LINES_RESET',
    data: payload
  }
}
