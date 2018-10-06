import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';




export interface LastThree {
  opponent: string;
  score: string;
}

const LAST3_DATA: LastThree[] = [
  { opponent: 'at Dodos', score: '5-3' },
  { opponent: 'vs Smokies', score: '1-0' },
  { opponent: 'vs Bats', score: '6-8' },

];



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],

  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})



export class PostsComponent implements OnInit {

  posts$: Object;

  last3Columns: string[] = ['opponent', 'score'];
  dataLast3 = LAST3_DATA;
  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getPosts().subscribe(
      data => this.posts$ = data
    );
  }

}
