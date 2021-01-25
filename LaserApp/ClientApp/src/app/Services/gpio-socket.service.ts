import { Inject, Injectable, Injector } from '@angular/core';
import { SocketTwo } from '../app.module';

@Injectable({
  providedIn: 'root'
})



export class GpioSocketService {

  protected socket: SocketTwo;

  constructor(injector: Injector) {
    this.socket = injector.get(SocketTwo);
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
