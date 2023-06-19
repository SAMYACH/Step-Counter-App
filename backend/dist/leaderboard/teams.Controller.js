"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teams_service_1 = require("./teams.service");
const exception_filter_1 = require("../common/exception.filter");
const teams_dto_1 = require("./dto/teams.dto");
const jwt_auth_guard_1 = require("../User/guards/jwt-auth-guard");
const roles_guards_1 = require("../User/guards/roles.guards");
const role_enum_1 = require("../User/role.enum");
const roles_decorators_1 = require("../User/decorators/roles.decorators");
let TeamsController = class TeamsController {
    constructor(teamsServices) {
        this.teamsServices = teamsServices;
    }
    async listTeams() {
        console.log('In Controller');
        return await this.teamsServices.fetchAllTeams();
    }
    async CreateTeams(teamsDTO) {
        return await this.teamsServices.addTeams(teamsDTO);
    }
    async getbyTeamsid(id) {
        console.log('In controller');
        return await this.teamsServices.getbyTeamsid(id);
    }
    updateTeams(teamsDTO, id) {
        return this.teamsServices.updateTeams(teamsDTO, id);
    }
    deleteTeams(id) {
        return this.teamsServices.deleteTeams(id);
    }
    async createcounters(teamsDTO, id) {
        console.log('steps can be accumulated for a team of one or multiple employees');
        return await this.teamsServices.createcounters(teamsDTO, id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Teams Fetched Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No data found',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "listTeams", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Teams Added Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, roles_decorators_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guards_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teams_dto_1.TeamsDTO]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "CreateTeams", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: 'teams Fetched Sucessfully for id',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No data found for given id',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getbyTeamsid", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'Updated Sucessfully' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teams_dto_1.TeamsDTO, Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "updateTeams", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'Deleted Sucessfully' }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'teams Not Found',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "deleteTeams", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'created a new counter Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No data found',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [teams_dto_1.TeamsDTO, Number]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "createcounters", null);
TeamsController = __decorate([
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('teams'),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
exports.TeamsController = TeamsController;
//# sourceMappingURL=teams.Controller.js.map