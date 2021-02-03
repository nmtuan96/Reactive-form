import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() childData :any;
  @Output() changeEvent = new EventEmitter();
  list: any=[];
  customer:any = this.fb.group({
    id: new FormControl(''),
    name: new FormControl('',[ Validators.minLength(6), Validators.maxLength(20), Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    carrer: new FormControl(''),
    hobby: new FormControl(''),
    checkB : new FormControl(false),
  });
  constrainted: boolean;
  checkbox: boolean = false;
  setCus:any;
  constructor(private fb: FormBuilder) {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.childData){
      debugger
      this.setCus= this.childData;
      this.customer.controls['id'].setValue(this.childData.id);
      this.customer.controls['name'].setValue(this.childData.name);
      this.customer.controls['age'].setValue(this.childData.age);
      this.customer.controls['address'].setValue(this.childData.address);
      this.customer.controls['carrer'].setValue(this.childData.carrer);
      this.customer.controls['hobby'].setValue(this.childData.hobby);
      this.customer.controls['checkB'].setValue(this.childData.checkB);
      this.checkbox= this.childData.checkB;
      if(this.childData.email){
        this.customer.controls['email'].setValue(this.childData.email);
      }
      };
    
  }

  ngOnInit(): void {
   this.constraintValidate();
  }
  addCustomer(){
    if(!this.customer.value.id){
      this.customer.value.id = this.list.length+1;
      this.list.push(this.customer.value);
    }else{
      for (var i in this.list) {
        if(this.list[i].id == this.setCus.id){
          this.list[i] = this.customer.value;
        }
      }
    } 
    this.changeEvent.emit(this.list);
      this.customer.reset();
      this.checkbox = false;
      
  }
  
  checkEmail(){
    var id = this.customer.value.id
    var nameCheck = this.customer.value.name;
    var ageCheck = this.customer.value.age;
    var address = this.customer.value.address;
    var career = this.customer.value.carrer;
    var hobby = this.customer.value.hobby;
    var email= this.customer.value.email;
    this.checkbox =  !this.checkbox;
    if(this.checkbox == false){
      this.customer = this.fb.group({
        id: new FormControl(id),
        name: new FormControl(nameCheck,[ Validators.minLength(6), Validators.maxLength(20), Validators.required]),
        age: new FormControl(ageCheck, [Validators.required, Validators.min(0), Validators.max(100)]),
        address: new FormControl(address, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
        carrer: new FormControl(career),
        hobby: new FormControl(hobby),
        checkB : new FormControl(false),
      });
    }else{
      this.customer = this.fb.group({
        id: new FormControl(id),
        name: new FormControl(nameCheck,[ Validators.minLength(6), Validators.maxLength(20), Validators.required]),
        age: new FormControl(ageCheck, [Validators.required, Validators.min(0), Validators.max(100)]),
        address: new FormControl(address, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
        email: new FormControl(email, [Validators.required, Validators.email]),
        carrer: new FormControl(career),
        hobby: new FormControl(hobby),
        checkB : new FormControl(true),
      });
    }
  }
  
  constraintValidate() {
    const address = this.customer.get('address');
    this.customer.get('age').valueChanges.subscribe(age=>{
      if(age > 15){
        address.setValidators([Validators.required, Validators.minLength(20) , Validators.maxLength(50)]);
        this.constrainted = true;
      } else this.constrainted = false;
    })
  }
}