import * as auth from 'firebase/auth';

export type UserRole = 'admin' | 'editor';

export const userRoles: UserRole[] = ['admin', 'editor'];
export interface User extends auth.User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    parsedClaims: UserRole[];
}
