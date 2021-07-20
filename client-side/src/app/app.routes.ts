import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddonComponent } from './components/addon/addon.component';
import { TodoForm } from './components/form/todo-form.component';

// Important for single spa
@Component({
    selector: 'app-empty-route',
    template: '<div></div>',
})
export class EmptyRouteComponent {}

const routes: Routes = [
    {
        path: `settings/:addon_uuid/todos`,
        component: AddonComponent
    },
    {
        path: 'settings/:addon_uuid/todos/:todo_uuid',
        component: TodoForm
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' , paramsInheritanceStrategy: 'always'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }



