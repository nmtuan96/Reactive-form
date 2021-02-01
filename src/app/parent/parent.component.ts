import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  list: any =[];
  constructor() { }

  ngOnInit(): void {
  }
  receiveData($event){
    this.list = $event
  }
  removeCustomer(i){
    this.list.splice(i,1);
  }

  parentData:any;
  editCustomer(i){
    debugger
    var data = this.list.find(e => e.id == i);
    this.parentData = data
  }
  
}
