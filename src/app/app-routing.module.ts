import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'user-auth',
                component: UserAuthComponent
            },
            {
                path: 'user-profile',
                component: UserProfileComponent
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