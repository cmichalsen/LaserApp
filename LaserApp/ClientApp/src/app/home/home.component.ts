import { Component } from '@angular/core';
import { GpioSocketService } from '../Services/gpio-socket.service';

import { SocketioService } from '../Services/socketio.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
   

  constructor(private socket: SocketioService, private gpio_socket: GpioSocketService) {
  }

  downOne() {
    this.socket.down('1', '1800');
  }

  coolantOff() {
    this.gpio_socket.turnOnCoolant('0', 'off');
  }

  coolantOn() {
    this.gpio_socket.turnOnCoolant('0', 'on');
  }

}
