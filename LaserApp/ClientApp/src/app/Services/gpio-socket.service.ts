import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GpioSocketService {

  url: any = "ws://192.168.254.159:8082"
  private socket: any;

constructor() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    console.log('Connecting to ' + this.url);

    this.socket = io(this.url, {
      withCredentials: false,
      extraHeaders: {
      }
    });
  }


  toggleCoolant(state: number, msg: string) {
    this.socket.emit('coolant', state);

    console.log('Switching coolant pump ' + msg);
  }

  async whiteOnRGB() {
    this.socket.emit('lights_off');
    await delay(1000);
    this.socket.emit('white_on');
  }

  async redOnRGB() {
    this.socket.emit('lights_off');
    await delay(1000);
    this.socket.emit('red_on');
  }

  async greenOnRGB() {
    this.socket.emit('lights_off');
    await delay(1000);
    this.socket.emit('green_on');
  }

  async blueOnRGB() {
    this.socket.emit('lights_off');
    await delay(1000);
    this.socket.emit('blue_on');
  }

  lightsOffRGB() {
    this.socket.emit('lights_off');
  }

  async getCoolantTemps() {
    while (true) {
      this.socket.emit('coolant_temps');
      await delay(1000);
    }
  }

  // HANDLER
  VoltagesMsg() {
    return Observable.create(observer => {
      this.socket.on('adc_voltages', msg => {
        observer.next(msg);
      });
    });
  }
}

// Create delays
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
