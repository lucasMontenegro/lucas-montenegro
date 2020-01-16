import startCluster from "lib/node/startCluster"
import httpServer from "lib/node/httpServer"
startCluster(() => httpServer())