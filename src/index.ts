import app from './app';
import startDB from './database/db';

const port = process.env.PORT || 3000;
startDB();

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));