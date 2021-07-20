import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { AddonService } from '../../services/addon.service';
import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { GenericListComponent, GenericListDataSource } from '../generic-list/generic-list.component';
import { TodoForm } from '../form/todo-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../services/todos.service';


@Component({
  selector: 'addon-module',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.scss'],
  providers: [TranslatePipe]
})
export class AddonComponent implements OnInit {

    @ViewChild(GenericListComponent) genericListComponent;

    screenSize: PepScreenSizeType;

    constructor(
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService,
        public router: Router,
        public route: ActivatedRoute,
        public todoservice: TodosService
    ) {

        this.addonService.addonUUID = this.route.snapshot.params.addon_uuid;
        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

    }

    ngOnInit(){
    }

    listDataSource: GenericListDataSource = {
        getList: async (state) => {
            return this.todoservice.getTodos();
        },

        getDataView: async () => {
            return {
                Context: {
                    Name: '',
                    Profile: { InternalID: 0 },
                    ScreenSize: 'Landscape'
                  },
                  Type: 'Grid',
                  Title: '',
                  Fields: [
                    {
                        FieldID: 'Name',
                        Type: 'TextBox',
                        Title: this.translate.instant('Name'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'Description',
                        Type: 'TextBox',
                        Title: this.translate.instant('Description'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'DueDate',
                        Type: 'DateAndTime',
                        Title: this.translate.instant('Due Date'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'Completed',
                        Type: 'Boolean',
                        Title: this.translate.instant('Completed'),
                        Mandatory: false,
                        ReadOnly: true
                    }
                  ],
                  Columns: [
                    {
                      Width: 25
                    },
                    {
                      Width: 25
                    },
                    {
                      Width: 25
                    },
                    {
                      Width: 25
                    }
                  ],
                  FrozenColumnsCount: 0,
                  MinimumColumnWidth: 0
            }
        },

        getActions: async (objs) =>  {
            let validActions = [];

            if(objs.length === 1){
                validActions.push({
                    title: this.translate.instant("Edit"),
                        handler: async (objs) => {
                            this.router.navigate([objs[0].Key], {
                                relativeTo: this.route,
                                queryParamsHandling: 'merge'
                            });
                        }
                });
            }
        
            if (objs.length >= 1){
                validActions.push({
                    title: this.translate.instant("Delete"),
                    handler: async (objs) => {
                        objs = objs.map(obj => ({Key: obj.Key, Hidden: true}));
                        this.todoservice.upsertTodos(objs)
                        .finally(() => {
                            this.genericListComponent.reload();
                        })
                    }
                });

                validActions.push({
                    title: this.translate.instant("Mark as done"),
                    handler: async (objs) => {
                        objs = objs.filter(obj => obj.Completed === false).map(obj => ({Key: obj.Key, Completed: true}));
                        this.todoservice.upsertTodos(objs)
                        .finally(() => {
                            this.genericListComponent.reload();
                        })
                    }
                });
            }
            
           return validActions;
        }
    }

    addItem(){
        return this.router.navigate(['./addTodo'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve'
        });
    }
}