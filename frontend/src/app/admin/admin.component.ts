import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listings: Observable<Listing[]> | undefined;

  constructor(
    private listingService: ListingService,
    private r: Router
  ) { }

  ngOnInit(): void {
    this.listings = this.listingService.refetch.pipe(
      switchMap(() => this.listingService.getAllListings())
    );
  }

  delete(id: string) {
    this.listingService.deleteListing(id).subscribe(
      () => {
        this.listings = this.listingService.getAllListings();
        this.r.navigate(["admin"]);
      }
    )
  }
}