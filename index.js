// Your code here
const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (arrArrays) => {
  return arrArrays.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (employeeRecord, dateStamp){
  const [date, hour] = dateStamp.split(' ')
  // const arrFromDate = dateStamp.split(" ")
  // const date = arrFromDate[0]
  // const hour = arrFromDate[1]
  const inEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  }
  employeeRecord.timeInEvents.push(inEvent)

  return employeeRecord
}

const createTimeOutEvent = function (employeeRecord, dateStamp){
  const [date, hour] = dateStamp.split(' ')
  // const arrFromDate = dateStamp.split(" ")
  // const date = arrFromDate[0]
  // const hour = arrFromDate[1]
  const outEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }
  employeeRecord.timeOutEvents.push(outEvent)

  return employeeRecord
}

const hoursWorkedOnDate = function (employeeRecord, targetDate){
  const inEvent = employeeRecord.timeInEvents.find(inEvent => inEvent.date === targetDate)
  const outEvent = employeeRecord.timeOutEvents.find(outEvent => outEvent.date === targetDate)
  return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (employeeRecord, targetDate){
  return hoursWorkedOnDate(employeeRecord, targetDate) * employeeRecord.payPerHour
}

const allWagesFor = function (employeeRecord){
  const usableDates = employeeRecord.timeInEvents.map(function (event) {
    return event.date
  })

  const payable = usableDates.reduce (function (memo, date){
    return memo + wagesEarnedOnDate(employeeRecord, date) 
  }, 0)

  return payable
}

const calculatePayroll = function (employeeRecords){
  return employeeRecords.reduce((total, rec) => {
    return total + allWagesFor(rec)
  }, 0)
}