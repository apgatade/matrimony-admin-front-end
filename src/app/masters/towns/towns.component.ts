import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.css']
})
export class TownsComponent implements OnInit {
  formdata: any;
  data:any;
  talukaid : any;
  taluka: any;
  id = "";

  constructor(private api:ApiService, private route:ActivatedRoute, private router:Router){
    this.talukaid = this.route.snapshot.paramMap.get("talukaid");
    
    this.api.get("talukas/0/" + this.talukaid).subscribe((result: any) => {
       this.taluka = result.data;
  })
  }
  ngOnInit(): void {
    this.load();
    
  }

  load() {
    this.id = "";
   this.formdata = new FormGroup({
     name: new FormControl("", Validators.compose([Validators.required])),
     talukaid: new FormControl(this.talukaid),
   })


   this.api.get("towns/" + this.talukaid).subscribe((result: any) => {
     this.data = result.data;
 })

}

edit(id: any) {
  this.id = id;
  this.api.get("towns/" + this.talukaid + "/" + id).subscribe((result: any) => {
    this.formdata = new FormGroup({
      name: new FormControl(result.data.name, Validators.compose([Validators.required])),
      talukaid: new FormControl(this.talukaid)
    })
  });
}

submit(data:any) {
  if(this.id == ""){
        this.api.post("towns" , data).subscribe((result: any) => { 
   
          if (result.status == "success") {
            this.load();
          }
        });
      }
      else{
        this.api.put("towns/" + this.id , data).subscribe((result: any) => { 
   
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
          this.api.delete("towns/" + id).subscribe((result:any)=>{
            this.load()
          })
          swal.fire(
            'Deleted!',
           
          )
        }
      }) 
    };

    back(){
      this.router.navigate(['masters/talukas/'+this.taluka.districtid])
    }

}


