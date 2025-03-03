import { injectable } from "tsyringe";
import { ITokenRepository } from "../../../../domain/repositories/redis/tokenRepository.interface";
import { client } from "../../../cache/redis.client";

@injectable()
export class TokenRepository implements ITokenRepository {
  async blackListToken(token: string, expiresIn: number): Promise<void> {
    await client.set(token, "blacklisted", { EX: expiresIn });
  }

  async isTokenBlackListed(token: string): Promise<boolean> {
    const result = await client.get(token);
    return result === "blacklisted";
  }
}