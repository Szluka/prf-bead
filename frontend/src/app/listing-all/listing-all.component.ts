import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listing-all',
  templateUrl: './listing-all.component.html',
  styleUrls: ['./listing-all.component.css']
})
export class ListingAllComponent implements OnInit {
  listings: Observable<Listing[]> | undefined;

  constructor(
    private listingService: ListingService,
  ) { }

  ngOnInit(): void {
    this.listings = this.listingService.refetch.pipe(
      switchMap(() => this.listingService.getAllListings())
    );
  }
}
