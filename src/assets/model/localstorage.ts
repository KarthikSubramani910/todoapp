// AppService
export let studentDetails = [
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
export let genderArr = ['Male', 'Female'];
export let statusArr = ['Pass', 'Fail'];
export let stdArr = ['8', '9', '10', '11', '12'];

//Global
export interface studentInfo {
  id: string;
  name: string;
  std: string;
  status: string;
  gender: string;
}
