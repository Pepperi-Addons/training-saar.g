
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { PapiClient, Relation } from '@pepperi-addons/papi-sdk'
import {IPepGenericFormDataView } from '@pepperi-addons/ngx-composite-lib/generic-form';


export async function install(client: Client, request: Request): Promise<any> {
    const papiClient = new PapiClient({
        token: client.OAuthAccessToken,
        baseURL: client.BaseURL,
        addonUUID: client.AddonUUID,
        addonSecretKey: client.AddonSecretKey,
        actionUUID: client['ActionUUID']
    });

    await papiClient.addons.data.schemes.post({
        Name: "Todos",
        Type: "data",
        Fields:{
            Name: {
                Type: "String",
                Indexed: true
            },
            Description: {
                Type: "String",
            },
            DueDate: {
                Type: "DateTime"
            },
            Completed: {
                Type: "Bool"
            }
        }
    });
    const fields1: any[] = [{
            FieldID: 'GeneralInformation',
            Type: 'Separator',
            Title: 'General Information 1',
            Mandatory: false,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 0
                },
                Size: {
                    Width: 2,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'ItemExternalID',
            Type: 'TextBox',
            Title: 'Item Code',
            Mandatory: true,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'ActionDateTime',
            Type: 'DateAndTime',
            Title: 'Action Date Time',
            Mandatory: false,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 1,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'WrntyID',
            Type: 'LimitedLengthTextBox',
            Title: 'ID',
            Mandatory: false,
            ReadOnly: true,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 2
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        }
    ]

    const fields2: any[] = [
        {
            FieldID: 'GeneralInformation',
            Type: 'Separator',
            Title: 'General Information 2',
            Mandatory: false,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 0
                },
                Size: {
                    Width: 2,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'ItemExternalID',
            Type: 'TextBox',
            Title: 'Item Code',
            Mandatory: true,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'ActionDateTime',
            Type: 'DateAndTime',
            Title: 'Action Date Time',
            Mandatory: false,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 1,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'WrntyID',
            Type: 'LimitedLengthTextBox',
            Title: 'ID',
            Mandatory: false,
            ReadOnly: true,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 2
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        }
    ]

    const TrainingFields: any[] = [
        {
            FieldID: 'GeneralInformation',
            Type: 'Separator',
            Title: 'Todos',
            Mandatory: false,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 0
                },
                Size: {
                    Width: 2,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'MaxTodos',
            Type: 'TextBox',
            Title: 'Max number of todos',
            Mandatory: true,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'MinimalDateTime',
            Type: 'DateAndTime',
            Title: 'Minimal Date Time',
            Mandatory: true,
            ReadOnly: false,
            Layout: {
                Origin: {
                    X: 1,
                    Y: 1
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        },
        {
            FieldID: 'NumberOfActiveTodos',
            Type: 'LimitedLengthTextBox',
            Title: 'Number of active todos',
            Mandatory: false,
            ReadOnly: true,
            Layout: {
                Origin: {
                    X: 0,
                    Y: 2
                },
                Size: {
                    Width: 1,
                    Height: 0
                }
            },
            Style: {
                Alignment: {
                    Horizontal: 'Stretch',
                    Vertical: 'Stretch'
                }
            }
        }
    ]
    const dataview1: IPepGenericFormDataView = {
        UID: 'ABCD-DCBA-FGHD-POLK',
        Type: 'Form',
        Hidden: false,
        Columns: [{}],
        Context: {
            Object: {
                Resource: 'transactions',
                InternalID: 290714,
                Name: '1OlegImpExpרg'
            },
            Name: 'OrderCartItemForm2',
            ScreenSize: 'Tablet',
            Profile: {
                InternalID: 46273,
                Name: 'Rep2'
            }
        },
        Fields: fields1,
        Rows: []
    };

    const dataview2: IPepGenericFormDataView = {
        UID: 'ABCD-DCBA-FGHD-POLJ',
        Type: 'Form',
        Hidden: false,
        Columns: [{}],
        Context: {
            Object: {
                Resource: 'None',
                InternalID: 290715,
                Name: '1OlegImpExpרg1'
            },
            Name: 'OrderCartItemForm1',
            ScreenSize: 'Tablet',
            Profile: {
                InternalID: 46274,
                Name: 'Rep1'
            }
        },
        Fields: fields2,
        Rows: []

    };

    const trainingDataView: IPepGenericFormDataView = {
        UID: 'ABCD-DCBA-FGHD-POLK',
        Type: 'Form',
        Hidden: false,
        Columns: [{}],
        Context: {
            Object: {
                Resource: "None",
                InternalID: 1,
            },
            Name: 'Training data view',
            ScreenSize: 'Tablet',
            Profile: {
                InternalID: 1,
                Name: 'MyProfile'
            }
        },
        Fields: TrainingFields,
        Rows: []
    };

    const relations: Relation[] = [
        {
            RelationName: "VarSettings",
            AddonUUID: "f6458728-25fd-469d-9a20-73a99265fe52", // The hosted addon's UUID.
            Name: "VarSettings_Training",
            Description: "Todos addon settings relation",
            Type: "AddonAPI",
            AddonRelativeURL: "/api/get_current_values?relation=training", // The endpoint to which VarSettings will call to 
                                                                        // GET the current values, and to POST new ones.
                                                                        
            Title: "ToDo", //The title of the tab in which the fields will appear
            DataView: trainingDataView
        },
        {
            RelationName: "VarSettings",
            AddonUUID: "f6458728-25fd-469d-9a20-73a99265fe52", // The hosted addon's UUID.
            Name: "VarSettings1",
            Description: "The first Var Settings relation",
            Type: "AddonAPI",
            AddonRelativeURL: "/api/get_current_values?relation=first", // The endpoint to which VarSettings will call to 
                                                                        // GET the current values, and to POST new ones.
                                                                        
            Title: "Crazy settings", //The title of the tab in which the fields will appear
            DataView: dataview1
        },
        {
            RelationName: "VarSettings",
            AddonUUID: "f6458728-25fd-469d-9a20-73a99265fe52", // The hosted addon's UUID.
            Name: "VarSettings2",
            Description: "The second Var Settings relation",
            Type: "AddonAPI",
            AddonRelativeURL: "/api/get_current_values?relation=second", // The endpoint to which VarSettings will call to 
                                                                         // GET the current values, and to POST new ones.

            Title: "Boring settings", //The title of the tab in which the fields will appear
            DataView: dataview2,
        }
    ]

    relations.forEach(async relation => {
        await papiClient.addons.data.relations.upsert(relation)
    });
    

    return {success:true,resultObject:{}}
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}