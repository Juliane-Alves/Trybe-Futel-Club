import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesModels from '../database/models/MatchesModels';

chai.use(chaiHttp);

const { expect } = chai;

const mock = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "Grêmio"
    }
}

describe('Verificando a rota matchs', () => {
  describe('Espera a requisição valida', () => {

    before(() => {
      sinon.stub(MatchesModels, 'findAll').resolves([mock] as unknown as MatchesModels[] );
    });

    after(() => {
      (MatchesModels.findAll as sinon.SinonStub).restore();
    });

    it('Verica se retorna um array de times.', async () => {
      const responseData = await chai.request(app).get('/matches');;
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body[0]).to.have.keys('id','homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
    });
  });

  describe('Verifica se a falha na requisição da camada Model', () => {

    before(() => {
      sinon.stub(MatchesModels, 'findAll').resolves(undefined);
    });

    after(() => {
      (MatchesModels.findAll as sinon.SinonStub).restore();
    });

    it(' Verifica se retorna uma string vazia.', async () => {
      const responseData = await chai.request(app).get('/matches');
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body).to.be.equal('');
    });
  })
}); 

function before(arg0: () => void) {
    throw new Error('Function not implemented.');
}


function after(arg0: () => void) {
    throw new Error('Function not implemented.');
}

