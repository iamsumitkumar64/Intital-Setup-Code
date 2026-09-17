import { Body, Controller, Post } from '@nestjs/common';
import { CreateSignedUrlHandler } from './create-signed-url.handler';
import { CreateSignedUrlDto } from './create-signed-url.dto';

@Controller('/signed-url')
export class CreateSignedUrlController {
    constructor(
        private readonly createSignedUrlHandler: CreateSignedUrlHandler,
    ) { }

    @Post()
    async createSignedUrlPost(@Body() body: CreateSignedUrlDto) {
        return await this.createSignedUrlHandler.handler(body);
    }
}
