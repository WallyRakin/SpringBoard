describe("calculateMonthlyPayment", function () {
  it('should calculate the monthly rate correctly', function () {
    const values = {
      amount: 10000,
      years: 5,
      rate: 5
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toEqual("188.71");
  });

  it("should return a result with 2 decimal places", function () {
    const values = {
      amount: 15000,
      years: 3,
      rate: 4.5
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toMatch(/^\d+\.\d{2}$/);
  });

  it("should handle zero interest rate", function () {
    const values = {
      amount: 12000,
      years: 2,
      rate: 0
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toEqual("500.00");
  });

  it("should handle large numbers", function () {
    const values = {
      amount: 1000000,
      years: 30,
      rate: 3.5
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toEqual("4491.07");
  });

  it("should return 'NaN' for invalid inputs", function () {
    const values = {
      amount: "abc",
      years: "five",
      rate: "five percent"
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toEqual("NaN");
  });

  it("should calculate correctly for very short loan terms", function () {
    const values = {
      amount: 5000,
      years: 0.5,
      rate: 5
    };
    const monthly = calculateMonthlyPayment(values);
    expect(monthly).toEqual("875.00");
  });
});
