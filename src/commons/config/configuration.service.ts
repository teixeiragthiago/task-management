import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get databaseType(): string {
        return this.configService.get<string>('')
    }

    get databaseHost(): string {
        return this.configService.get<string>('')
    }

    get databasePort(): number {
        return Number(this.configService.get<number>(''))
    }

    get databaseUsername(): string {
        return this.configService.get<string>('')
    }   

    get databasePassword(): string {
        return this.configService.get<string>('')
    }

    get databaseName(): string {
        return this.configService.get<string>('')
    }

    get databaseBoolean(): boolean {
        return Boolean(this.configService.get<boolean>(''))
    }

    get databaseSynchronize(): boolean {
        return Boolean(this.configService.get<boolean>(''))
    }
}