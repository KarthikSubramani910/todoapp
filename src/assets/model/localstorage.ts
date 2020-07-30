// AppService
let studentDetails = [
  { id: '1', name: 'Karthik', gender: 'Male', std: '12', status: 'Pass' },
  { id: '2', name: 'Vignesh', gender: 'Male', std: '12', status: 'Pass' },
  { id: '3', name: 'Manish', gender: 'Male', std: '10', status: 'Fail' },
  { id: '4', name: 'Sarvesh', gender: 'Male', std: '12', status: 'Pass' },
  { id: '5', name: 'Gourav', gender: 'Male', std: '10', status: 'Fail' },
  { id: '6', name: 'Vinay', gender: 'Male', std: '12', status: 'Pass' },
  { id: '7', name: 'Saravanan', gender: 'Male', std: '10', status: 'Fail' },
  { id: '8', name: 'Sunil', gender: 'Male', std: '12', status: 'Pass' },
  { id: '9', name: 'Rajesh', gender: 'Male', std: '10', status: 'Fail' },
];

//HomeModule
let genderArr = ['Male', 'Female'];
let statusArr = ['Pass', 'Fail'];
let stdArr = ['8', '9', '10', '11', '12'];

//Global
interface studentInfo {
  id: string;
  name: string;
  gender: string;
  std: string;
  status: string;
}

export { studentDetails, genderArr, statusArr, stdArr, studentInfo };
