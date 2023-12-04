import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['username', 'pub_key', 'high_score', 'total_games', 'total_score', 'today_high_score', 'today_games', 'today_score', 'popPoints', 'tokenEstimate']; // Update with your database columns

  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.loadData();
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadData() {
    // Replace with your API endpoint
    this.http.get<any[]>('http://104.236.68.131:3008/leaderboard').subscribe((data) => {
      // document.body.innerHTML = String(data);
      this.data = data;
      var totalPopPoints = 0;
      console.log(data);
      this.data.forEach(row => {
        console.log(row);
        if(row["pub_key"] != ""){
          row["popPoints"] = row.today_high_score * row.today_score * row.high_score;
          totalPopPoints += row["popPoints"];
        }else{
          row["popPoints"] = -1;
          row["tokenEstimate"] = -1;
        }
        console.log(row);
      });
      this.data.forEach(row => {
        if(row["pub_key"] != ""){
          row["tokenEstimate"] = Math.floor((row["popPoints"]/totalPopPoints)*4109589);
        }
      });
      this.dataSource = new MatTableDataSource(data);
    });
  }

  displayTokens(num: number) {
    if(num != -1){
      let nf = new Intl.NumberFormat('en-US');
      return nf.format(num) + " POPT";
    }else{
      return "N/A";
    }
  }

  displayPoints(num: number) {
    if(num != -1){
      let nf = new Intl.NumberFormat('en-US');
      return nf.format(num);
    }else{
      return "N/A";
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if (sortState.direction) {
      this.data.sort((a, b) => {
        console.log(a);
        return sortState.direction != "asc" ? (a[sortState.active] > b[sortState.active] ? 1 : -1) : (a[sortState.active] <= b[sortState.active] ? 1 : -1);
      });
      this.dataSource = new MatTableDataSource(this.data);
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
