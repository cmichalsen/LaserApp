import { Inject, Injectable, Injector } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket: Socket) { }

  setupSocketConnection() {

    this.socket.emit('getServerConfig');
    console.log('Connecting to Server');

  }

  hold() {
    this.socket.emit('runCommand', '!');
    console.log('send hold command');
  }

  down(mm: number, fr: string) {
    let cmd = 'G91 Y' + mm + ' F' + fr;
    this.socket.emit('runCommand', cmd);

    console.log('send gcode command: ' + cmd);
  }

  up(mm: number, fr: string) {
    let cmd = 'G91 Y' + mm + ' F' + fr;
    this.socket.emit('runCommand', cmd);

    console.log('send gcode command: ' + cmd);
  }

  left(mm: number, fr: string) {
    let cmd = 'G91 X' + mm + ' F' + fr;
    this.socket.emit('runCommand', cmd);

    console.log('send gcode command: ' + cmd);
  }

  right(mm: number, fr: string) {
    let cmd = 'G91 X' + mm + ' F' + fr;
    this.socket.emit('runCommand', cmd);

    console.log('send gcode command: ' + cmd);
  }

}
