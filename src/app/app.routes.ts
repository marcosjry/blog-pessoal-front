import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './home/home.component';
import { PostCreatePageComponent } from './components/posts/post-create-page/post-create-page.component';
import { UsersPostComponent } from './dashboard/components/users-post/users-post.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { PostOwnerGuard } from './guards/post-owner.guard';
import { AnalyticsComponent } from './dashboard/components/analytics/analytics.component';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'post/create',
        component: PostCreatePageComponent,
        canActivate: [AuthenticatedUserGuard]
    },
    {
        path: 'post/user-posts',
        component: UsersPostComponent,
        canActivate: [AuthenticatedUserGuard]
    },
    
    {
        path: 'posts/view-post/:id',
        component: PostDetailComponent
    },
    {
        path: 'posts/edit/:id',
        component: PostEditComponent,
        canActivate: [PostOwnerGuard]
    },
    {
        path: 'analytics',
        component: AnalyticsComponent,
        canActivate: [AuthenticatedUserGuard]
    }
];
