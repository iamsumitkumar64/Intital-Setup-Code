import { Module } from '@nestjs/common';
import { CreateSignedUrlController } from './create-signed-url.controller';
import { CreateSignedUrlHandler } from './create-signed-url.handler';
import { CloudinaryService } from 'src/common/service/cloudinary.service';

@Module({
    imports: [],
    controllers: [CreateSignedUrlController],
    providers: [CreateSignedUrlHandler, CloudinaryService],
    exports: [CreateSignedUrlModule],
})
export class CreateSignedUrlModule { }
