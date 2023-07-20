import { Injectable } from '@nestjs/common';
import { dataAccess } from '@test-app/data-access';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message:  dataAccess()};
  }
}
