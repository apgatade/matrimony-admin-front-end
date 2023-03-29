import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-religions',
  templateUrl: './religions.component.html',
  styleUrls: ['./religions.component.css']
})
export class ReligionsComponent implements OnInit {

  formdata: any;
  data: any;
  id = "";


  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.id = "";
    this.api.get("religions").subscribe((result: any) => {
      this.data = result.data
    });

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
    })
  }

  delete(_id: any) {
    this.api.delete("religions/" + _id).subscribe((result: any) => {
      this.load()
    })
  }


  edit(id: any) {
    // console.log(id);
    this.id = id;
    this.api.get("religions/" +id ).subscribe((result: any) => {
      // console.log(result.data)
      this.formdata.patchValue({
        srno: result.data.srno,
        name: result.data.name
      })
    });
  }

  submit(data: any) {

    if (this.id == "") {
      this.api.post("religions", data).subscribe((result: any) => {
        this.load()
      })
    }
    else {
      this.api.put("religions/" + this.id, data).subscribe((result: any) => {
        this.load()
      })
    }
  }
}



