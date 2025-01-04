describe("Payment Functions Test Suite", function () {

    beforeEach(function () {
        // Setup DOM elements required for the tests
        document.body.innerHTML = `
        <form id="paymentForm">
          <input type="text" id="billAmt" />
          <input type="text" id="tipAmt" />
          <button type="submit">Add Payment</button>
        </form>
        <table id="paymentTable">
          <tbody></tbody>
        </table>
        <table id="summaryTable">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      `;

        // Initialize variables
        billAmtInput = document.getElementById('billAmt');
        tipAmtInput = document.getElementById('tipAmt');
        paymentForm = document.getElementById('paymentForm');
        paymentTbody = document.querySelector('#paymentTable tbody');
        summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
        allPayments = {};
        paymentId = 0;

        // Attach event listener
        paymentForm.addEventListener('submit', submitPaymentInfo);
    });

    afterEach(function () {
        // Clean up the DOM after each test
        document.body.innerHTML = '';
    });

    describe("createCurPayment()", function () {
        it("should return a payment object when inputs are valid", function () {
            billAmtInput.value = '100';
            tipAmtInput.value = '15';
            const payment = createCurPayment();
            expect(payment).toEqual({
                billAmt: '100',
                tipAmt: '15',
                tipPercent: 15
            });
        });

        it("should return undefined when billAmt is empty", function () {
            billAmtInput.value = '';
            tipAmtInput.value = '15';
            const payment = createCurPayment();
            expect(payment).toBeUndefined();
        });

        it("should return undefined when tipAmt is empty", function () {
            billAmtInput.value = '100';
            tipAmtInput.value = '';
            const payment = createCurPayment();
            expect(payment).toBeUndefined();
        });

        it("should return undefined when billAmt is not positive", function () {
            billAmtInput.value = '-50';
            tipAmtInput.value = '10';
            const payment = createCurPayment();
            expect(payment).toBeUndefined();
        });

        it("should handle tipAmt of zero", function () {
            billAmtInput.value = '100';
            tipAmtInput.value = '0';
            const payment = createCurPayment();
            expect(payment).toEqual({
                billAmt: '100',
                tipAmt: '0',
                tipPercent: 0
            });
        });
    });

    describe("submitPaymentInfo()", function () {
        it("should add a new payment to allPayments on valid submission", function () {
            billAmtInput.value = '200';
            tipAmtInput.value = '40';
            submitPaymentInfo();

            expect(Object.keys(allPayments).length).toEqual(1);
            expect(allPayments['payment1']).toEqual({
                billAmt: '200',
                tipAmt: '40',
                tipPercent: 20
            });
        });

        it("should not add a payment when inputs are invalid", function () {
            billAmtInput.value = '';
            tipAmtInput.value = '20';
            submitPaymentInfo();

            expect(Object.keys(allPayments).length).toEqual(0);
        });

        it("should reset input fields after valid submission", function () {
            billAmtInput.value = '150';
            tipAmtInput.value = '30';
            submitPaymentInfo();

            expect(billAmtInput.value).toEqual('');
            expect(tipAmtInput.value).toEqual('');
        });
    });

    describe("appendPaymentTable(curPayment)", function () {
        it("should append a new row to the payment table", function () {
            const payment = {
                billAmt: '100',
                tipAmt: '20',
                tipPercent: 20
            };
            appendPaymentTable(payment);

            const rows = paymentTbody.querySelectorAll('tr');
            expect(rows.length).toEqual(1);
            const cells = rows[0].querySelectorAll('td');
            expect(cells[0].innerText).toEqual('$100');
            expect(cells[1].innerText).toEqual('$20');
            expect(cells[2].innerText).toEqual('20%');
        });
    });

    describe("updateSummary()", function () {
        it("should update the summary table with correct totals", function () {
            allPayments['payment1'] = { billAmt: '100', tipAmt: '20', tipPercent: 20 };
            allPayments['payment2'] = { billAmt: '200', tipAmt: '40', tipPercent: 20 };
            updateSummary();

            expect(summaryTds[0].innerHTML).toEqual('$300');
            expect(summaryTds[1].innerHTML).toEqual('$60');
            expect(summaryTds[2].innerHTML).toEqual('20%');
        });

        it("should handle no payments and set summary to zero", function () {
            updateSummary();

            expect(summaryTds[0].innerHTML).toEqual('$0');
            expect(summaryTds[1].innerHTML).toEqual('$0');
            expect(summaryTds[2].innerHTML).toEqual('0%');
        });
    });

});
