import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  questions = new Array<any>()

  constructor(
    private questionService: QuestionService,
    public datepipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response.posts
    })
  }

}
