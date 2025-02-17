import { IEntity } from "../interfaces/IEntity"
export class User implements IEntity {
  constructor(
    public readonly _id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: "user" | "admin" | "vendor",
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  //factory method -insead of creating manually
  //Omit- remove id,created at,and updated at
  static create(props:Omit<User,'id'| 'createdAt'|'updatedAt'>){
    return new User(
        crypto.randomUUID(),
        props.email,
        props.password,
        props.name,
        props.role,
        new Date(),
        new Date()
    )
  }
}
