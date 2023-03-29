import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  result: any;
  formdata: any;
  id: any;

  constructor(private api: ApiService) { }



  ngOnInit(): void {
    this.load();

  }

  load() {
    this.id = "";
    this.api.get("plans").subscribe((result: any) => {
      // console.log(result);

      this.result = result.data;

    })

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      duration: new FormControl("", Validators.compose([Validators.required])),
      amount: new FormControl("", Validators.compose([Validators.required])),
    })

  }

  edit(id: any) {
    // console.log(id);

    this.id = id;

    this.api.get("plans/" + id).subscribe((result: any) => {

      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required])),
        duration: new FormControl(result.data.duration, Validators.compose([Validators.required])),
        amount: new FormControl(result.data.amount, Validators.compose([Validators.required])),
      })


    })
  }

  delete(id: any) {
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
    }).then((result) => {
      if (result.value) {
        this.api.delete("plans/" + id).subscribe((result: any) => {
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
          title: 'Signed in successfully'
        })

      }
    })
  }

  submit(data: any) {
    // console.log(data);

    if (this.id == "") {
      this.api.post("plans", data).subscribe((result: any) => {
        // console.log(result);
        if (result.status == "success") {
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
    else if (this.id != "") {
      this.api.put("plans/" + this.id, data).subscribe((result: any) => {
        // console.log(result);
        this.load()

      })
    }

  }

  reset() {
    this.load();
  }
}


