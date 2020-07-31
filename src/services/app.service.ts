import { studentDetails, studentInfo } from '../assets/model/localstorage';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export class AppService {
  studentDetailsService = studentDetails;

  constructor() {}

  getStudentDetails() {
    return this.studentDetailsService.slice();
  }

  getStudentDetail(id) {
    let studentDetail = this.studentDetailsService
      .filter((student) => {
        return student.id == id;
      })
      .shift();
    return studentDetail;
  }

  addStudentDetail(addStudentForm) {
    let studentData: studentInfo;
    let createStudent = of(addStudentForm)
      .pipe(
        map((i) => {
          return i.value.studentData;
        })
      )
      .subscribe((x) => (studentData = x));
    studentData.id = Math.floor(Math.random() * 100).toString();
    this.studentDetailsService.unshift(studentData);
    createStudent.unsubscribe();
  }

  editStudentDetail(editStudentForm, index) {
    let studentDetail: studentInfo = this.getStudentDetail(index);
    studentDetail.name = editStudentForm.value.studentData.name;
    studentDetail.status = editStudentForm.value.studentData.status;
    studentDetail.std = editStudentForm.value.studentData.std;
    studentDetail.gender = editStudentForm.value.studentData.gender;
    return studentDetail;
  }

  deleteStudentDetail(id) {
    this.studentDetailsService = this.studentDetailsService.filter(
      (student) => {
        return student.id != id;
      }
    );
  }

  searchStudentDetailsLatest(searchValue) {
    let studentInfo = this.getStudentDetails().slice();
    let studentDetails =
      searchValue === ''
        ? studentInfo
        : studentInfo.filter((i) => {
            return i.name === searchValue;
          });
    return studentDetails;
  }

  removeHighlight() {
    let highlight = document.querySelector('.highlight');
    highlight.classList.length == 1
      ? highlight.classList.remove('highlight')
      : '';
  }
}
