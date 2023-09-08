import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";
import { getProject, getShipppingMethodById, getTaxCategoryByKey } from "./handson/project";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/api/projects/project#get-project

// TODO: Get project settings
getProject()
    .then((data) => {
        console.log(data)
    })
    .catch(console.error);

// TODO: Get shipping method by id
getShipppingMethodById('30d41156-e481-47e2-9a51-8ef233bb49cc')
    .then((data) => {
        console.log(data)
    })
    .catch(console.error);

// TODO: Get standard tax category by key
getTaxCategoryByKey('standard-tax')
    .then((data) => {
        console.log(data)
    })
    .catch(console.error);
