import * as user from '../user'
/* 
these will all be globals. we run the test in the context of the jest env. 
in that env it's going to inject these funcs globally
*/

// testing the handler function. doesn't actually return a new user
describe('user handler', () => {
  // `it` is what you're testing
  it('should create a new user', async () => {
    // have to mock out the expected arguments for createNewUser()
    const req = {body: { username: 'hello', password: 'password'}}
    const res = {json({token}) {
      expect(token).toBeTruthy();
    }}
    // might want to tell jest how many expectations should be called
    // followed by your assertions
    await user.createNewUser(req, res, () => {});
  })
})