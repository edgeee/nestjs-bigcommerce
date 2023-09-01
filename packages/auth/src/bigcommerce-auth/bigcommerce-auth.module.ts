import { Module } from '@nestjs/common';
import { BigcommerceAuthService } from './bigcommerce-auth.service';

@Module({
  providers: [BigcommerceAuthService],
})
export class BigcommerceAuthModule {}
