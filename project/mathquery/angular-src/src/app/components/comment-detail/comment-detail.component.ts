import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {

  @Input() comment: any

  constructor() { }

  ngOnInit(): void {
  }

}
