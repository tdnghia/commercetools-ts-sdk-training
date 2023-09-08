import fetch from 'node-fetch';
import {
    ClientBuilder,

    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

// const projectKey: string = `{${process.env.CTP_PROJECT_KEY}}` ?? '{projectKey}';
// const scopes: string[] = ['manage_project:shopmacher-commercetool-training'] ?? ['{scope}'];
// const clientId: string = process.env.CTP_CLIENT_ID ?? '{clientID}';
// const clientSecret: string = process.env.CTP_CLIENT_ID ?? '{clientSecret}';
// const region: string = 'europe-west1.gcp';
//
// // Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//     host: `https://auth.${region}.commercetools.com`,
//     projectKey: projectKey,
//     credentials: {
//         clientId: clientId,
//         clientSecret: clientSecret,
//     },
//     scopes,
//     fetch,
// };
//
// // Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//     host: `https://api.${region}.commercetools.com`,
//     fetch,
// };

// const projectKey = '{projectKey}';
// const scopes = ['{scope}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
        clientId: '{clientID}',
        clientSecret: '{clientSecret}',
    },
    scopes,
    fetch
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();