import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CreateSignedUrlModule } from './create-signed-url/create-signed-url.module';

@Module({
    imports: [
        CreateSignedUrlModule,
        RouterModule.register([
            {
                path: 'upload',
                children: [{ path: '', module: CreateSignedUrlModule }],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class UploadModule { }
