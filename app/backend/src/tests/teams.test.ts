import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsModel from '../database/models/MatchesModels';
chai.use(chaiHttp);

const { expect } = chai;

describe('Verificando a rota /item', () => {
  describe('Espera a requisição valida', () => {
    
    before(() => {
      sinon.stub(TeamsModel, 'findAll').resolves([{ id: 1, teamName: 'Bahia' }] as unknown as TeamsModel[] );
    });
    after(() => {
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('Verifica se retorna um array de times', async () => {
      const responseData = await chai.request(app).get('/teams');;
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body[0]).to.have.keys('id','teamName');
    });
  });

  describe('Verifica se a requisição falha na camada Model', () => {
    
    before(() => {
      sinon.stub(TeamsModel, 'findAll').resolves(undefined);
    });
    after(() => {
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('Retorna uma string vazia.', async () => {
      const responseData = await chai.request(app).get('/teams');
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body).to.be.equal('');
    });
  })
});

describe('Verifica a rota team:id', () => {
  describe('No caso de sucesso na requisição:', () => {
    
    before(() => {
      sinon.stub(TeamsModel, 'findByPk').resolves({ id: 1, teamName: 'Bahia' } as unknown as TeamsModel);
    });
    after(() => {
      (TeamsModel.findByPk as sinon.SinonStub).restore();
    });

    it('Verifica se retorna um objeto com o time', async () => {
      const responseData = await chai.request(app).get('/teams/:id');;
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body).to.have.keys('id','teamName');
    });
  });

  describe('Verifica falha na requisição da camada Model:', () => {
    
    before(() => {
      sinon.stub(TeamsModel, 'findByPk').resolves(undefined);
    });
    after(() => {
      (TeamsModel.findByPk as sinon.SinonStub).restore();
    });

    it(' Verifica se retorna uma string vazia.', async () => {
      const responseData = await chai.request(app).get('/teams/:id');
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
