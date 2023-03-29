import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-subreligions',
  templateUrl: './subreligions.component.html',
  styleUrls: ['./subreligions.component.css']
})
export class SubreligionsComponent implements OnInit {

  formdata: any;
  data: any;
  id = "";
  religionid: any;
  religion: any
  result: any;


  constructor(private api: ApiService, private route: ActivatedRoute , private router:Router) {
    this.religionid = this.route.snapshot.paramMap.get("religionid");
    this.api.get("religions/" + this.religionid).subscribe((result: any) => {
      this.religion = result.data;
    })
  }
  ngOnInit(): void {

    this.load()

  }

  submit(data: any) {
    if (this.id == "") {
      this.api.post("religions/subreligions", data).subscribe((result: any) => {
        this.load();
      })
    } else {
      this.api.put("religions/subreligions" + this.id, data).subscribe((result: any) => {
        this.load();
      })

    }

  };


  edit(id: any) {
    console.log(id);
    this.id = id;
    this.api.get("religions/subreligions/" + this.religionid + id).subscribe((result: any) => {
      // console.log(result.data)
      this.formdata.patchValue({
        name: result.data.name
      })
    })
  }

  delete(id: any) {
    this.api.delete("religions/subreligions/" + id).subscribe((result: any) => {
      this.load()
    })
  }

  load() {
    this.id = "";
    this.api.get("religions/subreligions/" + this.religionid).subscribe((result: any) => {
      // console.log(result);
      this.data = result.data;
    });

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      religionid: new FormControl(this.religionid)
    })


    this.api.get("religions/subreligons" + this.religionid).subscribe((result: any) => {
      this.result = result.data;
    });
  };


  back() {
    this.router.navigate(['./masters/religions']);
  }

}

