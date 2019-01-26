import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() queryEvent = new EventEmitter<string>();
  @Output() orderEvent = new EventEmitter<string>(); 
  @Input() orderBy;
  @Input() orderType;
  handleQuery(query: string){
    this.queryEvent.emit(query);
  }
  handleSort(orderItems) {
    this.orderBy = orderItems.orderBy;
    this.orderType = orderItems.orderType;
    this.orderEvent.emit(orderItems);
  }
  constructor() { }
  ngOnInit() {
  }
}
