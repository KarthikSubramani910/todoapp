import {studentDetails} from "../assets/model/localstorage"

export class AppService{
    studentDetailsService = studentDetails

    constructor(){
    }
    
    getStudentDetails(){
        return this.studentDetailsService.slice();
    }
    
    getStudentDetail(id){
        let studentDetail = this.studentDetailsService.filter(student => {
            return student.id==id
        }).shift();
        return studentDetail
    }
    
    addStudentDetail(addStudentForm){
        let studentData={
            id:"2",
            name:"Sumeru",
            std:"5",
            status:"Pass",
            gender:"Male"
        }
        studentData.name = addStudentForm.value.studentData.username;
        studentData.std = addStudentForm.value.studentData.std;
        studentData.status = addStudentForm.value.studentData.status;
        studentData.id = Math.floor(Math.random() * 100).toString();
        studentData.gender = addStudentForm.value.studentData.gender
        this.studentDetailsService.push(studentData)
    }
    
    editStudentDetail(editStudentForm,index){
        let studentDetail:any = this.getStudentDetail(index)
        studentDetail.name = editStudentForm.value.studentData.username
        studentDetail.status = editStudentForm.value.studentData.status
        studentDetail.std = editStudentForm.value.studentData.std
        studentDetail.gender = editStudentForm.value.studentData.gender
        return studentDetail
    }
    
    deleteStudentDetail(id){
        this.studentDetailsService = this.studentDetailsService.filter(student=>{return student.id != id})
    }
    
    searchStudentDetailsLatest(searchValue){
        let studentInfo = this.getStudentDetails().slice();
        let studentDetails =  (searchValue === ""?studentInfo:studentInfo.filter(i=>i.name === searchValue));
        return studentDetails;
    }
}