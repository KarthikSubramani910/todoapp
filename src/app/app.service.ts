export class AppService{
    searchTable:boolean;
    pageSize = 5;
    studentDetail = {id:"1",name:"Sumeru",gender:"Male",std:"12",status:"Pass"}
    gender=["Male","Female"]
    studentDetails = [ {id:"1",name:"Karthik", gender:"Male",std:"12",status:"Pass"},
    {id:"2", name:"Vignesh", gender:"Male",std:"12",status:"Pass"},
    {id:"3", name:"Manish", gender:"Male",std:"10",status:"Fail"},
    {id:"4", name:"Sarvesh", gender:"Male",std:"12",status:"Pass"},
    {id:"5",name:"Gourav", gender:"Male",std:"10",status:"Fail"},
    {id:"6", name:"Miskin", gender:"Male",std:"12",status:"Pass"},
    {id:"7", name:"Shilpa", gender:"Female",std:"10",status:"Pass"},
    {id:"8", name:"Shalini", gender:"Female",std:"12",status:"Fail"}, 
    {id:"9", name:"Vignesh", gender:"Male",std:"12",status:"Pass"},
    {id:"10", name:"Manish", gender:"Male",std:"10",status:"Fail"},
    {id:"11", name:"Sarvesh", gender:"Male",std:"12",status:"Pass"},
    {id:"12",name:"Gourav", gender:"Male",std:"10",status:"Fail"}
 ]
    
    constructor(){
    }
    
    getStudentDetails(){
        return this.studentDetails.slice();
    }
    
    getStudentDetail(id){
        let studentDetail;
        let studentDetails = this.studentDetails.slice()
        console.log("index",id)
        let studentDetailsLength = studentDetails.length;
        for(let i=0;i<studentDetailsLength;i++){
            if(studentDetails[i].id == id){
                studentDetail = studentDetails[i]
            }
        }
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
        this.studentDetails.push(studentData)
    }
    
    editStudentDetail(editStudentForm,index){
        let studentDetail:any = this.getStudentDetail(index)
        studentDetail.name = editStudentForm.value.studentData.username
        studentDetail.status = editStudentForm.value.studentData.status
        studentDetail.std = editStudentForm.value.studentData.std
        studentDetail.gender = editStudentForm.value.studentData.gender
        this.highlightColor();
        return studentDetail
    }

    deleteStudentDetail(id){
        for(let i:any=0;i<this.studentDetails.length;i++){
            if(this.studentDetails[i].id===id){
                this.studentDetails.splice(i,1) 
            }
        }
        this.highlightColor();
    }

    searchStudentDetails(searchedValue){
        let studentInfo = this.getStudentDetails();
        let searchedList=[{}]; 
        for(let i=0;i<studentInfo.length;i++){
            if(searchedValue === studentInfo[i].name){
                searchedList.push(studentInfo[i]);
            }
        }
        searchedList.shift();
        return searchedList;
    }

    getSearchedStudentDataLength(searchedValue){
        let length;
        let k = this.searchStudentDetails(searchedValue).length;
        if(k<this.pageSize){
            length = 1;
        }else{
            if(k%this.pageSize===0){
                length = k/this.pageSize;
            }else{
                length = Math.ceil(k/this.pageSize)
            }
        }
        let makingArray = Array(length).fill(1).map((i)=>i);
        return makingArray;
    }

    getStudentDataLength(){
        let length;
        let k = this.studentDetails.length;
        if(k<this.pageSize){
            length = 1;
        }else{
            if(k%this.pageSize===0){
                length = k/this.pageSize;
            }else{
                length = Math.ceil(k/this.pageSize)
            }
        }
        let makingArray = Array(length).fill(1).map((i)=>i);
        return makingArray;
    }

    getPaginationDetails(pageNumber){
        let k;
        let studentDetails = this.getStudentDetails()
        let studentDetailsLength = studentDetails.length; 
        if(pageNumber === 1){
            if(studentDetailsLength < this.pageSize){
                k = studentDetails
            }else{
                k = studentDetails.slice(0,this.pageSize)
            }
        }else{
            let sum = pageNumber*this.pageSize
            if(sum>studentDetailsLength){
                let remainingItems = sum - studentDetailsLength
                k = studentDetails.slice((sum-5),(remainingItems+sum))
            }else if(sum<studentDetailsLength && sum%this.pageSize !==0){
                let remainingItems = studentDetailsLength - sum
                k = studentDetails.slice(sum,(remainingItems+sum))
            }else if(sum%this.pageSize===0 || sum === studentDetailsLength){
                k = studentDetails.slice((sum-5),sum)
            }
        }
        return k;
    }

    getSearchPaginationDetails(pageNumber,searchedValue){
        let k;
        let searchedStudentDetails = this.searchStudentDetails(searchedValue)
        let searchedStudentDetailsLength = searchedStudentDetails.length; 
        if(pageNumber === 1){
            if( searchedStudentDetailsLength < this.pageSize){
                k = searchedStudentDetails
            }else{
                k = searchedStudentDetails.slice(0,this.pageSize)
            }
        }else{
            let sum = pageNumber*this.pageSize
            if(sum>searchedStudentDetailsLength){
                let remainingItems = sum - searchedStudentDetailsLength
                k = searchedStudentDetails.slice((sum-5),(remainingItems+sum))
            }else if(sum<searchedStudentDetailsLength && sum%this.pageSize !==0){
                let remainingItems = searchedStudentDetailsLength - sum
                k = searchedStudentDetails.slice(sum,(remainingItems+sum))
            }else if(sum%this.pageSize===0 || sum === searchedStudentDetailsLength){
                k = searchedStudentDetails.slice((sum-5),sum)
            }
        }
        return k;
    }


    highlightColor(){
        let studentDetails:any = document.querySelectorAll(".highlight");
        for(let s=0;s<studentDetails.length;s++)
        {
            if(studentDetails[s].hasAttribute('style'))
            {
                studentDetails[s].removeAttribute('style');
            }
        }
        return studentDetails;
    }
    
    highlight(index){
        let studentDetails:any = this.highlightColor();
        let studentIds:any = document.querySelectorAll(".highlight .manifest");
        for(let i=0;i<studentIds.length;i++){
            if(studentIds[i].innerText == index){
                studentDetails[i].style.fontWeight="bolder"
                studentDetails[i].style.backgroundColor='#e5e2eb'
            }
        }
    }
}