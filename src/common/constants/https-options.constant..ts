import { readFileSync } from "node:fs";

// https 证书
export const HTTPS_OPTIONS = {
    // 向后支持 HTTP1
    allowHTTP1: true,
    key: readFileSync("src/config/certs/private-key.pem"),
    cert: readFileSync("src/config/certs/public-certificate.pem"),
};
