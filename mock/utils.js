
export const APILoad = (mock) => {
  return {
    data: require(`${mock}`).default,
    Status: {
      code: 0,
      message: 'Request Success!'
    }
  }
}