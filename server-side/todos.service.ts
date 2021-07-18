import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import { v4 as uuid } from 'uuid';

const TABLE_NAME = "Todos";
const VALID_FIELDS = ["Name", "Description", "DueDate", "Completed"]

class TodosService {
    private papiClient: PapiClient;
    private addonUUID: string;
    
    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            token: client.OAuthAccessToken,
            baseURL: client.BaseURL,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client['ActionUUID']
        });

        this.addonUUID = client.AddonUUID;
    }
    
    getTodos(options) {
        return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).find(options);
    }

    upsertTodo(body: any) {
        //TODO validate behavior with invalid fields
        if(!Object.keys(body).every(v => VALID_FIELDS.includes(v))){
            throw new Error(`Unsupported field found. Supported fields are: ${VALID_FIELDS}`);
        //TODO Deal with an array of todos
        } 
        else if(!body.Key){
            return this.insertTodo(body);
        } 
        else {
            return this.updateTodo(body);
        }
    }

    async updateTodo(body: any) {
        const doesKeyExist: boolean = (await this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).find(body.Key)).length > 0;

        if(doesKeyExist){
            return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(body);
        }
        else{
            throw new Error(`Could not find item with key ${body.Key}`);
        }
    }

    insertTodo(body: any) {
        body.Key = uuid();
        return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(body);
    }
}

export default TodosService;