/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { TeamsController } from './teams.Controller';
import { TeamsService } from './teams.service';

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

describe('Given Teams Controller', () => {
  let teamsController: TeamsController;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        {
          provide: TeamsService,
          useFactory: () => ({
            listTeams: jest.fn(() => []),
            createcounters: jest.fn(() => []),
            getbyTeamsid: jest.fn(() => []),
            updateTeams: jest.fn(() => []),
            deleteTeams: jest.fn(() => []),
            CreateTeams: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    teamsController = moduleRef.get<TeamsController>(TeamsController);
    teamsService = moduleRef.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(teamsController).toBeDefined();
  });
  describe('when listTeams()', () => {
    describe('AND when there is data', () => {
      it('should return correct data', async () => {
        const listTeamsSpy = jest
          .spyOn(teamsService, 'fetchAllTeams')
          .mockResolvedValue([teams]);
        const res = await teamsController.listTeams();
        expect(res).toEqual([teams]);
        expect(listTeamsSpy).toHaveBeenCalled();
        expect(listTeamsSpy).toHaveBeenCalledTimes(1);
      });
    });
    describe('AND when there is no  data', () => {
      it('should return correct data', async () => {
        const listTeamsSpy = jest
          .spyOn(teamsService, 'fetchAllTeams')
          .mockResolvedValue([]);
        const res = await teamsController.listTeams();
        expect(res).toEqual([]);
        expect(listTeamsSpy).toHaveBeenCalled();
      });
    });
  });

  describe('when getbyTeamsid(1)', () => {
    it('should return data', async () => {
      const fetchbyidSpy = jest
        .spyOn(teamsService, 'getbyTeamsid')
        .mockResolvedValue(teams);
      const res = await teamsController.getbyTeamsid(1);
      expect(res).toEqual(teams);
      expect(fetchbyidSpy).toHaveBeenCalled();
      expect(fetchbyidSpy).toHaveBeenCalledTimes(1);
      expect(fetchbyidSpy).toHaveBeenCalledWith(1);
    });
  });
  describe('when CreateTeams()', () => {
    it('should return new teams', async () => {
      const CreateTeamsSpy = jest
        .spyOn(teamsService, 'addTeams')
        .mockResolvedValue(teams);
      const res = await teamsController.CreateTeams(teams);
      expect(res).toEqual(teams);
      expect(CreateTeamsSpy).toHaveBeenCalled();
      expect(CreateTeamsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when deleteTeams()', () => {
    it('should delete correct Teams', async () => {
      const deleteTeamsSpy = jest
        .spyOn(teamsService, 'deleteTeams')
        .mockResolvedValue(teams);
      const res = await teamsController.deleteTeams(1);
      expect(res).toBeUndefined();
      expect(deleteTeamsSpy).toHaveBeenCalled();
      expect(deleteTeamsSpy).toHaveBeenCalledTimes(1);
      expect(deleteTeamsSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('when updateTeams()', () => {
    it('should return updated Teams', async () => {
      const updateTeamsSpy = jest
        .spyOn(teamsService, 'updateTeams')
        .mockResolvedValue(teams);
      const res = await teamsController.updateTeams(teams, 1);
      expect(res).toEqual(teams);
      expect(updateTeamsSpy).toHaveBeenCalled();
      expect(updateTeamsSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('when createcounters()', () => {
    const id = 1;
    const data = `Step Counter: ` + teams + ``;
    it('should return new create counters teams', async () => {
      const createcountersSpy = jest
        .spyOn(teamsService, 'createcounters')
        .mockResolvedValue(data);
      const res = await teamsController.createcounters(teams, id);
      expect(res).toEqual(teams);
      expect(createcountersSpy).toHaveBeenCalled();
      expect(createcountersSpy).toHaveBeenCalledTimes(1);
    });
  });
});
