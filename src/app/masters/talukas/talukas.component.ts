import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-talukas',
  templateUrl: './talukas.component.html',
  styleUrls: ['./talukas.component.css']
})
export class TalukasComponent implements OnInit {
  formdata: any;
  districtid : any;
  data:any;
  district: any;
  id = "";

  constructor(private api:ApiService, private route:ActivatedRoute, private router:Router){
    this.districtid = this.route.snapshot.paramMap.get("districtid");
    this.api.get("districts/0/" + this.districtid).subscribe((result: any) => {
      this.district = result.data;
    });
  }

  ngOnInit(): void {
    this.load();
    
  };

  load() {
     this.id = "";
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      districtid: new FormControl(this.districtid),
    })


    this.api.get("talukas/" + this.districtid).subscribe((result: any) => {
     console.log(result); 
      this.data = result.data
  })
    
  };

  submit(data:any) {
    if(this.id == ""){
          this.api.post("talukas", data).subscribe((result: any) => { 
            if (result.status == "success") {
              this.load();
            }
          });
        }
        else{
          this.api.put("talukas/" + this.id, data).subscribe((result: any) => { 
            if (result.status == "success") {
              this.load();
            }
          });
        }
      }

      reset(){
        this.load();
      };

      delete(id:any){
        swal.fire({
          title: 'Are you sure?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.api.delete("talukas/" + id).subscribe((result:any)=>{
              this.load()
            })
            swal.fire(
              'Deleted!',
             
            )
          }
        }) 
      }

      edit(id: any) {
        this.id = id;
        this.api.get("talukas/" + this.districtid + "/" + id).subscribe((result: any) => {
          this.formdata = new FormGroup({
            name: new FormControl(result.data.name, Validators.compose([Validators.required])),
            districtid: new FormControl(this.districtid)
          })
        });
      }

      back(){
        this.router.navigate(['./masters/districts/' + this.district.stateid]);
      }
    
}
