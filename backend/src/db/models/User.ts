import { ObjectId } from "mongodb";
import { getCollection } from "..";
import { config } from "../../config";
import {createHash} from "crypto";

export class User{
    id?: ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: string[];

    constructor(first_name: string, last_name: string, email: string, password: string, roles?: string[], id?: string){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        
        if(roles) this.roles = roles;
        else this.roles = ['user'];

        if(id) this.id = new ObjectId(id);
    }

    async save(){
        const collection = await getCollection(config.collections.USER_COLLECTION);
        const hash = createHash('SHA256');
        hash.update(this.password);
        const result = await collection.insertOne({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email.toLowerCase(),
            password: hash.digest('hex'),
            roles: this.roles
        });
        this.id = result.insertedId;
    }

    async update(){
        if(this.id){
            const collection = await getCollection(config.collections.USER_COLLECTION);
            const hash = createHash('SHA256');
            hash.update(this.password);
            await collection.updateOne({id: this.id}, {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email.toLowerCase(),
                password: hash.digest('hex'),
                roles: this.roles
            })
        }
        else throw new Error("Cannot update user without id");
    }

    static async login(email: string, password: string): Promise<User> {
        const collection = await getCollection(config.collections.USER_COLLECTION);
        const hash = createHash('SHA256');
        hash.update(password);

        const user = await collection.findOne({email, password: hash.digest('hex')});
        if(!user) throw new Error("Invalid username/password")

        return new User(user.first_name, user.last_name, user.email, password, user.roles, String(user._id));
    }
}