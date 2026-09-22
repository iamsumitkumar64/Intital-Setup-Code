import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from '../../repository/user-repository/user-repository';
import { JwtHelperService } from '../../service/jwt/jwt.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticateGuard implements CanActivate {
    constructor(
        private readonly jwtHelpService: JwtHelperService,
        private readonly userRepository: UserRepository,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const PUBLIC_AUTHENTICATE_KEY = 'public_authenticate';

        // Check Public in metadata
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            PUBLIC_AUTHENTICATE_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );
        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();

        // Get token
        const token = req.cookies?.token || req.headers.authorization;
        if (!token || Array.isArray(token)) {
            throw new UnauthorizedException('Unauthorized Access');
        }

        // Remove Bearer prefix
        const jwtToken = token.startsWith('Bearer ')
            ? token.substring(7) : token;

        // Verify JWT
        const user = await this.jwtHelpService.verifyJwtToken(jwtToken);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        // Check user in DB
        const existingUser = await this.userRepository.findByUuid(user.uuid);
        if (!existingUser) {
            throw new UnauthorizedException('Account not found');
        }

        // Attach user to request
        req.user = existingUser;

        return true;
    }
}