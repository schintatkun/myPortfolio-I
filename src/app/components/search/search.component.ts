import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() queryEvent = new EventEmitter<string>();

  handleQuery(query: string){
    this.queryEvent.emit(query);
  }

  constructor() { }

  ngOnInit() {
  }

}
