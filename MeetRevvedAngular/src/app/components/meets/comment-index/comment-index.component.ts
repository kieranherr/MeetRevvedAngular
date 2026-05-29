import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-index',
  templateUrl: './comment-index.component.html',
})
export class CommentIndexComponent implements OnInit {
  comments: Comment[] = [];
  meetId!: number;
  loading = true;
  error: string | null = null;

  constructor(
    private meetService: MeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.meetService.getComments(this.meetId).subscribe({
      next: comments => {
        this.comments = comments;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load comments.';
        this.loading = false;
      }
    });
  }

  addComment(): void {
    this.router.navigate(['/meets', this.meetId, 'comments', 'create']);
  }

  goBack(): void {
    this.router.navigate(['/meets', this.meetId]);
  }
}
