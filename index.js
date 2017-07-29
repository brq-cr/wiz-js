import 'babel-polyfill';

import { appPort } from './config';

import app from './app';

(async () => {
    await app.listen(appPort);
})();
