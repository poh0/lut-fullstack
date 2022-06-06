import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() questionId = ""
  
  body: string = ""
  preview: boolean = false

  constructor(
    private authService: AuthService,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

  onCommentSubmit() {

    const commentBody = this.body

    if (!this.loggedIn()) {
      this.toastr.error("Please login", "Error")
      return false
    }

    // required fields
    if (!commentBody || !this.questionId) {
      this.toastr.error("Please add all fields", "Error")
      return false
    }

    this.questionService.postComment(commentBody, this.questionId).subscribe(
      {
        next: (data) => {
          if (data.success) {
            this.toastr.success("Comment posted successfully", "Success")
            this.ngOnInit()

            // TEMPORARY:
            window.location.reload()
          } 
        }
        ,error: (err) => {
          console.log(err)
          this.toastr.error(`Something went wrong: ${err.error}`, "Error")
        }
      })

    return true
  } 
}
