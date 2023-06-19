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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teams_entity_1 = require("./teams.entity");
const notnull_exception_1 = require("../common/notnull.exception");
const employee_entity_1 = require("./employee.entity");
const teams_constant_1 = require("./teams.constant");
let TeamsService = class TeamsService {
    constructor(teamsRepo, EmployeeRepo) {
        this.teamsRepo = teamsRepo;
        this.EmployeeRepo = EmployeeRepo;
        this.logger = new common_1.Logger();
        console.log('In Services');
    }
    async fetchAllTeams() {
        const res = await this.teamsRepo.find();
        if (res.length === 0) {
            throw new common_1.NotFoundException(common_1.HttpStatus.NOT_FOUND, teams_constant_1.messages.notFound);
        }
        else {
            return res;
        }
    }
    async addTeams(teamsDTO) {
        try {
            const res = await this.teamsRepo.save(teamsDTO);
            return res;
        }
        catch (Error) {
            console.log(Error);
            if (Error.code === '23505') {
                throw new common_1.ConflictException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Teams already exist',
                });
            }
            else if (Error.code === '23502') {
                throw new notnull_exception_1.NotNullException('Teams name should not be null');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async getbyTeamsid(id) {
        const res = await this.teamsRepo.findOneBy({ id: id });
        if (!res) {
            throw new common_1.HttpException('Teams not found for given id', common_1.HttpStatus.NOT_FOUND);
        }
        return res;
    }
    async updateTeams(teamsDTO, id) {
        const todo = await this.teamsRepo.findOneOrFail({
            where: { id },
        });
        if (!todo.id) {
            console.error("Todo doesn't exist");
        }
        await this.teamsRepo.update(id, teamsDTO);
        return await this.teamsRepo.findOne({
            where: { id },
        });
    }
    async deleteTeams(id) {
        const result = await this.teamsRepo.delete({ id: id });
        if (!result) {
            throw new common_1.HttpException('Not Teams id found', common_1.HttpStatus.NOT_FOUND);
        }
        else if (result.affected > 0) {
            return result;
        }
    }
    async createcounters(teamsDTO, id) {
        const team = await this.teamsRepo.findOne({
            where: { id: id },
        });
        console.log(team);
        if (team == null) {
            const res = await this.teamsRepo.save(teamsDTO);
            console.log('Teams step count started', res);
            return `Step Counter: ` + 1 + ``;
        }
        else {
            teamsDTO.stepCount += team.stepCount;
            console.log('Step count ojnnb: ', teamsDTO.stepCount);
            const res = await this.teamsRepo.update(id, teamsDTO);
            console.log('Step count: ', teamsDTO.stepCount);
            return `Step Counter: ` + res + ``;
        }
    }
};
TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teams_entity_1.Teams)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeamsService);
exports.TeamsService = TeamsService;
//# sourceMappingURL=teams.service.js.map