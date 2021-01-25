import { Inject, Injectable, Injector } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})

export class GpioSocketService {

  socket: any;
  url: any = "ws://192.168.254.159:8082"

  constructor() {
    this.socket = io(this.url, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': 'Negotiate'
          }
        }
      }
    });
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    console.log('setup gpio socket');

    this.socket.emit('getServerConfig');
    console.log('Connecting to Server');

  }

  turnOnCoolant(state: string, msg: string) {
    this.socket.emit('coolant', state);

    console.log('Switching coolant pump ' + msg);
  }
}
