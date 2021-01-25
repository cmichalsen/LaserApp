import { Inject, Injectable, Injector } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;
  url: any = "ws://192.168.254.159:8000"

  constructor() {
    this.socket = io(this.url);
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    console.log('setup grbl socket');

    this.socket.emit('getServerConfig');
    console.log('Connecting to Server');

  }

  hold() {
    this.socket.emit('runCommand', '!');
    console.log('send hold command');
  }

  down(mm: string, fr: string) {
    this.socket.emit('runCommand', 'G91 Y-1 F1800');

    console.log('send gcode command' + 'G91 Y-' + mm + ' F' + fr);
  }

}
