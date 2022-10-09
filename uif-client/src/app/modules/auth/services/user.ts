import { ParsedToken } from '@angular/fire/auth';
import * as auth from 'firebase/auth';
export interface User extends auth.User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    parsedClaims: string[];
 }
 