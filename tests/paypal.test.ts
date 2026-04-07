import { generatePaypalAccessToken, paypal } from "../lib/paypal";

test('if generated response is a string', async () => {
  const tokenResponse = await generatePaypalAccessToken()
  expect(typeof tokenResponse).toBe('string')
})
test('if generated response is greater than 0', async () => {
  const tokenResponse = await generatePaypalAccessToken()
  expect(tokenResponse.length).toBeGreaterThan(0)
})

test('if created order has id and status property', async () => {
  const price = 10.99
  const orderResponse = await paypal.createOrder(price)
  expect(orderResponse).toHaveProperty('id')
  expect(orderResponse).toHaveProperty('status')
})

test("if status property on the created order has value as 'CREATED' ", async () => {
  const price = 10.99
  const orderResponse = await paypal.createOrder(price)
  expect(orderResponse.status).toBe('CREATED')
})

test('if simulated payment is captured with status COMPLETED', async () => {
  const orderID = '1001'

  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePaymentForOrder')
    .mockResolvedValue({
      status: 'COMPLETED'
    })

  const captureResponse = await paypal.capturePaymentForOrder(orderID)
  expect(captureResponse).toHaveProperty('status', 'COMPLETED')

  mockCapturePayment.mockRestore()
})