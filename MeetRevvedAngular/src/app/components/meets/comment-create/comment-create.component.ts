import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from 'src/app/services/meet.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
})
export class CommentCreateComponent implements OnInit {
  form!: FormGroup;
  meetId!: number;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private meetService: MeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetId = Number(this.route.snapshot.paramMap.get('meetId'));
    this.form = this.fb.group({
      commentBody: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const { commentBody } = this.form.value;
    this.meetService.addComment(this.meetId, commentBody).subscribe({
      next: () => this.router.navigate(['/meets', this.meetId, 'comments']),
      error: () => {
        this.error = 'Failed to post comment. Please try again.';
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meets', this.meetId, 'comments']);
  }
}
