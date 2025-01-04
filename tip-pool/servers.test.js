describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // Setup DOM elements required for the tests
    document.body.innerHTML = `
      <form id="serverForm">
        <input type="text" id="serverName" />
        <button type="submit">Add Server</button>
      </form>
      <table id="serverTable">
        <tbody></tbody>
      </table>
    `;

    // Re-initialize variables after setting up the DOM
    serverNameInput = document.getElementById('serverName');
    serverForm = document.getElementById('serverForm');
    serverTbody = document.querySelector('#serverTable tbody');
    allServers = {};
    serverId = 0;

    // Attach event listener again after resetting the DOM
    serverForm.addEventListener('submit', submitServerInfo);
  });

  afterEach(function () {
    // Clean up the DOM after each test
    document.body.innerHTML = '';
  });

  describe("submitServerInfo()", function () {
    it('should add a new server to allServers on submitServerInfo()', function () {
      serverNameInput.value = 'Alice';
      submitServerInfo();

      expect(Object.keys(allServers).length).toEqual(1);
      expect(allServers['server1'].serverName).toEqual('Alice');
    });
  });

  describe("updateServerTable()", function () {
    beforeEach(function () {
      // Mock the sumPaymentTotal function
      window.sumPaymentTotal = function () {
        return 0; // Return a default value for testing
      };

      // Mock the appendTd function
      window.appendTd = function (tr, value) {
        const td = document.createElement('td');
        td.innerText = value;
        tr.appendChild(td);
      };
    });

    it('should update the server table with one server', function () {
      allServers['server1'] = { serverName: 'Bob' };
      updateServerTable();

      const rows = serverTbody.querySelectorAll('tr');
      expect(rows.length).toEqual(1);
      const cells = rows[0].querySelectorAll('td');
      expect(cells[0].innerText).toEqual('Bob');
      expect(cells[1].innerText).toEqual('$0.00'); // Based on mocked sumPaymentTotal
    });
  });
});
