# Tools and Generators

<https://realfavicongenerator.net/>
<https://realfavicongenerator.net/favicon_checker?protocol=https&site=ukrainiansinfact.org.ua#.YzdtQOxBygw>

## Articles

Angular and Firebase auth:
<https://www.positronx.io/full-angular-firebase-authentication-system/>

Alternative ways to add Firebase to your JavaScript project:
<https://firebase.google.com/docs/web/alt-setup>

Logging Analytics:
<https://firebase.google.com/docs/analytics/get-started?platform=web>

## Modules creation history

ng g m --routing modules/auth
ng g c modules/auth/components/auth

ng g m --routing modules/auth/modules/sign-in
ng g c modules/auth/modules/sign-in/components/sign-in

ng g m --routing modules/auth/modules/sign-up
ng g c modules/auth/modules/sign-up/components/sign-up

ng g m --routing modules/not-found &&
ng g c modules/not-found/components/not-found

ng g m --routing modules/main && ng g c modules/main/components/main
ng g m --routing modules/main/modules/notes && ng g c modules/main/modules/notes/components/notes

ng g c modules/auth/components/forgot-password -m=modules/auth --dry-run
ng g c modules/auth/components/verify-email -m=modules/auth --dry-run
