import { Body, Controller, Post } from '@nestjs/common';
import { CreateSignedUrlHandler } from './create-signed-url.handler';
import { CreateSignedUrlDto } from './create-signed-url.dto';
import { PublicAuthenticate } from 'src/infrastructure/decorator';

@Controller('/signed-url')
export class CreateSignedUrlController {
    constructor(
        private readonly createSignedUrlHandler: CreateSignedUrlHandler,
    ) { }

    @PublicAuthenticate()
    @Post()
    async createSignedUrlPost(@Body() body: CreateSignedUrlDto) {
        return await this.createSignedUrlHandler.handler(body);
    }
}
