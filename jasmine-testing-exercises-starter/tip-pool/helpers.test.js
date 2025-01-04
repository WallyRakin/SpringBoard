describe("Payment Functions Test Suite", function () {

    describe("sumPaymentTotal(type)", function () {
        beforeEach(function () {
            allPayments = {};
        });

        it("should correctly sum all bill amounts", function () {
            allPayments['payment1'] = { billAmt: '100', tipAmt: '15', tipPercent: 15 };
            allPayments['payment2'] = { billAmt: '200', tipAmt: '30', tipPercent: 15 };
            const total = sumPaymentTotal('billAmt');
            expect(total).toEqual(300);
        });

        it("should return 0 when there are no payments", function () {
            const total = sumPaymentTotal('billAmt');
            expect(total).toEqual(0);
        });
    });

    describe("calculateTipPercent(billAmt, tipAmt)", function () {
        it("should calculate the correct tip percentage", function () {
            const percent = calculateTipPercent('100', '15');
            expect(percent).toEqual(15);
        });

        it("should handle zero tip amount", function () {
            const percent = calculateTipPercent('100', '0');
            expect(percent).toEqual(0);
        });
    });

    describe("appendTd(tr, value)", function () {
        it("should append a new td with the correct value to the tr", function () {
            const tr = document.createElement('tr');
            appendTd(tr, '$100');
            const td = tr.querySelector('td');
            expect(td).not.toBeNull();
            expect(td.innerText).toEqual('$100');
        });

        it("should append multiple tds correctly", function () {
            const tr = document.createElement('tr');
            appendTd(tr, '$100');
            appendTd(tr, '15%');
            const tds = tr.querySelectorAll('td');
            expect(tds.length).toEqual(2);
            expect(tds[0].innerText).toEqual('$100');
            expect(tds[1].innerText).toEqual('15%');
        });
    });

});
