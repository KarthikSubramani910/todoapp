import { Injectable } from "@angular/core";
import { AppService } from './app.service';

@Injectable()
export class PaginationService{
    pageSize = 5;
    constructor(private appService:AppService){

    }
    getSearchedStudentDataLength(searchedValue){
        let length;
        let k = this.appService.searchStudentDetails(searchedValue).length;
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
        let k = this.appService.studentDetails.length;
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
        let studentDetails = this.appService.getStudentDetails()
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
        let searchedStudentDetails = this.appService.searchStudentDetails(searchedValue)
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
}