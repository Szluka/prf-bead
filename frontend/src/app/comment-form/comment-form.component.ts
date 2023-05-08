import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  commentForm;
  @Input() listingId: string = '';
  @Output() commentAdded = new EventEmitter<Comment>();
  constructor(private f: FormBuilder, private listingService: ListingService) {
    this.commentForm = this.f.group({
      text: ''
    });
  }

  onSubmit(comment: { text?: string | null }): void {
    if (!comment) {
      return;
    }
    this.listingService.addComment(this.listingId, { text: comment.text! }).subscribe(
      (comment: any) => {
        this.commentAdded.emit(comment);
      }
    );
  }
}
