import { Courant } from "./compteCourant.model";
import { Epargne } from "./compteEpargne.model";

export class Client {
    id_client: number;
    firstname: string;
    name: string;
    email: string;
    password: string;
    tel: string;
    compteCourant: Courant;
    comptesEpargne: Epargne[];

    Client(){
        
    }
}