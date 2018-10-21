import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatOption } from '@angular/material';


export interface BaseballStats{
  FirstName: string; LastName: string; G: string; AB: string; R: string; H: string; B2: string; 
  B3: string; HR: string; RBI: string; BB: string; HBP: string; SAC: string; 
  K: string; SB: string; PB: string; CS: string; AVG: string; OBP: string; SLG: string;

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
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

  sampleBsBll = [{"player_id":247,"firstName":"Phil","lastName":"Acosta","numGames":13,"atBats":51,"singles":14,"doubles":2,"triples":0,"homeRuns":0,"walks":10,"hitByPitch":1,"sacrifices":0,"runs":10,"rbis":7,"stolenBases":4,"passedBalls":5,"caughtStealing":2,"strikeOuts":6,"battingAverage":0.275,"onBasePercentage":0.403,"sluggingAverage":0.353}
  ,{"player_id":201,"firstName":"Jason","lastName":"Bolding","numGames":9,"atBats":40,"singles":8,"doubles":3,"triples":0,"homeRuns":0,"walks":2,"hitByPitch":0,"sacrifices":0,"runs":10,"rbis":13,"stolenBases":3,"passedBalls":1,"caughtStealing":0,"strikeOuts":7,"battingAverage":0.2,"onBasePercentage":0.238,"sluggingAverage":0.35}
  ,{"player_id":163,"firstName":"Ryan","lastName":"Elliott","numGames":10,"atBats":44,"singles":14,"doubles":5,"triples":0,"homeRuns":0,"walks":2,"hitByPitch":2,"sacrifices":0,"runs":15,"rbis":10,"stolenBases":0,"passedBalls":2,"caughtStealing":1,"strikeOuts":2,"battingAverage":0.318,"onBasePercentage":0.375,"sluggingAverage":0.545}
  ,{"player_id":252,"firstName":"Lee","lastName":"Ellis","numGames":1,"atBats":2,"singles":0,"doubles":0,"triples":0,"homeRuns":0,"walks":3,"hitByPitch":0,"sacrifices":0,"runs":1,"rbis":0,"stolenBases":0,"passedBalls":0,"caughtStealing":0,"strikeOuts":1,"battingAverage":0.0,"onBasePercentage":0.6,"sluggingAverage":0.0},
  {"player_id":246,"firstName":"Al","lastName":"Garcia","numGames":2,"atBats":7,"singles":1,"doubles":0,"triples":0,"homeRuns":0,"walks":0,"hitByPitch":2,"sacrifices":0,"runs":1,"rbis":3,"stolenBases":0,"passedBalls":0,"caughtStealing":0,"strikeOuts":3,"battingAverage":0.143,"onBasePercentage":0.333,"sluggingAverage":0.143}];

  selectedValue: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  posts$: Object;
  batting = new MatTableDataSource(this.sampleBsBll);
  pitching;
  dropDown;
  careerBattingColumns: string[] = ['Name', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'HBP', 'SAC', 'K', 'SB', 'PB', 'CS', 'AVG', 'OBP', 'SLG'];
  statTest: string[] = ['Name', 'G', 'AB', 'R'];
  careerPitchingColumns: string[] = ['Name', 'G', 'W', 'L', 'T', 'S', 'IP', 'ER', 'R', 'K', 'BB', 'HBP', 'H', 'WP', 'SB', 'PO', 'ERA', 'WHIP' ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selected = "";
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getStatsBySeason(0).subscribe(
      data => {this.posts$ = data; 
        this.dropDown = this.posts$[0];
       // this.dataSource = new MatTableDataSource(data);
      //  this.batting = new MatTableDataSource(this.sampleBsBll);
       //this.pitching = new MatTableDataSource(this.posts$[2]);
      
      //  this.pitching.sort = this.sort;
       //console.log("testPost: " + this.testPost);
        }
    );
    this.batting.sort = this.sort;
  }
  
  

  callBack(id){
    console.log("call back " + id);
    this.data.getStatsBySeason(id).subscribe(
      data => {this.posts$ = data; 
        // this.dataSource = new MatTableDataSource(data);
      
       this.batting = new MatTableDataSource(this.posts$[1]);
      //  this.pitching = new MatTableDataSource(this.posts$[2]);
        //console.log("testPost: " + this.testPost);
         }
    );
    this.batting.sort = this.sort;
   // this.pitching.sort = this.sort;
  }
}

