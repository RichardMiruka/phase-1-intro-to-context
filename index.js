   function createEmployeeRecord(employeeData) {
        return {
          firstName: employeeData[0],
          familyName: employeeData[1],
          title: employeeData[2],
          payPerHour: employeeData[3],
          timeInEvents: [],
          timeOutEvents: []
        };
      }

      function createEmployeeRecords(arrays) {
        return arrays.map(function(array) {
          return createEmployeeRecord(array)
        })
      }
      
      function createTimeInEvent(employeeRecord, dateStamp) {
        let [date, hour] = dateStamp.split(" ");
        employeeRecord.timeInEvents.push({
          type: "TimeIn",
          hour: parseInt(hour, 10),
          date: date
        });
        return employeeRecord;
      }
      
      function createTimeOutEvent(employee, dateStamp) {
        let [date, hour] = dateStamp.split(" ")
      
        employee.timeOutEvents.push({
          type: "TimeOut",
          hour: parseInt(hour, 10),
          date: date
        })
      
        return employee
      }

      function hoursWorkedOnDate(employeeRecord, date) {
        // Find the timeInEvent and timeOutEvent for the given date
        const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
        const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
      
        // Calculate the hours worked
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      
        return hoursWorked;
      }

      function wagesEarnedOnDate(employeeRecord, date) {
        let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        let payRate = employeeRecord.payPerHour;
        return hoursWorked * payRate;
      }

      function allWagesFor(record) {
        const dates = record.timeInEvents.map((event) => event.date)
        const wages = dates.map((date) => wagesEarnedOnDate(record, date))
        return wages.reduce((total, wage) => total + wage, 0)
      }

      function calculatePayroll(employeeRecords) {
        let totalPay = 0;
        employeeRecords.forEach(record => {
          totalPay += allWagesFor(record);
        });
        return totalPay;
      }
      