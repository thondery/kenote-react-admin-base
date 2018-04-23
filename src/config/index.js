export default process.env.NODE_ENV === 'development'
? {
  domain: 'http://localhost:4000',
  apiPath: '/api/v1',
  isMock: true
} : {
  domain: process.env.domain || 'http://localhost:4000',
  apiPath: '/api/v1',
  isMock: false
}