import { commands } from '../commands';
import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ModalForm } from '../form_func';

export const FORMS = function() {
    return new ConfiguratorSub("§fForms")
        .setCallback((player)=>{
            let db = new Database("Forms");
        })
}