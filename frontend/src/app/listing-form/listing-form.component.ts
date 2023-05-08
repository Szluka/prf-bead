import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ListingService } from '../listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent {
  listingForm: any;
  @Output() addListing = new EventEmitter<any>();

  constructor
    (
      private f: FormBuilder,
      private listingService: ListingService,
      private r: Router
    ) {
    this.listingForm = this.f.group({
      title: '',
      description: ''
    });
  }

  onSubmit(formData: { title: string, description: string }): void {
    this.listingService.createListing(formData).subscribe(
      (listing) => {
        this.r.navigate(['/listing/' + listing._id]);
      }
    );
    this.listingForm.reset();
  }

}
