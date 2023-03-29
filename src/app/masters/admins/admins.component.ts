import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  formdata:any;
  datas:any;
  id:any;
  user:any


  constructor(private api:ApiService){}


 ngOnInit(): void {

   this.load();

 }


 load(){

   this.id = "";
  this.api.get("admins").subscribe((result:any)=>{
   this.datas = result.data;
  })

  this.formdata = new FormGroup({
   name : new FormControl("",Validators.compose([Validators.required])),
   username:new FormControl("",Validators.compose([Validators.required])),
   email:new FormControl("",Validators.compose([Validators.required,Validators.email])),
   mobileno:new FormControl("",Validators.compose([Validators.required])),
   password:new FormControl("",Validators.compose([Validators.required])),
   usertype:new FormControl("",Validators.compose([Validators.required]))

 })


 }

 edit(id:any){
   // console.log(id);
   this.id = id;

   this.api.get("admins/" + id).subscribe((result:any)=>{
     // console.log(result);

  this.formdata = new FormGroup({
   name : new FormControl(result.data.name,Validators.compose([Validators.required])),
   username:new FormControl(result.data.username,Validators.compose([Validators.required])),
   email:new FormControl(result.data.email,Validators.compose([Validators.required,Validators.email])),
   mobileno:new FormControl(result.data.mobileno,Validators.compose([Validators.required])),
   password:new FormControl(result.data.password,Validators.compose([Validators.required])),
   usertype:new FormControl(result.data.usertype,Validators.compose([Validators.required]))

 })

   })

 }

 UserTypeChanged(event:any){
   let ctrl = <HTMLSelectElement>(event.target)
   console.log(ctrl.value);

   this.formdata.patchValue({
     usertype: ctrl.value
   })



 }

 delete(id:any){
   // console.log(id);
   this.id = id;
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   })

   swalWithBootstrapButtons.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'No, cancel!',
     reverseButtons: true
   }).then((result)=>{
     if(result.value){
       this.api.delete("admins/" + id).subscribe((result:any)=>{
         this.load();
       })

       const Toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: true,
         didOpen: (toast) => {
           toast.addEventListener('mouseenter', Swal.stopTimer)
           toast.addEventListener('mouseleave', Swal.resumeTimer)
         }
       })

       Toast.fire({
         icon: 'success',
         title: 'Delete in successfully'
       })

     }



   })


 }

 submit(data:any){
   // console.log(data);
   if(this.id == ""){
     this.api.post("admins",data).subscribe((result:any)=>{
       // console.log(result);
       if(result.status == "success"){
         this.load();

         const Toast = Swal.mixin({
           toast: true,
           position: 'top-end',
           showConfirmButton: false,
           timer: 3000,
           timerProgressBar: true,
           didOpen: (toast) => {
             toast.addEventListener('mouseenter', Swal.stopTimer)
             toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
         })

         Toast.fire({
           icon: 'success',
           title: 'Signed in successfully'
         })
       }
       else {
         alert("Something went wrong")
       }

     })
   }
   else if(this.id != ""){
     this.api.put("admins/"+ this.id,data).subscribe((result:any)=>{
       console.log(result);
       this.load()

     })

   }



 }

}




