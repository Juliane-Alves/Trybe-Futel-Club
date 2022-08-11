import { Router } from 'express';
import MatchsController from '../controllers/matchsController';

const RotaMatchs = Router(); 

RotaMatchs.get('/matches', MatchsController.getMatchsAll );

export default RotaMatchs;