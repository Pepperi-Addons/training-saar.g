import { Injectable } from '@angular/core';
import { AddonService } from './addon.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private addonService: AddonService
  ) { }

  getTodos(options?: {where?: string}){
    return this.get(options);
  }
  
  getTodo(todoUUID: string){
    const options = {Key: todoUUID};

    return this.addonService.pepGet(`/addons/api/${this.addonService.addonUUID}/api/getByKey`, {
      params: options
    }).toPromise();
  }

  private get(options){
    return this.addonService.pepGet(`/addons/api/${this.addonService.addonUUID}/api/todos`, {
      params: options
    }).toPromise();
  }

  upsertTodos(todos){
    if(!Array.isArray(todos)){
      todos = [todos];
    }
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined, todos);
  }
}
