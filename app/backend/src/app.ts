import * as express from 'express';
import * as cors from 'cors';
import RouteLogin from './routes/rotaLogin';
import Error from './Middlewares/erroMiddleware';
import RouteTeams from './routes/temsRota';
import RotaMatchs from './routes/matchsRota';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));


    this.app.use(cors());
    this.app.use('/login', RouteLogin);
    this.app.use('/login/validate', RouteLogin);
    // this.app.use('/teams', RouteTeams);
    this.app.use( RouteTeams);
    this.app.use(RotaMatchs);
    this.app.use(Error.middlewareError)
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);


    //  this.app.use('/login', RouteLogin);
     // this.app.use('/login/validate', RouteLogin);
     // this.app.use(Error.middlewareError);

  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
