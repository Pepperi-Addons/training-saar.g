import TodosService from './todos.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function todos(client: Client, request: Request) {
    const todosService = new TodosService(client)
    switch (request.method){
        case "GET": {
            return todosService.getTodos(request.query);
        }
        case "POST": {
            return todosService.upsertTodo(request.body);
        }
        default:{
            throw new Error(`Unsupported method: ${request.method}`);
        }
    }
}

export async function getByKey(client: Client, request: Request) {
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

