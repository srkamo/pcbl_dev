import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatOption } from '@angular/material';
//import { posix } from 'path';


class BatStats{
  constructor(
    atBats : number,
    singles : number,
    doubles : number,
    triples : number,
    homeRuns : number,
    walks : number,
    hitByPitch : number,
    sacrifices : number,
    runs : number,
    rbis : number,
    stolenBases : number,
    passedBalls : number,
    caughtStealing : number,
    strikeOuts : number,
    battingAverage : string,
    onBasePercentage : string,
    sluggingAverage : string,
    player_id : number,
    firstName : string,
    lastName : string,
    numGames : number,
  ){}
}

export interface BattingStats {
  atBats : number;
  singles : number;
  doubles : number;
  triples : number;
  homeRuns : number;
  walks : number;
  hitByPitch : number;
  sacrifices : number;
  runs : number;
  rbis : number;
  stolenBases : number;
  passedBalls : number;
  caughtStealing : number;
  strikeOuts : number;
  battingAverage : string;
  onBasePercentage : string;
  sluggingAverage : string;
  player_id : number;
  firstName : string;
  lastName : string;
  numGames : number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




const sampleBsBll = [{ "player_id": 247, "firstName": "Phil", "lastName": "Acosta", "numGames": 13, "atBats": 51, "singles": 14, "doubles": 2, "triples": 0, "homeRuns": 0, "walks": 10, "hitByPitch": 1, "sacrifices": 0, "runs": 10, "rbis": 7, "stolenBases": 4, "passedBalls": 5, "caughtStealing": 2, "strikeOuts": 6, "battingAverage": "0.275", "onBasePercentage": "0.403", "sluggingAverage": "0.353" }
, { "player_id": 201, "firstName": "Jason", "lastName": "Bolding", "numGames": 9, "atBats": 40, "singles": 8, "doubles": 3, "triples": 0, "homeRuns": 0, "walks": 2, "hitByPitch": 0, "sacrifices": 0, "runs": 10, "rbis": 13, "stolenBases": 3, "passedBalls": 1, "caughtStealing": 0, "strikeOuts": 7, "battingAverage": "0.2", "onBasePercentage": "0.238", "sluggingAverage": "0.35" }
, { "player_id": 163, "firstName": "Ryan", "lastName": "Elliott", "numGames": 10, "atBats": 44, "singles": 14, "doubles": 5, "triples": 0, "homeRuns": 0, "walks": 2, "hitByPitch": 2, "sacrifices": 0, "runs": 15, "rbis": 10, "stolenBases": 0, "passedBalls": 2, "caughtStealing": 1, "strikeOuts": 2, "battingAverage": "0.318", "onBasePercentage": "0.375", "sluggingAverage": "0.545" }
, { "player_id": 252, "firstName": "Lee", "lastName": "Ellis", "numGames": 1, "atBats": 2, "singles": 0, "doubles": 0, "triples": 0, "homeRuns": 0, "walks": 3, "hitByPitch": 0, "sacrifices": 0, "runs": 1, "rbis": 0, "stolenBases": 0, "passedBalls": 0, "caughtStealing": 0, "strikeOuts": 1, "battingAverage": "0.0", "onBasePercentage": "0.6", "sluggingAverage": "0.0" },
{ "player_id": 246, "firstName": "Al", "lastName": "Garcia", "numGames": 2, "atBats": 7, "singles": 1, "doubles": 0, "triples": 0, "homeRuns": 0, "walks": 0, "hitByPitch": 2, "sacrifices": 0, "runs": 1, "rbis": 3, "stolenBases": 0, "passedBalls": 0, "caughtStealing": 0, "strikeOuts": 3, "battingAverage": "0.143", "onBasePercentage": "0.333", "sluggingAverage":"0.143" }];



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

  batting;
  pitching;
  dropDown;
  careerBattingColumns: string[] = ['Name', 'numGames', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'HBP', 'SAC', 'K', 'SB', 'PB', 'CS', 'AVG', 'OBP', 'SLG'];
  careerPitchingColumns: string[] = ['Name', 'numGames', 'W', 'L', 'T', 'S', 'IP', 'ER', 'R', 'K', 'BB', 'HBP', 'H', 'WP', 'SB', 'PO', 'ERA', 'WHIP'];

  dataSource;

  selected = "";
  @ViewChild('battingTableSort') public battingTableSort: MatSort;
  @ViewChild('pitchingTableSort') public pitchingTableSort: MatSort;
  battingIntr : BattingStats[] ;


  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getStatsBySeason(0).subscribe(
      data => {
     
        this.dropDown = data[0];
        this.batting = new MatTableDataSource(data[1]);
        this.batting.sort = this.battingTableSort;
        this.pitching = new MatTableDataSource(data[2]);
        this.pitching.sort = this.pitchingTableSort;
        
      }
    );
    
    
  }



  callBack(id) {
    console.log("call back " + id);
    this.data.getStatsBySeason(id).subscribe(
      data => {
        this.batting = new MatTableDataSource(data[1]);
        this.pitching = new MatTableDataSource(data[2]);
        this.batting.sort = this.battingTableSort;
        this.pitching.sort = this.pitchingTableSort;
        
      }
    );
   
  }
}

