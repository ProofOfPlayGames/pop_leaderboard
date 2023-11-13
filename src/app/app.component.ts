import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pop_leaderboard';

  constructor(
    private http: HttpClient) { 
      this.onCreateData();
    }

    onCreateData(){
      this.http.get("https://104.236.68.131:3006/leaderboard").subscribe((response) => {
        console.log(response);
      });
    }
}
