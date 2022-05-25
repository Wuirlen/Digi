import { app } from './app'

const port = process.env.PORT || 3000

const server = app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    server.close()
    console.log('server terminated')
})