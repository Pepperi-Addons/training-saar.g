import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from "@angular/core";
import { IPepFieldValueChangeEvent, PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { AddonService } from '../../services/addon.service';
import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { GenericListDataSource } from '../generic-list/generic-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from 'src/app/services/todos.service';


@Component({
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  providers: [TranslatePipe]
})
export class TodoForm implements OnInit {

    screenSize: PepScreenSizeType;

    constructor(
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService,
        public dialogService: PepDialogService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private todosService: TodosService
    ) {

        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

        this.key = this.activatedRoute.snapshot.params["todo_uuid"];
        this.loading = true;
        
        if(this.key === 'addTodo'){
            this.loading = false;
        }
        else{
            todosService.getTodo(this.key).then(obj => {
                this.obj = obj;
                this.calculateDisableSaveButton();
                this.loading = false;
            });
        }
    }

    mode: 'Edit' | 'Add'
    title: string = "Hello"
    loading: boolean = true
    key: string;
    disableSaveButton: boolean = true;

    obj = {
        Name: '',
        Description: '',
        DueDate: '',
    };

    ngOnInit(){
    }

    goBack() {
        this.router.navigate(['..'], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'preserve'
        })
    }

    backClicked() {
        this.goBack();
    }

    async saveClicked() {
        await this.todosService.upsertTodos(this.obj);
        this.goBack();
    }

    cancelClicked() {
        this.dialogService.openDefaultDialog(new PepDialogData({
            title: 'Are you sure?',
            actionButtons: [
                {
                    title: this.translate.instant('No'),
                    className: 'regular',
                    callback: () => {
                        this.goBack()
                    }
                },
                {
                    title: this.translate.instant('Yes'),
                    className: 'strong',
                    callback: () => {
                        this.goBack()
                    }
                }
            ]
        }))
    }

    onValueChanged(event: IPepFieldValueChangeEvent) {
        this.calculateDisableSaveButton();
    }

    private calculateDisableSaveButton() {
        this.disableSaveButton = (this.obj.Name === "" || this.obj.Description === "");
    }
}