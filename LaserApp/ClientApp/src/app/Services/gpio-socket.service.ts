import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GpioSocketService {

  url: any = "ws://192.168.254.159:8082"
  //TODO: locate some where higher up
  //url: any = "ws://127.0.0.1:8082"

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


  toggleCoolant(state: boolean) {
    this.socket.emit('coolant', state);
  }

  toggleAir(state: boolean) {
    this.socket.emit('air', state);
  }

  toggleLaser(state: boolean) {
    this.socket.emit('laser', state);
  }

  async whiteOnRGB() {
    this.socket.emit('lights_off');
    await delay(100);
    this.socket.emit('white_on');
  }

  async redOnRGB() {
    this.socket.emit('lights_off');
    await delay(100);
    this.socket.emit('red_on');
  }

  async greenOnRGB() {
    this.socket.emit('lights_off');
    await delay(100);
    this.socket.emit('green_on');
  }

  async blueOnRGB() {
    this.socket.emit('lights_off');
    await delay(100);
    this.socket.emit('blue_on');
  }

  async purpleOnRGB() {
    this.socket.emit('lights_off');
    await delay(100);
    this.socket.emit('purple_on');
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

  getCoolantFlow() {
    //while (true) {
    this.socket.emit('coolant_flow');
    console.log('testingthisnow');
      ///await delay(2000);
    //}
  }

  // HANDLER
  VoltagesMsg() {
    return Observable.create(observer => {
      this.socket.on('adc_voltages', msg => {
        observer.next(msg);
      });
    });
  }

  CoolantFlowMsg() {
    return Observable.create(observer => {
      this.socket.on('gph', msg => {
        observer.next(msg);
      });
    });
  }
}

// Create delays
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
