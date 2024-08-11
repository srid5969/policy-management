import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getApiHealthCheck() {
    return {
      status: 'ok',
      message: 'API is healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
