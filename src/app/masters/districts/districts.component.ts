import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  formdata: any;
  data: any;
  stateid: any;
  state: any;
  id = "";


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.stateid = this.route.snapshot.paramMap.get("stateid");
    this.api.get("states/" + this.stateid).subscribe((result: any) => {
      this.state = result.data;
    });

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = "";
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      stateid: new FormControl(this.stateid),
    })
    this.api.get("districts/" + this.stateid).subscribe((result: any) => {
      this.data = result.data
    })
  };

  edit(id: any) {
    this.id = id;
    this.api.get("districts/" + this.stateid + "/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required])),
        stateid: new FormControl(this.stateid)
      })
    });
  }

  delete(id: any) {
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("districts/" + id).subscribe((result: any) => {
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })
  };

  submit(data: any) {
    if (this.id == "") {
      this.api.post("districts/", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
        }
      });
    }
    else {
      this.api.put("districts/" + this.id, data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
        }
      });
    }
  }

  reset() {
    this.load();
  }

  back() {
    this.router.navigate(['./masters/states']);
  }

}


