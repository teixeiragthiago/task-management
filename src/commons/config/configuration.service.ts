import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get databaseType(): string {
        return this.configService.get<string>('DATABASE_TYPE')
    }

    get databaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST')
    }

    get databasePort(): number {
        return Number(this.configService.get<number>('DATABASE_PORT'))
    }

    get databaseUsername(): string {
        return this.configService.get<string>('DATABASE_USER')
    }   

    get databasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD')
    }

    get databaseName(): string {
        return this.configService.get<string>('DATABASE_PASSWORD')
    }

    get databaseAutoLoadEntities(): boolean {
        return true;
    }

    get databaseSynchronize(): boolean {
        return Boolean(this.configService.get<boolean>('DATABASE_SYNCHRONIZE'))
    }
}