import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  title: string = ""
  body: string = ""

  constructor(
    private questionService: QuestionService,
    private validateService: ValidateService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onQuestionSubmit() {

    const question = {
      title: this.title,
      body: this.body
    }

    if (!this.authService.loggedIn()) {
      this.toastr.error("Please login", "Error")
      return false
    }

    // required fields
    if (!this.validateService.validateQuestion(question)) {
      this.toastr.error("Please add all fields", "Error")
      return false
    }

    this.questionService.postQuestion(question).subscribe(
      {
        next: (data) => {
          if (data.success) {
            this.toastr.success("Question posted successfully", "Success")
            this.router.navigate([`question/${data._id}`])
          } 
        }
        ,error: (err) => {
          this.toastr.error(`Something went wrong: ${err.error.msg}`, "Error")
          this.router.navigate(['/ask'])
        }
      })

    return true
  } 
}
