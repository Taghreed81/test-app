import { Injectable } from '@nestjs/common';
import { dataAccess } from '@backend/data-access';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message:  dataAccess()};
  }
}
