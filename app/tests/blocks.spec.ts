import app from '../src/server';
import request from 'supertest';
import { OK, FAILED_DEPENDENCY } from 'http-status-codes';

beforeAll(async () => {
  jest.setTimeout(20000);
})


describe('GET /blocks', () => {

    it('Should return OK!', async () => {
  
      const result = await request(app).get('/api/blocks')
  
      expect(result).toBeDefined()
      expect(result.status).toBe(OK);
    });
  
});

describe('GET /blocks/:hash', () => {

  it('Should return OK if the :hash exist!', async () => {

    const hash = "0000000075ec5eec29638d83a627aa0ef4e35259cad68d02a5e04dabf5cd6f37"

    const result = await request(app).get(`/api/blocks/${hash}`)

    expect(result).toBeDefined()
    expect(result.status).toBe(OK);
  });

  it('Should return FAILED_DEPENDENCY if the :hash not exist!', async () => {

    const hash = "0000000075ec5eec29638d83a627aa0ef4e35259cad68d02a5e04dabf5cd6f33"

    const result = await request(app).get(`/api/blocks/${hash}`)

    expect(result).toBeDefined()
    expect(result.status).toBe(FAILED_DEPENDENCY);
  });

});