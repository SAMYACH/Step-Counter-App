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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const exception_filter_1 = require("../common/exception.filter");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth-guard");
const roles_guards_1 = require("./guards/roles.guards");
const roles_decorators_1 = require("./decorators/roles.decorators");
const role_enum_1 = require("./role.enum");
let UserController = class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    async fetchAllUser() {
        return await this.userServices.getalluser();
    }
    async fetchUsersWithProfile() {
        return await this.userServices.getUserWithProfile();
    }
    async fetchAllProfiles() {
        return await this.userServices.getAllProfile();
    }
    async registerUser(user) {
        return await this.userServices.registerUser(user);
    }
    async login(user) {
        return await this.userServices.login(user);
    }
    async getbyUserid(id) {
        return await this.userServices.getbyuserid(id);
    }
    updateUser(UserDTO, id) {
        return this.userServices.updateUser(+id, UserDTO);
    }
    deleteUser(userid) {
        return this.userServices.deleteUser(userid);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User Fetched Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'no Data found',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAllUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'user with Profile Fetched Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'no Data found',
    }),
    (0, roles_decorators_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guards_1.RolesGuard),
    (0, common_1.Get)('/profiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchUsersWithProfile", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Profile Fetched Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'no Data found',
    }),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Get)('/allprofiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAllProfiles", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'User Added Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Login Sucessfully',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User Fetched Sucessfully for id',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'no Data found for given id',
    }),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getbyUserid", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'Updated Sucessfully' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'This is a internel server error.try again later ',
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'Deleted Sucessfully' }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User Not Found',
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
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map