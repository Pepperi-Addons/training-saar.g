import { Injectable } from '@angular/core';
import { AddonService } from './addon.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private addonService: AddonService
  ) { }

  getTodos(){
    return this.get({});
  }
  
  getTodo(todoUUID: string){
    return this.get({
      where: `Key = '${todoUUID}'`
    });
  }

  private get(options){
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').get(options)
  }

  upsertTodos(todos){
    if(!Array.isArray(todos)){
      todos = [todos];
    }
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined, todos);
  }
}
