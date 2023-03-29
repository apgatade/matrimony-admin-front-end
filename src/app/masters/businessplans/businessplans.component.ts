import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-businessplans',
  templateUrl: './businessplans.component.html',
  styleUrls: ['./businessplans.component.css']
})
export class BusinessplansComponent implements OnInit{

    formdata:any;
    datas:any = "";
    id = "";
  
    constructor(private api:ApiService){}
  
    ngOnInit(): void {
      this.load();
    }
  
    load(){
      this.id = "";
  
      this.api.get("businessplans").subscribe((result:any)=>{
        this.datas = result.data;
      })
  
      this.formdata = new FormGroup({
        planname : new FormControl("",Validators.compose([Validators.required])),
        amount:new FormControl("",Validators.compose([Validators.required])),
        duration:new FormControl(""),
        profileviews:new FormControl("",Validators.compose([Validators.required]))
      })
  
    }
  
  
    reset(){
      this.load();
    }
  
    edit(id:any){
      this.id = id;
      this.api.get("businessplans/" + id).subscribe((result:any)=>{
        this.formdata.patchValue({
          planname : result.data.planname,
          amount: result.data.amount,
          duration:result.data.duration,
          profileviews:result.data.profileviews
        })
      })
    }
  
  
    delete(_id:any){
  
      Swal.fire({
        title:"Sure to delete",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        timer: 3500,
        timerProgressBar: true,
        showCancelButton: true,
        confirmButtonText: "Yes , delete it!",
        cancelButtonText: "No,Keep It!"
      }).then((result) => {
        if(result.value){
  
          this.api.delete("businessplans/" + _id).subscribe((result:any)=>{
            this.load();
          })
  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'warning',
            title: 'Deleted successfully'
          })
        }
      })
  
    }
  
  
    submit(data:any){
      if(this.id == ""){
        this.api.post("businessplans" ,data).subscribe((result:any)=>{
          this.load();
  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            // didOpen: (toast) => {
            //   toast.addEventListener('mouseenter', Swal.stopTimer)
            //   toast.addEventListener('mouseleave', Swal.resumeTimer)
            // }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
      }
      else{
        this.api.put("businessplans/" + this.id,data).subscribe((result:any)=>{
          this.load();
        })
      }
  
    }
  
  }