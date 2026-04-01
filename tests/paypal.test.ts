import { generatePaypalAccessToken } from "../lib/paypal";

test('if generated response is a string',async ()=>{
  const tokenResponse = await generatePaypalAccessToken()
  expect(typeof tokenResponse).toBe('string')
})
test('if generated response is greater than 0',async ()=>{
  const tokenResponse = await generatePaypalAccessToken()
  expect(tokenResponse.length).toBeGreaterThan(0)
})