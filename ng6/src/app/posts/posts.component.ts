import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatOption } from '@angular/material';



export interface Food {
  value: string;
  viewValue: string;
}

export interface LastThree {
  opponent: string;
  score: string;
}

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

const LAST3_DATA: LastThree[] = [
  { opponent: 'at Dodos', score: '5-3' },
  { opponent: 'vs Smokies', score: '1-0' },
  { opponent: 'vs Bats', score: '6-8' },

];


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

  selectedValue: string;
  public foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  posts$: Object;
  careerBattingColumns: string[] = ['Name', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'HBP', 'SAC', 'K', 'SB', 'PB', 'CS', 'AVG', 'OBP', 'SLG'];
  careerPitchingColumns: string[] = ['Name', 'G', 'W', 'L', 'T', 'S', 'IP', 'ER', 'R', 'K', 'BB', 'HBP', 'H', 'WP', 'SB', 'PO', 'ERA', 'WHIP' ];

  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  datasource = null;
  bsBllSts: BaseballStats[];
  selected = "";
  @ViewChild(MatSort) sort: MatSort;

  last3Columns: string[] = ['opponent', 'score'];
  dataLast3 = LAST3_DATA;
  constructor(private data: DataService) { }

  // ngOnInit() {
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {

    this.data.getStatsBySeason(0).subscribe(
      data => this.posts$ = data
      /*
       this.data.getStatsBySeason(0).subscribe(
        function(data) {
        this.posts$ = data;
        this.dataSource = new MatTableDataSource(this.posts$);
      }
      */
    );
     
    //console.log("posts$: " + this.posts$);

    // for(let i=0; i < this.posts$[0].length; i++){
    //   var stateLine = <BaseballStats>{};
    //  // declare const stateLine: BaseballStats;
    //   stateLine.FirstName = this.posts$[0][i].firstName;
    //   stateLine.LastName = this.posts$[0][i].lastName;
    //   stateLine.G = this.posts$[0][i].games;
    //   stateLine.AB = this.posts$[0][i].atBats;
    //   stateLine.R = this.posts$[0][i].runs;
    //   stateLine.H = this.posts$[0][i].singles;
    //   stateLine.B2 = this.posts$[0][i].doubles;
    //   stateLine.B3 = this.posts$[0][i].triples;
    //   stateLine.HR = this.posts$[0][i].homeRuns;
    //   stateLine.RBI = this.posts$[0][i].rbis;
    //   stateLine.BB = this.posts$[0][i].walks;
    //   stateLine.HBP = this.posts$[0][i].hitByPitch;
    //   stateLine.SAC = this.posts$[0][i].sacrifices;
    //   stateLine.K = this.posts$[0][i].strikeOuts;
    //   stateLine.SB = this.posts$[0][i].stolenBases;
    //   stateLine.PB = this.posts$[0][i].passedBalls;
    //   stateLine.CS = this.posts$[0][i].caughtStealing;
    //   stateLine.AVG = this.posts$[0][i].battingAverage;
    //   stateLine.OBP = this.posts$[0][i].onBasePercentage;
    //   stateLine.SLG = this.posts$[0][i].sluggingAverage;
    //   this.bsBllSts.push(stateLine);
    // }

    // this.datasource = new MatTableDataSource(this.bsBllSts);
    // this.datasource.sort = this.sort;
  }
  
  callBack(id){
    console.log("call back " + id);
    this.data.getStatsBySeason(id).subscribe(
      data => this.posts$ = data
    );
  }
}

