import {  model } from "mongoose";
import { IRefreshToken } from "../../../domain/entities/refresh-token.entity";
import { RefreshTokenSchema } from "../mongoDB/schemas/RefreshToken.schema";

export interface IRefreshTokenModel extends IRefreshToken , Document{};

export const RefreshTokenModel = model<IRefreshTokenModel>(
    'RefreshToken',
    RefreshTokenSchema
)