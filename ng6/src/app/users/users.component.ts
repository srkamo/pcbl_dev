import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

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

//const ELEMENT_DATA: ReportElement[] = [];

export class UsersComponent implements OnInit {

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  

  users$: Object;
  careerBattingStats$ = null;
  careerPitchingStats$ = null;
  careerBattingColumns: string[] = ['Name', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'BB', 'HBP', 'SAC', 'K', 'SB', 'PB', 'CS', 'AVG', 'OBP', 'SLG'];
  careerPitchingColumns: string[] = ['Name', 'G', 'W', 'L', 'T', 'S', 'IP', 'ER', 'R', 'K', 'BB', 'HBP', 'H', 'WP', 'SB', 'PO', 'ERA', 'WHIP' ];
  //dataSource = new MatTableDataSource();
  
  constructor(private data: DataService) { 

  }

  ngOnInit() {
    this.data.getCareerBattingStats().subscribe(
      data => this.careerBattingStats$ = data 
      
      
    );
    
    console.log("crr bt sts: " + this.data.getCareerPitchingStats()[0].length);
   
  }

  applyFilter(filterValue: string) {
   // this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  loadBatting(){
    
    this.data.getCareerBattingStats().subscribe(
      data => this.careerBattingStats$ = data 
      
    );
  }

  loadPitching(){
    
    this.data.getCareerBattingStats().subscribe(
      data => this.careerPitchingStats$ = data 
    );
  }

  
}

