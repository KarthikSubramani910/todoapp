import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class PaginationService {
  pageSize = 5;

  constructor(private appService: AppService) {}

  getStudentDataLength(searchedValue, studentDetails) {
    let calcLength;
    let detailsLength;
    detailsLength =
      searchedValue !== ''
        ? studentDetails.length
        : this.appService.searchStudentDetailsLatest(searchedValue).length;
    calcLength =
      detailsLength < this.pageSize
        ? 1
        : detailsLength % this.pageSize === 0
        ? detailsLength / this.pageSize
        : Math.ceil(detailsLength / this.pageSize);
    let makingArray = Array(calcLength)
      .fill(1)
      .map((i) => i);
    return makingArray;
  }

  getPaginationDetails(searchedValue, pageNumber?) {
    let paginationDetails;
    let sum = pageNumber * this.pageSize;
    let searchedStudentDetails = this.appService.searchStudentDetailsLatest(
      searchedValue
    );
    let searchedStudentDetailsLength = searchedStudentDetails.length;
    let remainingItemsFromSum = sum - searchedStudentDetailsLength;
    let remainingItemsFromSearch = searchedStudentDetailsLength - sum;

    paginationDetails =
      pageNumber === 1
        ? searchedStudentDetailsLength < this.pageSize
          ? searchedStudentDetails
          : searchedStudentDetails.slice(0, this.pageSize)
        : sum > searchedStudentDetailsLength
        ? searchedStudentDetails.slice(
            sum - this.pageSize,
            remainingItemsFromSum + sum
          )
        : sum < searchedStudentDetailsLength && sum % this.pageSize !== 0
        ? searchedStudentDetails.slice(sum, remainingItemsFromSearch + sum)
        : sum % this.pageSize === 0 || sum === searchedStudentDetailsLength
        ? searchedStudentDetails.slice(sum - this.pageSize, sum)
        : searchedStudentDetails.slice();
    let dataLength = this.getStudentDataLength(
      searchedValue,
      searchedStudentDetails.slice()
    );
    let studentDetails = [paginationDetails, dataLength];
    return studentDetails;
  }
}
