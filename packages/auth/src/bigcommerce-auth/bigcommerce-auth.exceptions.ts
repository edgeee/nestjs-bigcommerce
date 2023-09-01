import { UnauthorizedException } from '@nestjs/common';

export class InvalidJwtTokenException extends UnauthorizedException {}
