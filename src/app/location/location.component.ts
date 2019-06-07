import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  lat = 0.00;
  lon = 0.00;
  users: any = [];

  constructor(private myService:MyserviceService,private _router: Router) { }

  ngOnInit() {
    if(!this.myService.loggedIn())  
      this._router.navigate(['/main/login']);
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        }, (error) => {
          console.log(error);
        });
      }
  }


  submit(){
    this.myService.locationSearch(this.lon, this.lat).subscribe(
      data => {
        console.log(data);
        this.users = data;
        for(var i=0; i<this.users.length; i++){
          this.users[i]['dis'] = (this.users[i]['dis']/1000) | 0;
        }      
      },
      error => console.log(error)
    );
  }

}
