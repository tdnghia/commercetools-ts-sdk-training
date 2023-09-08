import { apiRoot } from "./client";
import {
    ClientResponse,
    Customer,
    CustomerDraft,
    CustomerGroup,
    CustomerSignInResult,
    CustomerToken
} from "@commercetools/platform-sdk";

export const getCustomerById = (ID: string): Promise<ClientResponse<Customer>> => {
    return apiRoot
        .customers()
        .withId({ ID })
        .get()
        .execute();
}

export const getCustomerByKey = (key: string): Promise<ClientResponse<Customer>> => {
    return apiRoot
        .customers()
        .withKey({ key })
        .get()
        .execute();
}

export const createCustomer = (customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
    return apiRoot
        .customers()
        .post({
            body: customerDraft
        })
        .execute()
}

export const createCustomerToken = (customer: ClientResponse<Customer>): Promise<ClientResponse<CustomerToken>> => {
    return apiRoot
        .customers()
        .emailToken()
        .post({
            body: {
                id: customer.body.id,
                ttlMinutes: 120
            }
        })
        .execute()
}

export const confirmCustomerEmail = (token: ClientResponse<CustomerToken>): Promise<ClientResponse<Customer>> => {
    return apiRoot
        .customers()
        .emailConfirm()
        .post({
            body: {
                tokenValue: token.body.value
            }
        })
        .execute()
}

export const assignCustomerToCustomerGroup = (
    customerKey: string,
    customerGroupKey: string
): Promise<ClientResponse<Customer>> => {
    return apiRoot
        .customerGroups()
        .withKey({ key: customerGroupKey })
        .get()
        .execute()
        .then(() => {
            return assignCustomerToCustomerGroupMainProcess(customerKey, customerGroupKey)
        })
        .catch(() => {
            return createNewCustomerGroup(customerGroupKey, customerGroupKey)
                .then(() => {
                    return assignCustomerToCustomerGroupMainProcess(customerKey, customerGroupKey)
                })
        })
        .catch((error) => {
            // Handle any errors and return a rejected Promise
            console.error("An error occurred:", error);
            return Promise.reject(error);
        });
    ;
}

const createNewCustomerGroup = (
    customerGroupKey: string,
    customerGroupName: string
): Promise<ClientResponse<CustomerGroup>> => {
    return apiRoot
        .customerGroups()
        .post({
            body: {
                key: customerGroupKey,
                groupName: customerGroupName
            }
        })
        .execute()
}

const assignCustomerToCustomerGroupMainProcess = (
    customerKey: string,
    customerGroupKey: string
): Promise<ClientResponse<Customer>> => {
    return apiRoot
        .customers()
        .withKey({
            key: customerKey
        })
        .post({
            body: {
                version: 2,
                actions: [
                    {
                        "action": "setCustomerGroup",
                        "customerGroup": {
                            "key": customerGroupKey,
                            "typeId": "customer-group"
                        }
                    }
                ]
            }
        })
        .execute()
}


