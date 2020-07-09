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
  private _searchSubject: Subject<string> = new Subject();
  constructor() {}

  ngOnInit() {
    this._setSearchSubscription();
  }

  public updateSearch(searchValue: string) {
    this._searchSubject.next(searchValue);
  }
  private _setSearchSubscription() {
    this._searchSubject
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        this.setValue.emit(searchValue);
      });
  }
  ngOnDestroy() {
    this._searchSubject.unsubscribe();
  }
}
