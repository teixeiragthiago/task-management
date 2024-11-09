import { Module } from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";

@Module({
    imports: [ConfigModule],
    providers: [ConfigurationService],
    exports: [ConfigurationService]
})

export class ConfigModule {}