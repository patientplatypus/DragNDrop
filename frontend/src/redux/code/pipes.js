
export const PIPESDATA = (payload) => {
  return{
    type: 'PIPES_DATA',
    data: payload
  }
}

export const PIPESRESET = (payload) => {
  return{
    type: 'PIPES_RESET',
    data: payload
  }
}
