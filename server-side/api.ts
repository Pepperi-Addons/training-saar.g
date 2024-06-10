import TodosService from './todos.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function todos(client: Client, request: Request) {
    const todosService = new TodosService(client)
    switch (request.method){
        case "GET": {
            return await todosService.getTodos(request.query);
        }
        case "POST": {
            return await todosService.upsertTodo(request.body);
        }
        default:{
            throw new Error(`Unsupported method: ${request.method}`);
        }
    }
}



export async function get_by_key(client: Client, request: Request) {
    const todosService = new TodosService(client)
    switch (request.method){
        case "GET": {
            return todosService.getTodoByKey(request.query);
        }
        default:{
            throw new Error(`Unsupported method: ${request.method}`);
        }
    }
}

export async function set_current_values(client: Client, request: Request){
       
    switch (request.method){
        case "POST": {
            console.log(request.query);

            const fields: {Id: string, Value: string}[] = request.body.Fields;
            fields.forEach(field => {
                console.log(JSON.stringify(field));
            });
            return;
        }
        default:{
            throw new Error(`Unsupported method: ${request.method}`);
        }
    }
}

export async function get_current_values(client: Client, request: Request){             
    switch (request.method){
        case "GET": {
            console.log(request.query);
            if(request.query.relation === "first"){
                return {
                    GeneralInformation: '',
                    ItemExternalID: 'firstitem',
                    ActionDateTime: '2111-11-11T11:11:11Z',
                    WrntyID: '272764514',
                }
            }       
            else if(request.query.relation === "second"){
                return {
                    GeneralInformation: '',
                    ItemExternalID: 'seconditem',
                    ActionDateTime: '2222-02-22T22:22:22Z',
                    WrntyID: '272764525',
                }
            }else if(request.query.relation === "training"){
                return {
                    GeneralInformation: '',
                    MaxTodos: '200',
                    MinimalDateTime: '2020-02-22T22:22:22Z',
                    NumberOfActiveTodos: '17',
                }
            }
        } case "POST": {
            console.log(JSON.stringify(request.body));

            return;
        }

        default:{
            throw new Error(`Unsupported method: ${request.method}`);
        }
    }
}

