import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata: any;
  message = "";
  // variable
  show_button: Boolean = false;
  show_eye: Boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  //Function
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  load() {
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  submit(data: any) {
    this.api.post("login", data).subscribe((result: any) => {
      if (result.status == "failed") {
        this.message = result.data;
      }
      if (result.status == "success") {
        localStorage.setItem("user", JSON.stringify(result.data));
        this.router.navigate(['/general'])
      }
    })

  }

}
