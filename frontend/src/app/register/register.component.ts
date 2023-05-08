import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  regSubscription!: Subscription;

  constructor(private userService: UserService, private r: Router) { }
  ngOnInit(): void {
    this.regSubscription = this.userService.authenticated.subscribe((authenticated) => {
      if (authenticated) {
        this.r.navigate(['/dashboard']);
      }
    });
  }
  onSubmit(form: NgForm) {
    this.userService.register(form.value.username, form.value.password);
  }
}
