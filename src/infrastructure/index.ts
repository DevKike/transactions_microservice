import express from 'express';
import { CONSTANT } from './constants/constant';

const app = express();

app.listen(CONSTANT.PORT, () => {
  console.log(`Server is running at http://localhost:${CONSTANT.PORT}`);
});
