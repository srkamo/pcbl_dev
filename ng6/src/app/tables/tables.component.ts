import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface SeasonElement {
  season: string;
  record: string;
}

export interface LastThree {
  opponent: string;
  score: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const SEASONS_DATA: SeasonElement[] = [
  { season: 'Spring 2014', record: '13-8-0' },
  { season: 'Fall 2014', record: '6-5-1' },
  { season: 'Spring 2015', record: '5-13-1' },
  { season: 'Fall 2015', record: '9-4-0' },
  { season: 'Spring 2016', record: '12-8-1' },
  { season: 'Fall 2016', record: '10-2-0' },
  { season: 'Spring 2017', record: '6-13-0' },
  { season: 'Fall 2017', record: '3-7-0' },
  { season: 'Spring 2018', record: '11-8-0' },
  { season: 'All Time', record: '225-210-8' },
];

const LAST3_DATA: LastThree[] = [
  { opponent: 'at Dodos', score: '5-3' },
  { opponent: 'vs Smokies', score: '1-0' },
  { opponent: 'vs Bats', score: '6-8' },

];


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],

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
export class TablesComponent implements OnInit {

  tables$: Object;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  seasonColumns: string[] = ['season', 'record'];
  dataSeasons = SEASONS_DATA;

  last3Columns: string[] = ['opponent', 'score'];
  dataLast3 = LAST3_DATA;

  constructor() { }

  ngOnInit() {
  }

}
