import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../Services/socketio.service';

@Component({
  selector: 'app-jog-controls',
  templateUrl: './jog-controls.component.html',
  styleUrls: ['./jog-controls.component.css']
})
export class JogControlsComponent implements OnInit {

  // JOG PARAMS
  TRAVEL_DIST: number = 0;

  constructor(private socket: SocketioService) { }

  ngOnInit() {
  }


  downJog() {
    this.socket.down(this.TRAVEL_DIST * -1, '1800');
  }

  upJog() {
    this.socket.up(this.TRAVEL_DIST, '1800');
  }

  leftJog() {
    this.socket.left(this.TRAVEL_DIST * -1, '1800');
  }

  rightJog() {
    this.socket.right(this.TRAVEL_DIST, '1800');
  }

  cmdTravel(dist: number) {
    this.TRAVEL_DIST = dist;
  } 
}
