import { readFileSync } from "node:fs";

// https 证书
export const HTTPS_OPTIONS = {
    key: readFileSync("src/config/certs/private-key.pem"),
    cert: readFileSync("src/config/certs/public-certificate.pem"),
};
