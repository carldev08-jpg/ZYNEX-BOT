import handleIncomingMessage from './events/messageHandler.js';
import { startPairingServer } from './web/server.js';

(async () => {
    await startPairingServer(handleIncomingMessage);
})();
