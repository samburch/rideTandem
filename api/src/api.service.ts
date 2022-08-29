import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

export interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
  delayed: boolean;
}

@Injectable()
export class ApiService {
  getBusTimes(timesToGenerate: number, currentDay: number) {
    return this.generateRandomBusTimes(timesToGenerate, currentDay);
  }
  private generateRandomBusTimes(timesToGenerate: number, currentDay: number) {
    let data: BusTime[] = [];

    try {
      if (currentDay === 0 || currentDay === 6) throw new Error('No busses run on weekends')

      for (let i = 0; i < timesToGenerate; i++) {
        const {
          id: busId,
          destination,
          nonOperationalDays,
        } = this.getRandomBusRoute();

        if (nonOperationalDays.includes(currentDay)) break;

        data.push({
          id: i,
          busId,
          destination,
          minutesUntilArrival: _.random(1, 15),
          delayed: this.isDelayed()
        });
      }

      if (data.length < 1) throw new Error('There are no busses currently in service');

      data.sort((a, b) => {
        return a.minutesUntilArrival - b.minutesUntilArrival;
      });
      return data;

    } catch (error) {
      error.name = 'Services unavailable'
      return [{ error: { name: error.name, message: error.message }}]
    }
  }

  private getRandomBusRoute() {
    const busRoutes = [
      { id: 176, destination: 'Newham Close', nonOperationalDays: [1, 3] },
      { id: 185, destination: 'Train Station', nonOperationalDays: [5, 2] },
      { id: 193, destination: 'Shopping Centre', nonOperationalDays: [1, 5, 4]},
    ];
    return busRoutes[_.random(0, busRoutes.length - 1)];
  }

  private isDelayed() {
    let result = _.random(1, 3)
    if (result === 3) {
      return true
    }
    return false
  }
}