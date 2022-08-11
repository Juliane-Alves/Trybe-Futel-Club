import { Router } from 'express';
import teamsController from '../controllers/teamsController'
import TeamsIdController from '../controllers/teamsIdController';

const RouteTeams = Router()

RouteTeams.get('/teams', teamsController.getTeams )

RouteTeams.get('/teams/:id', TeamsIdController.getTeamsID)

export default RouteTeams;