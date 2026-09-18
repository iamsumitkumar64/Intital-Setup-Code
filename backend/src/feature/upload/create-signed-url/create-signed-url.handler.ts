import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/common/service/cloudinary.service';
import { CreateSignedUrlDto } from './create-signed-url.dto';

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
