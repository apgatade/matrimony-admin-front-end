import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-profilebusinessplans',
  templateUrl: './profilebusinessplans.component.html',
  styleUrls: ['./profilebusinessplans.component.css']
})
export class ProfilebusinessplansComponent implements OnInit{

  businessid:any;
  profileid:any;
  datas:any;
  formdata:any;
  id:any=0;


  constructor(private api:ApiService, private route:ActivatedRoute){
  //  this.profileid = this.route.snapshot.paramMap.get("profileid");
  //  this.api.get("profile").subscribe((result:any)=>{

  // });
 }
  ngOnInit(): void {
     this.api.get("profiles").subscribe((result:any)=>{

      this.profileid = result.data;
    })
    this.api.get("businesses").subscribe((result:any)=>{
      console.log(result.data);

      this.businessid = result.data;
    })

    this.load();
  }

  load() {
    this.api.get("profilebusinessplan").subscribe((result:any)=>{
      // console.log(result.data)
      this.datas =result.data;
    });
  this.formdata = new FormGroup({
      businessid: new FormControl("", Validators.compose([Validators.required])),
      profileid: new FormControl("", Validators.compose([Validators.required])),
      amount: new FormControl("", Validators.compose([Validators.required])),
      activatedate: new FormControl("", Validators.compose([Validators.required])),
      expirydate: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(false, Validators.compose([Validators.required])),

    })
  }
  submit(data:any){
     if(this.id == ""){
      this.api.post("profilebusinessplan", data).subscribe((result:any)=>{
        this.load();
      })
    }
      else{
        this.api.put("profilebusinessplan/"+this.id, data).subscribe((result:any)=>{
          this.load();
        })
    }

  }
  edit(id:any){
    this.id = id;
     this.api.get("profilebusinessplan/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        businessid: new FormControl(result.data.businessid, Validators.compose([Validators.required])),
        profileid: new FormControl(result.data.profileid, Validators.compose([Validators.required])),
        amount: new FormControl(result.data.amount, Validators.compose([Validators.required])),
        activatedate: new FormControl(result.data.activatedate, Validators.compose([Validators.required])),
        expirydate: new FormControl(result.data.expirydate, Validators.compose([Validators.required])),
        status: new FormControl(result.data.status, Validators.compose([Validators.required])),
      })
    })
  }
  reset(){}

   delete(id:any){
    this.api.delete("profilebusinessplan/"+ id).subscribe((result:any)=>{
      console.log(result);
      this.load()
    })
   }
}


