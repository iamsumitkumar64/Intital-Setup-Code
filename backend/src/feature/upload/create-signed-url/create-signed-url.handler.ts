import { Injectable } from '@nestjs/common';
import { CreateSignedUrlDto } from './create-signed-url.dto';
import { CloudinaryService } from 'src/infrastructure/service/cloudinary/cloudinary.service';

@Injectable()
export class CreateSignedUrlHandler {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    async handler(dto: CreateSignedUrlDto) {
        const folder = dto?.folder || 'my-app';
        const signatureData = this.cloudinaryService.createUploadSignature(folder);

        return {
            message: 'Signed URL generated successfully',
            ...signatureData,
        };
    }
}
