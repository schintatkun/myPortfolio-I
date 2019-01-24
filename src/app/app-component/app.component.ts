import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { without } from 'lodash';

library.add(faTimes, faPlus);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  theList: object[];
  modifiedList: object[];
  orderBy: string;
  orderType: string;
  lastIndex: number;


  deleteApt(theApt: object){
    this.theList = without(this.theList, theApt);
    this.modifiedList = without(this.theList, theApt);
  }
  addApt(theApt: any){
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    //unshift is JS function pushing at the begining of array
    this.modifiedList.unshift(theApt);
    this.lastIndex++;
  }
  searchApt(theQuery:string){
    this.modifiedList= this.theList.filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(theQuery.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(theQuery.toLowerCase())
      );
    });
  }

  sortItems(){
    let order: number;
    if(this.orderType ==='asc') {
      order = 1;
    }
    else{
      order = -1;
    }

    this.modifiedList.sort((a,b) => {
      if (a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()){
        return -1*order;
      }
      if (a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()) {
        return 1*order;
      }
    })
  }

  orderApt(orderObj){
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;
    this.sortItems();
  }

  constructor (private http: HttpClient) {
    this.orderBy = 'petName';
    this.orderType = 'asc';
  }

  ngOnInit():void{
      this.lastIndex = 0;  
      this.http.get<Object[]>('../assets/data.json').subscribe(data => {
      console.log("Recieving Data =>"+data);
      this.theList = data.map((item:any) => {
        item.aptId = this.lastIndex++;
        return item;
      });
      this.modifiedList = data;
      this.sortItems();
    });
  }

}