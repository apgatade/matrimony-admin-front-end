import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {

  title = 'toaster-not';
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
    this.api.get("relations").subscribe((result: any) => {
      this.data = result.data
    })

    this.formdata = new FormGroup({
      srno: new FormControl("", Validators.compose([Validators.required])),
      name: new FormControl("", Validators.compose([Validators.required])),
    })
  }



  edit(id: any) {
    console.log(id);
    this.id = id;
    this.api.get("relations/" + id).subscribe((result: any) => {
      console.log(result.data)
      this.formdata.patchValue({
        srno: result.data.srno,
        name: result.data.name
      })
    })
  }


  delete(_id: any) {
    // console.log(_id);
    this.api.delete("relations/" + _id).subscribe((result: any) => {
      this.load()
    })
  }

  submit(data: any) {
    if (this.id == "") {
      this.api.post("relations", data).subscribe((data: any) => {
        this.load()
      })
    }
    else {
      this.api.put("relations/" + this.id, data).subscribe((data: any) => {
        this.load()
      })
    }
  }
}




