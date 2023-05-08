import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Listing } from '../listing';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {
  id: string | null = null;
  listing: Observable<Listing> | undefined;
  listingSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  user: User | null = null;

  constructor(
    private r: ActivatedRoute,
    public listingService: ListingService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.r.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.listing = this.listingService.getListingById(this.id!);
    this.listingSubscription = this.listingService.refetch.subscribe(() => {
      this.listing = this.listingService.getListingById(this.id!);
    });
    this.userSubscription = this.userService.user.subscribe(
      (value) => {
        console.log(`[listing detail] User changed: ${JSON.stringify(value)}`);
        this.user = value
      }
    );
  }

  delete(id: string): void {
    this.listingService.deleteListing(id).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  upvote(id: string): void {
    this.listingService.upvoteListing(id).subscribe(() => {
      this.listing = this.listingService.getListingById(this.id!);
    });
  }
}
