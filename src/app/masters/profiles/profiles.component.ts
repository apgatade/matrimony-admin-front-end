import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  
  formdata:any;
  datas:any = "";
  religions:any;
  subreligions:any;
  id:any;
  reli:any

  constructor(public api:ApiService){}

  ngOnInit(): void {
    this.load();
  }

  load(){
       this.id = "";
    this.api.get("profiles").subscribe((result:any)=>{
      console.log(result);
      console.log(result.data["name"]);
      this.datas = result.data;
    });

    this.api.get("religions").subscribe((result:any)=>{
      // console.log(result);
      this.religions = result.data;  
    })

   

    this.formdata = new FormGroup({
      name : new FormControl("",Validators.compose([Validators.required])),
     gender:new FormControl("",Validators.compose([Validators.required])),
      birthdate:new FormControl("",Validators.compose([Validators.required])),
      religionid:new FormControl("",Validators.compose([Validators.required])),
      subreligionid :new FormControl("",Validators.compose([Validators.required])),
      crossmarriage:new FormControl("",Validators.compose([Validators.required])),
      marriagestatus:new FormControl("",Validators.compose([Validators.required])),
    
    })


  }

  religionchanged(event:any){
    let ctrl = <HTMLSelectElement>(event.target).value;
    // console.log(ctrl);
    let id = ctrl;
    this.api.get("religions/subreligions/"+ id).subscribe((result:any)=>{
      // console.log(result);
     
      this.subreligions = result.data; 
      // alert(result.data)
    })
    
  }



  submit(data:any){ 
    
    if(this.id == ""){
      this.api.post("profiles", data).subscribe((result:any)=>{
        // console.log(result);
        if(result.status == "success"){
          this.load();
        }
        if(result.status == "failed"){
          alert("something went wrong")
        }
        
      })
    }
    else if(this.id !=""){
      this.api.put("profiles/" + this.id, data).subscribe((result:any)=>{
        // console.log(result);
        this.load();
        
      })
    }
    

  }

  edit(id:any){
    // console.log(id);
    this.id = id;
    this.api.get("profiles/" + id).subscribe((result:any)=>{
      // console.log(result);
      this.formdata = new FormGroup({
        name : new FormControl(result.data.name,Validators.compose([Validators.required])),
       gender:new FormControl(result.data.gender,Validators.compose([Validators.required])),
        birthdate:new FormControl(result.data.birthdate,Validators.compose([Validators.required])),
        religionid:new FormControl(result.data.religionid,Validators.compose([Validators.required])),
        subreligionid :new FormControl(result.data.subreligionid,Validators.compose([Validators.required])),
        crossmarriage:new FormControl(result.data.crossmarriage,Validators.compose([Validators.required])),
        marriagestatus:new FormControl(result.data.marriagestatus,Validators.compose([Validators.required])),
      
      })
      
    })
    

  }

  delete(id:any){
    // console.log(id);
    this.id = id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.api.delete("profiles/" + id).subscribe((result)=>{
          // console.log(result);
          this.load();
          
        })
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  reset(){
    this.load();
  }

}


