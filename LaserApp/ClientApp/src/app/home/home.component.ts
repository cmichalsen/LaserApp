import { Component, OnInit } from '@angular/core';
import { GpioSocketService } from '../Services/gpio-socket.service';
import { SocketioService } from '../Services/socketio.service'
import { LibService } from '../Services/lib.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selected:string;

  // Channels
  // 0 = 3.3 rail
  // 1 = laser coolant intake (F)
  // 2 = laser coolant outtake (F)
  // 3 = coolant flow sensor
  voltages: Array<number>;

  COOLANT_IN: number;
  COOLANT_IN_ROUNDED: number;
  COOLANT_FLOW: number;

  constructor(private socket: SocketioService, private gpio_socket: GpioSocketService, private lib: LibService) {
    this.startReadingSensors();
  }
    ngOnInit(): void {
      this.gpio_socket.VoltagesMsg().subscribe(msg => {
        this.voltages = msg;

        this.COOLANT_IN = this.lib.convert_volts_temp(this.voltages[1], this.voltages[0]);
        this.COOLANT_IN_ROUNDED = Math.round(this.COOLANT_IN);
        this.COOLANT_FLOW = this.voltages[3];
      });
    }

  downOne() {
    this.socket.down('1', '1800');
  }

  coolantOff() {
    this.gpio_socket.toggleCoolant(0, 'off');
  }

  coolantOn() {
    this.gpio_socket.toggleCoolant(1, 'on');
    this.greenOn();
  }

  cmd_the_lights(test: string) {
    console.log(test);
    this.redOn();

    switch (test) {
      case "RED":
        this.redOn();
        break;
      case "GREEN":
        this.greenOn();
        break;
      case "BLUE":
        this.blueOn();
        break;
      case "WHITE":
        this.whiteOn();
        break;
      case "OFF":
        this.lightsOff();
        break;

    }
  }

  redOn() {
    this.gpio_socket.redOnRGB();
  }

  greenOn() {
    this.gpio_socket.greenOnRGB();
  }

  blueOn() {
    this.gpio_socket.blueOnRGB();
  }

  whiteOn() {
    this.gpio_socket.whiteOnRGB();
  }

  lightsOff() {
    this.gpio_socket.lightsOffRGB();
  }

  private startReadingSensors() {
    this.gpio_socket.getCoolantTemps();
  }

}
