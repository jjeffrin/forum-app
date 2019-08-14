import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerificationSentComponent } from './verification-sent/verification-sent.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['user-auth']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['user-profile']);

const appRoutes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '',
                component: WelcomeComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe: redirectLoggedInToProfile }
            },
            {
                path: 'user-auth',
                component: UserAuthComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe: redirectLoggedInToProfile }
            },
            {
                path: 'user-profile',
                component: UserProfileComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe:  redirectUnauthorizedToLogin }
            },
            {
                path: 'verification-sent',
                component: VerificationSentComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe: redirectLoggedInToProfile }
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe: redirectLoggedInToProfile }
            },
            {
                path: 'reset-password/:email',
                component: ResetPasswordComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe: redirectLoggedInToProfile }
            },
            {
                path: 'user-settings',
                component: UserSettingsComponent,
                canActivate: [ AngularFireAuthGuard ],
                data: { authGuardPipe:  redirectUnauthorizedToLogin }
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}