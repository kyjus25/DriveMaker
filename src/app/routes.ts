import {Routes} from '@angular/router';
import {CreateComponent} from './create/create.component';
import {LandingComponent} from './landing/landing.component';

export const appRoutes
: Routes = [
    {path: 'landing', component: LandingComponent},
    {path: 'create', component: CreateComponent, children: []},
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: '**', redirectTo: 'landing', pathMatch: 'full'},
];
