import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket: Socket) { }

  setupSocketConnection() {
    //this.socket = io(environment.SOCKET_ENDPOINT);

    console.log('test this');

    this.socket.emit('getServerConfig');
    console.log('Connecting to Server');

  }

  hold() {
    this.socket.emit('runCommand', '!');
    console.log('send hold command');
  }

  down(mm: string, fr: string) {
    //this.socket.emit('runCommand', 'G91 Y-' + mm + ' F' + fr);

    this.socket.emit('runCommand', 'G91 Y-1 F1800');

    console.log('send gcode command' + 'G91 Y-' + mm + ' F' + fr);
  }

}
