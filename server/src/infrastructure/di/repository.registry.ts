import { container } from "tsyringe";
import { IAdminRepository } from "../../domain/repositories/admin/adminRepository.interface";
import { AdminRepository } from "../database/repositories/admin/admin.repository";
import { IClientRepository } from "../../domain/repositories/client/clientRepository.interface";
import { ClientRepository } from "../database/repositories/client/client.repository";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { VendorRepository } from "../database/repositories/vendor/vendor.repository";
import { IRefreshTokenRepository } from "../../domain/repositories/auth/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../database/repositories/auth/refresh-token-repository";
import { TokenRepository } from "../database/repositories/redis/redis-token.repository";
import { ITokenRepository } from "../../domain/repositories/redis/tokenRepository.interface";
import { IVerificationRequestRepository } from "../../domain/repositories/verificationRequest/verificatioReqRepository.interface";
import VerificationRequestRepository from "../database/repositories/verificationRequest/verificationRequest.repository";
export class RepositoryRegisrty {
  static registerRepositories(): void {
    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IClientRepository>("IClientRepository", {
      useClass: ClientRepository,
    });

    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<TokenRepository>("ITokenRepository",{
        useClass: TokenRepository
    });

    container.register<IVerificationRequestRepository>("IVerificationRequestRepository",{
      useClass: VerificationRequestRepository
    })
  
  }
}
