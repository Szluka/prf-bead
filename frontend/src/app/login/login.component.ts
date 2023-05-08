import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string='';
  password: string='';

  loginSubscription!: Subscription;

  constructor(private userService: UserService, private r: Router) { }
  ngOnInit(): void {
    this.loginSubscription = this.userService.authenticated.subscribe((authenticated) => {
      if (authenticated) {
        console.log("authenticated");
        this.r.navigate(['/dashboard']);
      }
    });
  }
  onSubmit(form: NgForm) {
    this.userService.login(form.value.username, form.value.password);
  }
}
