import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('Test API Controller', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  describe('Test weekend bus schedule', () => {
    test('Busses should not run on Saturdays', () => {
      expect(controller.getBusTimes(10, 6)).toHaveProperty(
        '[0]error.message',
        'No busses run on weekends',
      );
    });
    test('Busses should not run on Sundays', () => {
      expect(controller.getBusTimes(10, 0)).toHaveProperty(
        '[0]error.message',
        'No busses run on weekends',
      );
    });

    describe('Test weekday bus schedule', () => {
      test('Should return error if no busses are running', () => {
        expect(controller.getBusTimes(0, 1)).toHaveProperty(
          '[0]error.message',
          'There are no busses currently in service',
        );
      });

      test('185 Bus should run on Monday', () => {
        expect(controller.getBusTimes(10, 1)).toMatchObject([{ busId: 185 }]);
      });
    });
  });
});
