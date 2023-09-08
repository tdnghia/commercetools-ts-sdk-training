import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";
import * as dotenv from 'dotenv';
import { ctpClient } from './BuildClient';

const createApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } = readConfig(Prefix.DEV)
    // Configure authMiddlewareOptions
    const authMiddlewareOptions: AuthMiddlewareOptions = {
        host: oauthHost,
        projectKey: projectKey,
        credentials: {
            clientId: clientId,
            clientSecret: clientSecret,
        },
        fetch,
    };

    // Configure httpMiddlewareOptions
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host: host,
        fetch,
    };

    const ctpClient = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware() // Include middleware for logging
        .build();

    return createApiBuilderFromCtpClient(ctpClient)
        .withProjectKey({ projectKey: projectKey });
}

const createImportApiClient = () => {
    throw new Error("Function not implemented");
}

const createStoreApiClient = () => {
    throw new Error("Function not implemented");
}

const createMyApiClient = () => {
    throw new Error("Function not implemented");
}


// export const apiRoot: ApiRoot = createApiClient();
export const apiRoot = createApiClient();
// export const importApiRoot: ImportApiRoot = createImportApiClient();
// export const storeApiRoot: ApiRoot = createStoreApiClient();
// export const myApiRoot: ApiRoot = createMyApiClient();

// project_key
// shopmacher-commercetool-training
//
//
// client_id
// Y12bdWGs6xkPMYO8uU1RATOG
//
//
// secret
// iWOu_EIDTAUaeiPx2R0cjUraBZjJlMWX
//
//
// scope
// manage_project:shopmacher-commercetool-training
//
//
// API URL
// https://api.europe-west1.gcp.commercetools.com
//
//
// Auth URL
// https://auth.europe-west1.gcp.commercetools.com


