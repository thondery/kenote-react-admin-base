export default process.env.NODE_ENV === 'development'
? {
  domain: 'http://localhost:4000',
  apiPath: '/api/v1',
  isMock: true
} : {
  domain: 'http://localhost:4000',
  apiPath: '/api/v1',
  isMock: true
}