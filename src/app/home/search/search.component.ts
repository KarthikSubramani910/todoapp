import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() setValue: EventEmitter<string> = new EventEmitter();
  private searchSubject: Subject<string> = new Subject();
  constructor() {}

  ngOnInit() {
    this.setSearchSubscription();
  }

  public updateSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  private setSearchSubscription() {
    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        this.setValue.emit(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }
}
