import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  //bring thing from another component
  @Input() appointmentList;

  //when user click, then create event and pass event to parent component. 
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  handleDelete(theApt: object){
    // console.log(theApt);
    this.deleteEvent.emit(theApt);
  }
  handleUpdate(theApt: object, lableName: string, newValue: string){
    this.updateEvent.emit({
      theApt: theApt,
      labelName: lableName,
      newValue: newValue
    });
  }
}
