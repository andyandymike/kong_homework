import { overviewEnum, routesEnum } from '../../support/config/project_enum';
import 'cypress-fail-fast';

describe('Gateway Entities e2e tests - Create Service, Route with empty name', () => {
    let context = {};

    before(() => {
        cy.log('Starting Test Suite...');
    });

    beforeEach(function () {
        cy.log('Starting test...');
        // Set reasonable viewport
        cy.viewport(1536, 960);
        // Load test data
        cy.fixture('testdata.json').as('testdata');
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

    it('should create service with empty name successfully', function () {
        const service_name = '';
        const count_alias = 'services_count';
        const service_config = {
            serviceName: service_name,
            serviceUrl: this.testdata.service_url,
        };

        // Get current services count
        cy.log('Getting current services count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, count_alias);

        // 1. Create service
        // 2. Validate service is enabled
        // 3. Get service ID
        cy.log('Creating service with empty name');
        cy.createServiceByExistingServiceCount(service_config, count_alias)
            .validateServiceIsEnabled()
            .getServiceId(context);
    });

    it('should create a service and associated route with empty name successfully', function () {
        const service_name = context.service_name;
        const route_name = '';
        const protocols = routesEnum.protocols.HTTP_HTTPS;
        const count_alias = 'route_count';
        const route_config = {
            routeName: route_name,
            serviceName: service_name,
            protocols: protocols,
            path: this.testdata.path,
        };

        // Get current entity counts
        cy.log('Getting current services and routes count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.ROUTES, count_alias);

        // 1. Create route associated with the service
        // 2. Validate route is created
        // 3. Get route ID
        cy.log('Creating route with empty name');
        cy.createRouteAndAssociateWithService(route_config, count_alias)
            .validateRouteIsCreated()
            .getRouteId(context);
    });
});
