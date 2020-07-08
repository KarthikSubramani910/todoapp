import { Injectable } from "@angular/core";
import { AppService } from './app.service';

@Injectable()
export class PaginationService{
    pageSize = 5;

    constructor(private appService:AppService){
    }
    
    getStudentDataLength(searchedValue, studentDetails){
        let calcLength;
        let detailsLength
        detailsLength = searchedValue!==""?studentDetails.length:
                        this.appService.searchStudentDetailsLatest(searchedValue).length
        calcLength = detailsLength<this.pageSize?1:
                     (detailsLength%this.pageSize === 0?detailsLength/this.pageSize:
                      Math.ceil(detailsLength/this.pageSize)) 
        let makingArray = Array(calcLength).fill(1).map((i)=>i);
        return makingArray;
    }
    
    
    getPaginationDetails(pageNumber,searchedValue){
        let paginationDetails;
        let sum = pageNumber*this.pageSize
        let searchedStudentDetails = this.appService.searchStudentDetailsLatest(searchedValue)
        let searchedStudentDetailsLength = searchedStudentDetails.length; 
        let remainingItemsFromSum = sum - searchedStudentDetailsLength
        let remainingItemsFromSearch = searchedStudentDetailsLength - sum
        if(pageNumber === 1){
            paginationDetails = searchedStudentDetailsLength<this.pageSize?
            searchedStudentDetails:searchedStudentDetails.slice(0,this.pageSize)
        }else{
            paginationDetails = (sum>searchedStudentDetailsLength)?searchedStudentDetails.slice((sum-5),(remainingItemsFromSum+sum)):
                                (sum<searchedStudentDetailsLength && sum%this.pageSize !==0)?searchedStudentDetails.slice(sum,(remainingItemsFromSearch+sum)):
                                (sum%this.pageSize===0 || sum === searchedStudentDetailsLength)?searchedStudentDetails.slice((sum-5),sum):
                                searchedStudentDetails.slice(0,this.pageSize);
        }
        return paginationDetails;
    }
}