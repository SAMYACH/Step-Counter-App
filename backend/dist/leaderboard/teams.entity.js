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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const employee_entity_1 = require("../leaderboard/employee.entity");
const typeorm_1 = require("typeorm");
let Teams = class Teams {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Teams.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'team_name',
        type: 'varchar',
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", String)
], Teams.prototype, "teamName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stepCount', default: 1 }),
    __metadata("design:type", Number)
], Teams.prototype, "stepCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'score', nullable: true }),
    __metadata("design:type", Number)
], Teams.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Teams.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Teams.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.teams, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Teams.prototype, "employee", void 0);
Teams = __decorate([
    (0, typeorm_1.Entity)('teams')
], Teams);
exports.Teams = Teams;
//# sourceMappingURL=teams.entity.js.map