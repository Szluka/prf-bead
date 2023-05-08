import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public userService: UserService, private r: Router) {
  }
  isAuth: boolean = false;
  user: User | null = null;
  authSubscription: Subscription = new Subscription;
  userSubscription: Subscription = new Subscription;
  ngOnInit(): void {
    this.authSubscription = this.userService.authenticated.subscribe(
      (value) => this.isAuth = value
    )

    this.userSubscription = this.userService.user.subscribe(
      (value) => this.user = value
    )
  }
  logout() {
    this.userService.logout();
    this.r.navigate(["login"]);
  }
}
