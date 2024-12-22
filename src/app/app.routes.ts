import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CustomersComponent } from './components/customers/customers.component';
import { DepotComponent } from './components/depot/depot.component';
import { ProductComponent } from './components/product/product.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { OrderComponent } from './components/order/order.component';
import { RequirementsPlanningComponent } from './components/requirements-planning/requirements-planning.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductionComponent } from './components/production/production.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "requirements-planning/:orderId",
        component: RequirementsPlanningComponent,
        canActivate: [() => inject(AuthService).isAuthenticated()]
    },
    {
        path: "",
        component: LayoutsComponent,
        canActivateChild: [() => inject(AuthService).isAuthenticated()],
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "customers",
                component: CustomersComponent
            },
            {
                path: "depots",
                component: DepotComponent
            },
            {
                path: "products",
                component: ProductComponent
            },
            {
                path: "recipes",
                component: RecipeComponent
            },
            {
                path: "recipe-details/:id",
                component: RecipeDetailsComponent
            },
            {
                path: "orders",
                component: OrderComponent
            },
            {
                path: "invoices/:type",
                component: InvoiceComponent
            },
            {
                path: "production",
                component: ProductionComponent
            },
            {
                path: "user-profile",
                component: UserProfileComponent
            }
        ]
    }
];
