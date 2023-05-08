import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Listing } from './listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient, private r: Router) { }
  private refetchSub = new BehaviorSubject(null);

  get refetch() {
    return this.refetchSub.asObservable();
  }

  getAllListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  createListing(listing: { title: string, description: string }): Observable<Listing> {
    return this.http.post<Listing>('/api/listings', listing);
  }

  deleteListing(id: string): Observable<Listing> {
    return this.http.delete<Listing>(`/api/listings/${id}`);
  }

  addComment(id: string, comment: { text: string }): Observable<Listing> {
    return this.http.post<Listing>(`/api/listings/${id}/comments`, comment);
  }

  upvoteListing(id: string): Observable<Listing> {
    return this.http.put<Listing>(`/api/listings/${id}/upvote`, {});
  }

}
