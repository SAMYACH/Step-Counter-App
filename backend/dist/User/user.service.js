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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const profile_entity_1 = require("./profile/profile.entity");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("./user.repository");
let UserService = UserService_1 = class UserService {
    constructor(userRepo, profileRepo, jwtService) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async getalluser() {
        const res = await this.userRepo.find();
        if (res.length === 0) {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No Data found',
            });
        }
        return res;
    }
    async getUserWithProfile() {
        return await this.userRepo.find();
    }
    async registerUser(user) {
        try {
            const salt = await bcrypt.genSalt();
            console.log(salt);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            console.log('hashedPassword....', hashedPassword);
            user.password = hashedPassword;
            const res = await this.userRepo.save(user);
            if (res === null || res === void 0 ? void 0 : res.id) {
                const msg = `User registered sucessfully with id: ${res.id}`;
                this.logger.log(msg);
                return msg;
            }
            else {
                const msg = 'Something went wrong,try again after sometime';
                this.logger.error(msg);
                throw new common_1.InternalServerErrorException(msg);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async login(user) {
        try {
            const userDetail = await this.userRepo.findOneByOrFail({
                emailId: user.emailId,
            });
            if (userDetail &&
                (await bcrypt.compare(user.password, userDetail.password))) {
                const jwtPayload = { emailId: userDetail.emailId };
                const token = await this.jwtService.sign(jwtPayload);
                return { token };
            }
            else {
                const msg = 'Invalid credential';
                this.logger.warn(msg);
                throw new common_1.UnauthorizedException(msg);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getbyuserid(id) {
        const res = await this.userRepo.findOneBy({ id: id });
        if (!res) {
            throw new common_1.HttpException('User not found for given id', common_1.HttpStatus.NOT_FOUND);
        }
        return res;
    }
    async updateUser(id, UserDTO) {
        const findData = await this.userRepo.findOne({ where: { id } });
        if (!findData)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        const updateRes = await this.userRepo.save(Object.assign(Object.assign({}, findData), UserDTO));
        if (!updateRes)
            throw new common_1.HttpException('Something went wrong.try again', common_1.HttpStatus.BAD_REQUEST);
        return {
            response: updateRes,
            message: 'User updated sucessfully',
            status: common_1.HttpStatus.OK,
        };
    }
    async deleteUser(userid) {
        const userProfile = await this.userRepo.findOneBy({ id: userid });
        const res = await this.profileRepo.delete(userProfile.profile.id);
        if (res.affected === 0) {
            throw new common_1.HttpException('User not found for delete for given id', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return res;
        }
    }
    async getAllProfile() {
        return await this.profileRepo.find();
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map