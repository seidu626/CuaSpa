import { Component, OnInit } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private http: Http) {

  }
  
  ngOnInit(): void {
    //console.log("sending request");
    //this.getAll();
    //console.log("sending request completed");

    //console.log("simulation post");
    //this.simulatePost();
    //console.log("Completed")
  }


  //fetch all
  getAll(){
    return this.http.get("http://localhost:11312/api/valuebooktypes")
      .map(response => {
        const data = response.json();
        return data || [];
      }).subscribe(
      (data) => { console.log(data)} 
    )   
  }

  simulatePost() {
    let body = { "code": "test", "name": "test", "quantity": "test", "description": "test" };
    this.http
      .post("http://localhost:11312/api/valuebooktypes", body)
      .subscribe(
      (data) => { console.log(data); },
        (err) => { console.log(err); },
        () => { console.log("request completed");}
      );
  }

}
