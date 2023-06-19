import { Test, TestingModule } from '@nestjs/testing';
import {
  CACHE_MANAGER,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { NotNullException } from 'src/common/notnull.exception';
import { TeamsDTO } from './dto/teams.dto';
const teams = {
  teamName: 'etesting',
  id: 1,
  stepCount: 4,
  score: 2,
  createdDate: null,
  deletedDate: null,
  employee: [],
  //{
  //     id: 1,
  //     Emp_name: "samy",
  //     age: 30,
  //     experience: 5,
  //     email: "SAM@gmail.com",
  //     designation: "software engineer",
  //     Company_name: "hcl"
  // },
};

describe.only('Given TeamsService', () => {
  let teamsService: TeamsService;
  let teamsRepository: TeamsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: TeamsRepository,
          useFactory: () => ({
            fetchAllTeams: jest.fn(() => []),
            addTeams: jest.fn(() => []),
            getbyTeamsid: jest.fn(() => []),
            updateTeams: jest.fn(() => []),
            deleteTeams: jest.fn(() => []),
            createcounters: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    teamsRepository = moduleRef.get<TeamsRepository>(TeamsRepository);
    teamsService = moduleRef.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(teamsService).toBeDefined();
  });

  describe('when fetchAllTeams', () => {
    let fetchAllTeamsSpy;
    it('should return correct result', async () => {
      fetchAllTeamsSpy = jest
        .spyOn(teamsRepository, 'find')
        .mockResolvedValue([teams]);
      const res = await teamsService.fetchAllTeams();
      expect(res).toEqual(teams);
      expect(fetchAllTeamsSpy).toHaveBeenCalled();
      expect(fetchAllTeamsSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('when getbyTeamsid', () => {
    let getbyTeamsidSpy;
    it('should return correct result', async () => {
      getbyTeamsidSpy = jest
        .spyOn(teamsRepository, 'find')
        .mockResolvedValue([teams]);
      const res = await teamsService.getbyTeamsid(3);
      expect(res).toEqual(teams);
      expect(getbyTeamsidSpy).toHaveBeenCalled();
      expect(getbyTeamsidSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when addTeams()', () => {
    describe('AND it is sucess', () => {
      let saveSpy, res;
      beforeEach(async () => {
        saveSpy = jest.spyOn(teamsRepository, 'save').mockResolvedValue(teams);
        res = await teamsService.addTeams(teams);
      });
      it('should return data', () => {
        expect(res).toEqual(teams);
      });
      it('should have called saveSpy', async () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalledTimes(1);
      });
    });
    describe('AND it is failed', () => {
      describe("AND error code='23505'", () => {
        it('should throw "ConflictException', async () => {
          let saveSpy;
          try {
            saveSpy = jest.spyOn(teamsRepository, 'save').mockRejectedValue({
              code: '23505',
              message: 'user already exist',
            });
            const res = await teamsService.addTeams(teams);
          } catch (err) {
            expect(err).toBeInstanceOf(ConflictException);
            expect(saveSpy).toHaveBeenCalled();
          }
        });
      });

      describe('AND if error code="23502"', () => {
        it('should throw "NotNullException', async () => {
          let saveSpy;
          try {
            saveSpy = jest
              .spyOn(teamsRepository, 'save')
              .mockRejectedValue({ code: '23502', message: 'not null' });
            const res = await teamsService.addTeams(teams);
          } catch (err) {
            expect(err).toBeInstanceOf(NotNullException);
            expect(saveSpy).toHaveBeenCalled();
          }
        });
      });
      describe('AND for any other errors', () => {
        it('should throw "InternalServerErrorException"', async () => {
          let saveSpy;
          try {
            saveSpy = jest
              .spyOn(teamsRepository, 'save')
              .mockRejectedValue(new Error('Error'));
            await teamsService.addTeams(teams);
          } catch (err) {
            expect(err).toBeInstanceOf(InternalServerErrorException);
          }
        });
      });
    });
  });
  describe('when updateTeams', () => {
    const teamsnw = {
      teamName: 'etesting',
      id: 1,
      stepCount: 4,
      score: 2,
      createdDate: null,
      deletedDate: null,
      employee: [
        {
          id: 1,
          Emp_name: 'samy',
          age: 30,
          experience: 5,
          email: 'SAM@gmail.com',
          designation: 'software engineer',
          Company_name: 'hcl',
        },
      ],
    };
    let updateTeamsSpy;
    it('should return correct result', async () => {
      updateTeamsSpy = jest
        .spyOn(teamsRepository, 'save')
        .mockResolvedValue(teams);
      const res = await teamsService.updateTeams(teams, 1);
      expect(res).toEqual(teams);
      expect(updateTeamsSpy).toHaveBeenCalled();
      expect(updateTeamsSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('when deleteTeams', () => {
    let deleteTeamsSpy;
    it('should return correct result', async () => {
      deleteTeamsSpy = jest
        .spyOn(teamsRepository, 'find')
        .mockResolvedValue([teams]);
      const res = await teamsService.deleteTeams(3);
      expect(res).toEqual(teams);
      expect(deleteTeamsSpy).toHaveBeenCalled();
      expect(deleteTeamsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
