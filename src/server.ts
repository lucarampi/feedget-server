import express from 'express'
import { routes } from './routes';

const app = express();

//Configure JSON body
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server is running!')
});
