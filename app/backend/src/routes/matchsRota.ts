import { Router } from 'express';
import MatchsController from '../controllers/matchsController';
import validateToken from '../utils/validateToken'



const RotaMatchs = Router(); 

RotaMatchs.get('/matches', MatchsController.getMatchsAll );

RotaMatchs.post('/matches', validateToken.releaseToken, MatchsController.insertMatchs);

export default RotaMatchs;