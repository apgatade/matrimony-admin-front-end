import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  formdata: any;
  datas: any = "";
  id = "";
  town:any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = ""
    this.api.get("businesses").subscribe((result: any) => {
      // console.log(result);
      if (result.status == "success")
      this.datas = result.data;
    })

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      ownername: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      townid: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      tagline: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
      logopath: new FormControl(""),
      website: new FormControl("", Validators.compose([Validators.required])),
      accountopeningdate: new FormControl("", Validators.compose([Validators.required])),
      accountexpdate: new FormControl(""),
      status: new FormControl(false)
    })
  }

  // convert image into base64 format
  imageChanged(event: any) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result != null) {
        // console.log(reader.result.toString()) 
        this.formdata.patchValue({
          logopath: reader.result.toString().split(",").pop()
        })
      }
    }

  }

  //set town id
  townChanged(event:any){
    let ctrl = <HTMLSelectElement>(event.target)
    console.log(ctrl.value);

    this.formdata.patchValue({
      townid : ctrl.value  
    })
    
    

    
  }

  edit(id:any){
    // console.log(id);
    this.id = id;
    this.api.get("businesses/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.data.name,
        ownername: result.data.ownername,
        address: result.data.address,
        townid: result.data.townid,
        email: result.data.email,
        tagline: result.data.tagline,
        mobileno: result.data.mobileno,
        password: result.data.password,
        logopath: result.data.logopath,
        website: result.data.website,
        accountopeningdate: result.data.accountopeningdate,
        accountexpdate: result.data.accountexpdate,
        status: result.data.status
      })
    })
    
  }

  // save and edit

  submit(data: any) {

    if(this.id == ""){
      if(data.logopath == ""){
        alert("please select image");
        return;
      }
      this.api.post("businesses", data).subscribe((result: any) => {
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
      // this.api.put("businesses/"+ this.id , data ).subscribe((result:any)=>{
      //   console.log(result);
      //   this.load();
        
      // })
      this.api.put("businesses/"+ this.id , data ).subscribe((result: any) => {
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

        this.api.delete("businesses/" + id).subscribe((result: any) => {
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
