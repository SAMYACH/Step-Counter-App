"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const teams_repository_1 = require("./teams.repository");
const teams_Controller_1 = require("./teams.Controller");
const teams_service_1 = require("./teams.service");
const typeorm_1 = require("@nestjs/typeorm");
const teams_entity_1 = require("./teams.entity");
const axios_1 = require("@nestjs/axios");
const logger_middleware_middleware_1 = require("../common/middleware/logger-middleware.middleware");
const employee_entity_1 = require("./employee.entity");
let TeamsModule = class TeamsModule {
    configure(consumer) {
        consumer.apply(logger_middleware_middleware_1.LoggerMiddleware).forRoutes(teams_Controller_1.TeamsController);
    }
};
TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_Controller_1.TeamsController],
        providers: [
            {
                provide: teams_service_1.TeamsService,
                useClass: teams_service_1.TeamsService,
            },
            teams_repository_1.TeamsRepository,
        ],
        imports: [axios_1.HttpModule, typeorm_1.TypeOrmModule.forFeature([teams_entity_1.Teams, employee_entity_1.Employee])],
        exports: [],
    })
], TeamsModule);
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map