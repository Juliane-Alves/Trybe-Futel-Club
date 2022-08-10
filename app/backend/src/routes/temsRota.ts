import { Router } from 'express';
import teamsController from '../controllers/teamsController'

const RouteTeams = Router()

RouteTeams.get('/', teamsController.getTeams )

export default RouteTeams;