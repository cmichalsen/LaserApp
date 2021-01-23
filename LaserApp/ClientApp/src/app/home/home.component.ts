import { Component } from '@angular/core';

import { SocketioService } from '../Services/socketio.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
   

  constructor(private socket: SocketioService) {
  }

  downOne() {
    this.socket.down('1', '1800');
  }

  hold() {
    this.socket.hold();
  }
}
