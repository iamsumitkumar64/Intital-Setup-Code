import { Module } from '@nestjs/common';
import { LogOutUserController } from './log-out-user.controller';
import { CookieService } from 'src/common/service/cookie.service';

@Module({
  imports: [],
  controllers: [LogOutUserController],
  providers: [CookieService],
  exports: [],
})
export class LogOutUserModule { }
