import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  questions = new Array<any>()

  constructor(
    private questionService: QuestionService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response.posts
    })
  }

}
