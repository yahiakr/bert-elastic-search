import app from './server';
import logger from '@services/Logger';

// Start the server
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
    logger.info('Express server started on port: http://localhost:' + port);
});