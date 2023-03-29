import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-businesspayments',
  templateUrl: './businesspayments.component.html',
  styleUrls: ['./businesspayments.component.css']
})
export class BusinesspaymentsComponent {
  formdata: any;
  datas: any = "";
  id = "";
  business:any;
  plan:any;
 

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = "";
    this.api.get("businesspay").subscribe((result: any) => {
     
      
      // console.log(result);
      this.datas = result.data;
    });

    this.api.get("businesses").subscribe((result: any) => {
      // console.log(result);
      this.business = result.data;
      this.plan = result.data;
    })


    this.api.get("plans").subscribe((result: any) => {
      // console.log(result);
      this.plan = result.data;
    });
  
    



    this.formdata = new FormGroup({
      businessid: new FormControl("", Validators.compose([Validators.required])),
      planid: new FormControl("", Validators.compose([Validators.required])),
      paymentdate: new FormControl("", Validators.compose([Validators.required])),
      amount: new FormControl("", Validators.compose([Validators.required])),
      paymentmethod: new FormControl("", Validators.compose([Validators.required]))
      
       })
  }



  
  




edit(id:any){
    // console.log(id);
    this.id = id;
    this.api.get("businesspay/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        businessid: result.data.businessid,
        planid: result.data.planid,
        paymentdate: result.data.paymentdate,
        amount: result.data.amount,
        paymentmethod: result.data.paymentmethod,
    
      })
    })
    
  }

  // save and edit

  submit(data: any) {
    if(this.id == ""){
      this.api.post("businesspay", data).subscribe((result: any) => {
        console.log(result);
        if (result.status == "success") {
          this.load();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 700,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Add successfully'
          })

        }
        if (result.status == "failed") {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        }
  
      })
    }

    if(this.id != ""){
      // this.api.put("businesspay/"+ this.id , data ).subscribe((result:any)=>{
      //   console.log(result);
      //   this.load();
        
      // })
      this.api.put("businesspay/"+ this.id , data ).subscribe((result: any) => {
        // console.log(result);
        if (result.status == "success") {
          this.load();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 700,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Update successfully'
          })

        }
        if (result.status == "failed") {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        }
  
      })
    }

  }

  //Delete

  delete(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.delete("businesspay/" + id).subscribe((result: any) => {
          this.load();
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 700,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Delete successfully'
        })
      }
    })

  }

  reset() {
    this.load();

  }

}



