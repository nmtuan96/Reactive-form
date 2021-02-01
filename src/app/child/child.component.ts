import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() childData :any
  @Output() changeEvent = new EventEmitter();
  list: any=[];
  customer:any = this.fb.group({
    id: new FormControl(''),
    name: new FormControl('',[ Validators.minLength(6), Validators.maxLength(20), Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    carrer: new FormControl(''),
    hobby: new FormControl(''),
  });
  setCus:any;
  constructor(private fb: FormBuilder) {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    
    debugger;
    if(this.childData){
      this.setCus= this.childData;
      this.customer.controls['id'].setValue(this.childData.id);
      this.customer.controls['name'].setValue(this.childData.name);
      this.customer.controls['age'].setValue(this.childData.age);
      this.customer.controls['address'].setValue(this.childData.address);
      this.customer.controls['email'].setValue(this.childData.email);
      this.customer.controls['carrer'].setValue(this.childData.carrer);
      this.customer.controls['hobby'].setValue(this.childData.hobby);
      };
    
  }

  ngOnInit(): void {
  
  }
  addCustomer(){
    if(!this.customer.value.id){
      this.customer.value.id = this.list.length+1;
      this.list.push(this.customer.value)
      this.changeEvent.emit(this.list);
      this.customer.reset();
    }else{
      for (var i in this.list) {
        if(this.list[i] == this.setCus){
          this.list[i] = this.customer.value;
        }
      }
      this.customer.reset();
    }
    
  }

}
