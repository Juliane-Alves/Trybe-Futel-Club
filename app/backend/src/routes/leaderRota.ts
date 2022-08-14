import { Router } from 'express';
import LeaderController from '../controllers/leardController';

 const RouteLeader = Router()

 RouteLeader.get('/leaderboard/home', LeaderController.getPointsHome);

 RouteLeader.get('/leaderboard/away', LeaderController.getPointsAway);

 RouteLeader.get('/leaderboard', LeaderController.getFinishScore);

 export default RouteLeader;