import { overviewEnum, routesEnum } from '../../support/config/projectEnum';
import 'cypress-fail-fast';

describe('Gateway Entities e2e tests - Create Service, Route with empty name', () => {
    const kong_test_services_url = Cypress.env('kong_test_services_url');

    let context = {};

    before(() => {
        cy.log('Starting Test Suite...');
    });

    beforeEach(() => {
        cy.log('Starting test...');
        // Set reasonable viewport
        cy.viewport(1536, 960);
    });

    after(() => {
        cy.log('Cleaning up...');
        // Set reasonable viewport
        cy.viewport(1536, 960);

        // Clean up the route if it exists
        if (context.route_name) {
            cy.log(`Cleaning up: deleting route ${context.route_name}`);
            cy.deleteRoute(context.route_name);
        }

        // Clean up the service if it exists
        if (context.service_name) {
            cy.log(`Cleaning up: deleting service ${context.service_name}`);
            cy.deleteService(context.service_name);
        }
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            cy.log('Cleaning up...');
            // Set reasonable viewport
            cy.viewport(1536, 960);

            // Clean up the route if it exists
            if (context.route_name) {
                cy.log(`Cleaning up: deleting route ${context.route_name}`);
                cy.deleteRoute(context.route_name);
            }

            // Clean up the service if it exists
            if (context.service_name) {
                cy.log(`Cleaning up: deleting service ${context.service_name}`);
                cy.deleteService(context.service_name);
            }
        }
    });

    it('should create service with empty name successfully', () => {
        const service_name = '';
        const count_alias = 'services_count';

        // Get current services count
        cy.log('Getting current services count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, count_alias);

        // 1. Create service
        // 2. Validate service is enabled
        // 3. Get service ID
        cy.log('Creating service with empty name');
        cy.createServiceByExistingServiceCount(service_name, kong_test_services_url, count_alias)
            .validateServiceIsEnabled()
            .getServiceId(context);
    });

    it('should create a service and associated route with empty name successfully', () => {
        const service_name = context.service_name;
        const route_name = '';
        const protocols = routesEnum.protocols.HTTP_HTTPS;
        const path = '/mock';
        const count_alias = 'route_count';

        // Get current entity counts
        cy.log('Getting current services and routes count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.ROUTES, count_alias);

        // 1. Create route associated with the service
        // 2. Validate route is created
        // 3. Get route ID
        cy.log('Creating route with empty name');
        cy.createRouteAndAssociateWithService(route_name, service_name, protocols, path, count_alias)
            .validateRouteIsCreated()
            .getRouteId(context);
    });
});
