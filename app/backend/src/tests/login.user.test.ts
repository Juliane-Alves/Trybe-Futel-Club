import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/UsersModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Verifica a rota post Login', () => {
  describe('Espera a requisição valida', () => {
    
    before(() => {
      sinon.stub(User, 'findOne').resolves({ email: 'admin@admin.com' } as User );
      sinon.stub(bcrypt, 'compare').resolves(true);
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
    });

    it('Verifica se retorna um objeto com um token', async () => {
      const responseData = await chai.request(app).post('/login').send({
        email: 'juliane@juliane.com',
        password: 'password',
      })
      expect(responseData.status).to.be.equal(200);
      expect(responseData.body).to.have.keys('token');
    });
  });

  describe('Verifica se o password é invalido', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(undefined);
      sinon.stub(bcrypt, 'compare').resolves(false);      
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
    });

    it('Verifica se o retorno é um erro 401', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'juliane@juliane.com',
        password: 'password',
      });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });
  })
});

function before(arg0: () => void) {
  throw new Error('Function not implemented.');
}


function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}
