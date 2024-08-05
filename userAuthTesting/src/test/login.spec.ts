
import request from "supertest"
import {expect} from "chai"
import app from "../main.js";




describe('Login API', () => {
  it('should return 200 and a success message for valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Login successful!');
  });

  it('should return 400 if username or password is missing', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: '' });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Username and password are required.');
  });

  it('should return 401 for invalid username', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'testpass' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid username or password.');
  });

  it('should return 401 for invalid password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpass' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid username or password.');
  });
});


