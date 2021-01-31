import { Injectable } from '@angular/core';

// NTC Thermistor consts
const BETA = 3950;
const R25 = 10000;


@Injectable({
  providedIn: 'root'
})
export class LibService {

  constructor() { }


  public convert_volts_temp(volts: number, Vin: number) {
    var RT = this.getRT(Vin, volts);

    var Cel = this.getCelTemp(RT);

    //return Math.round((Cel * (9 / 5)) + 32);
    return ((Cel * (9 / 5)) + 32);
  }

  private getRT(Vin: number, volts: number) {
    return R25 / (Vin / volts - 1)
  }

  private getCelTemp(RT: number) {
    return (1 / (1 / 298.16 + 1 / BETA * Math.log10(RT / R25))) - 273.15;
  }


}
