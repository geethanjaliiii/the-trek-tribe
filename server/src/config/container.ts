import "reflect-metadata"
import { container } from "tsyringe"
import { IUserRepository } from "../application/interfaces/repositories/IUserRepository"
import UserRe
container.register<IUserRepository>('IUserRepository',{useClass:UserRe})