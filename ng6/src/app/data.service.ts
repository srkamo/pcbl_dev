import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getSeasons(){
    //return this.http.get('http://localhost:8888/api/viewAllSeason')
    return this.http.get('http://qa.pcblroyals.com:8888/api/viewAllSeason')
  }

  getAllSeasonsAndRecentGames(){
    //return this.http.get('http://localhost:8888/api/viewAllSeason')
    return this.http.get('http://qa.pcblroyals.com:8888/api/getAllSeasonsAndRecentGames')
  }

  getCareerBattingStats(){
   // return this.http.get('http://localhost:8888/api/viewCareerStatsAllPlayer')
    return this.http.get('http://qa.pcblroyals.com:8888/api/viewCareerStatsAllPlayer')
  }

  getCareerPitchingStats(){
    //return this.http.get('http://localhost:8888/api/viewCareerPitchingStatsAllPlayer')
    return this.http.get('http://qa.pcblroyals.com:8888/api/viewCareerPitchingStatsAllPlayer')
  }

  getStatsBySeason(id){
    return this.http.get('http://qa.pcblroyals.com:8888/api/getStatsBySeason/'+id)
  }
}
