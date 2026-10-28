import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    if (!getApps().length) {
      const privateKey = this.configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/^"|"$/g, '')
        .replace(/\\n/g, '\n');

      initializeApp({
        credential: cert({
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey,
        }),
      });
    }
  }

  async verifyIdToken(idToken: string) {
    return await getAuth().verifyIdToken(idToken);
  }
}
