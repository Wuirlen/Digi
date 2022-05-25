import * as express from'express'
import * as cors from'cors'
import * as logger from 'morgan'
import { router } from './routes'

export const app = express()

// Configurando os middlewares
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

//Integra o endpoint na aplicação
app.use('/', router)