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

  selected: string;

  // JOG PARAMS
  TRAVEL_DIST: number = 0;

  // POWER STATES
  COOLANT_ON: boolean = false;
  AIR_ON: boolean = false;
  LASER_ON: boolean = false;

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

        this.COOLANT_IN = this.lib.convert_volts_temp(this.voltages[1], this.voltages[0], this.COOLANT_IN);
        this.COOLANT_IN_ROUNDED = Math.round(this.COOLANT_IN);
        this.COOLANT_FLOW = this.voltages[3];
      });
    }

  downJog() {
    this.socket.down(this.TRAVEL_DIST *-1, '1800');
  }

  upJog() {
    this.socket.up(this.TRAVEL_DIST, '1800');
  }

  leftJog() {
    this.socket.left(this.TRAVEL_DIST * -1, '1800');
  }

  rightJog() {
    this.socket.right(this.TRAVEL_DIST, '1800');
  }

  toggleCoolant() {
    this.COOLANT_ON = !this.COOLANT_ON;
    this.gpio_socket.toggleCoolant(this.COOLANT_ON);
    console.log("toggle coolant");
  }

  toggleAir() {
    this.AIR_ON = !this.AIR_ON;
    this.gpio_socket.toggleAir(this.AIR_ON);
    console.log("toggle air");
  }

  toggleLaser() {
    this.LASER_ON = !this.LASER_ON;
    this.gpio_socket.toggleLaser(this.LASER_ON);
    console.log("toggle laser");
  }

  cmd_the_lights(color: string) {
    switch (color) {
      case "RED":
        this.gpio_socket.redOnRGB();
        break;
      case "GREEN":
        this.gpio_socket.greenOnRGB();
        break;
      case "BLUE":
        this.gpio_socket.blueOnRGB();
        break;
      case "WHITE":
        this.gpio_socket.whiteOnRGB();
        break;
      case "OFF":
        this.gpio_socket.lightsOffRGB();
        break;
      case "PURPLE":
        this.gpio_socket.purpleOnRGB();
        break;
    }
  }

  cmdTravel(dist: number) {
    this.TRAVEL_DIST = dist;
  } 

  private startReadingSensors() {
    this.gpio_socket.getCoolantTemps();
  }

}
