import {ClientResponse, Project, ShippingMethod, TaxCategory} from "@commercetools/platform-sdk";
import {apiRoot} from "./client";

export const getProject = (): Promise<ClientResponse<Project>> =>
    apiRoot
        .get()
        .execute()

export const getShipppingMethodById = (id: string): Promise<ClientResponse<ShippingMethod>> =>
    apiRoot
        .shippingMethods()
        .withId({ID: id})
        .get()
        .execute()

export const getTaxCategoryByKey = (key: string): Promise<ClientResponse<TaxCategory>> =>
    apiRoot
        .taxCategories()
        .withKey({key: key})
        .get()
        .execute()
