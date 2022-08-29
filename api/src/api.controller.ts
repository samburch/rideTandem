import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/bus-times')
  getBusTimes( timesToGenerate: number = 10, currentDay: number = new Date().getDay()) {
    return this.apiService.getBusTimes( timesToGenerate, currentDay );
  };

};