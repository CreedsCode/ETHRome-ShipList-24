import {UrlObject} from "node:url";

const editProjectRoute: string | UrlObject = {
    href:'edit-project',
    query: {id: 'new'}
};

const addProjectRoute = {
    href:'edit-project',
};

export const ROUTES = {
    editProjectRoute,
    addProjectRoute,
}

export default ROUTES;
