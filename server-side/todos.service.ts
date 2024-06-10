import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import { v4 as uuid } from 'uuid';

const TABLE_NAME = "Todos";
const VALID_FIELDS = ["Name", "Description", "DueDate", "Completed", "Key", "Hidden"];

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
    
    async getTodos(options) {
        return await this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).find(options);
    }

    getTodoByKey(options){
        if(objectHasOnlyKeyField(options)){
            return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).key(options.Key).get();
        }
        else{
            throw new Error(`No key sent.`);
        }
    }

    async upsertTodo(body: any) {
        //Handling a single todo as an array of size 1 will allow for a general processing.
        if(!Array.isArray(body)){
            body = [body];
        }
        //Validate that each element is valid
        body.forEach(doc => {
            if(!Object.keys(doc).every(v => VALID_FIELDS.includes(v))){
                throw new Error(`Unsupported field found. Supported fields are: ${VALID_FIELDS}`);
            }
        });

        let promises: Array<Promise<any>> = []
        body.forEach(doc => {
            if(doc.DueDate === ""){
                doc.DueDate = null;
            }
    
            if(!doc.Key){
                promises.push(this.insertTodo(doc));
            } 
            else {
                promises.push(this.updateTodo(doc));
            }
        });

        return await Promise.all(promises);
    }

    async updateTodo(doc: any) {
        const doesKeyExist: boolean = (await this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).find(doc.Key)).length > 0;

        if(doesKeyExist){
            return await this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(doc);
        }
        else{
            throw new Error(`Could not find item with key ${doc.Key}`);
        }
    }

    async insertTodo(doc: any) {
        doc.Key = uuid();
        return await this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(doc);
    }
}

export default TodosService;

function objectHasOnlyKeyField(options: any) {
    return (Object.keys(options).length == 1 && options.Key)
}
