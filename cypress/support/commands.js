// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Custom command to wait for element to be ready (visible and enabled)
import WorkSpaceSidebar from './elements/workspace_sidebar';
import Workspace from './pages/workspace';
import Services from './pages/services';
import ServicesDetail from './pages/service_detail';
import Overview from './pages/overview';
import Routes from './pages/routes';
import RoutesDetail from './pages/route_detail';
import { workspaceEnum, workspaceSideBarEnum } from './config/projectEnum';

const workspace = new Workspace();
const workspace_sidebar = new WorkSpaceSidebar();
const services = new Services();
const routes = new Routes();
const overview = new Overview();
const service_detail = new ServicesDetail();
const route_detail = new RoutesDetail();

// ---------- Common Start ----------

// Set context value
Cypress.Commands.add('setContext', { prevSubject: 'optional' }, (subject, context, key, value) => {
    context[key] = value;
    return subject ? cy.wrap(subject) : cy.wrap(null);
});

// ---------- Common Start ----------

// ---------- Workspaces page Start ----------

// Navigate to workspaces page
Cypress.Commands.add('navigateToWorkspaces', () => {
    cy.visit('/workspaces');
});

// Get count of an entity
Cypress.Commands.add('getCurrentEntityCount', (type, output) => {
    cy.navigateToWorkspaces();
    overview.getCurrentEntityCount(type, output);
});

// Navigate to default workspace
Cypress.Commands.add('navigateToDefaultWorkspace', () => {
    cy.navigateToWorkspaces();
    workspace.navigateTo(workspaceEnum.DEFAULT_WORKSPACE);
});
// ---------- Workspaces page End----------

// ---------- Service page Start ----------

// Create a new service, depend on existing services count
Cypress.Commands.add('createServiceByExistingServiceCount', (service_name, kong_test_services_url, services_count) => {
    cy.navigateToWorkspaces();
    cy.get(`@${services_count}`).then((services_count) => {
        cy.navigateToDefaultWorkspace();
        workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.SERVICES);
        services.createNewService(service_name, kong_test_services_url, services_count);
    });
});

// Delete a service
Cypress.Commands.add('deleteService', (service_name) => {
    cy.navigateToDefaultWorkspace();
    workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.SERVICES);
    services.deleteEntity(service_name);
});

// Check current page is Service Detail page
Cypress.Commands.add('isOnServiceDetail', () => {
    service_detail.isOnServiceDetail();
})

// Get service Id into context - need to be on Service Detail page first
Cypress.Commands.add('getServiceId', { prevSubject: 'element' }, (subject, context) => {
    cy.wrap(subject).then(() => {
        cy.isOnServiceDetail();
    });
    service_detail.getEntityId('service_id_alias');
    cy.get('@service_id_alias').then((id) => {
        cy.log(`Service Id is ${id}`)
        context.service_name = id;
    });
    return cy.wrap(subject);
});

// Validate a service is enabled - need to be on Service Detail page first
Cypress.Commands.add('validateServiceIsEnabled', { prevSubject: 'element' }, (subject) => {
    cy.log('Verifying service is enabled');
    cy.wrap(subject).then(() => {
        cy.isOnServiceDetail();
    });
    service_detail.validateServiceIsEnabled();
    return cy.wrap(subject);
});

// ---------- Service page End ----------

// ---------- Route page Start ----------

// Create a new route, depend on existing services count, and associate with a service
Cypress.Commands.add('createRouteAndAssociateWithService', (route_name, service_name, protocols, path, routes_count) => {
    cy.navigateToWorkspaces();
    cy.get(`@${routes_count}`).then((routes_count) => {
        cy.navigateToDefaultWorkspace();
        workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.ROUTES);
        routes.createNewRoutes(route_name, service_name, protocols, path, routes_count);
    });
});

// Check current page is Route Detail page
Cypress.Commands.add('isOnRouteDetail', () => {
    route_detail.isOnRouteDetail();
})

// Validate route is created - need to be on Route Detail page first
Cypress.Commands.add('validateRouteIsCreated', { prevSubject: 'element' }, (subject) => {
    cy.log('Verifying route is created');
    cy.wrap(subject).then(() => {
        cy.isOnRouteDetail();
    });
    route_detail.validateEntityIsCreated();
    return cy.wrap(subject);
});

// Delete a route
Cypress.Commands.add('deleteRoute', (route_name) => {
    cy.navigateToDefaultWorkspace();
    workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.ROUTES);
    routes.deleteEntity(route_name);
});

// Get route Id into context - need to be on Route Detail page first
Cypress.Commands.add('getRouteId', { prevSubject: 'element' }, (subject, context) => {
    cy.wrap(subject).then(() => {
        cy.isOnRouteDetail();
    });
    route_detail.getEntityId('route_id_alias');
    cy.get('@route_id_alias').then((id) => {
        cy.log(`Route Id is ${id}`)
        context.route_name = id;
    });
    return cy.wrap(subject);
});

// ---------- Route page End ----------
