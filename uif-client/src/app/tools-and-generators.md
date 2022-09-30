# Tools and Generators

<https://realfavicongenerator.net/>

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
