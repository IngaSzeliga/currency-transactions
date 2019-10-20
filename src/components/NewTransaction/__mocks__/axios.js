export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: { rates: { PLN: 4.2843 }, base: "EUR", date: "2019-10-18" }
    })
  )
};
