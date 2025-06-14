import { overviewEnum, routesEnum } from '../../support/config/project_enum';
import CommonFuncs from '../../support/common/func';
import 'cypress-fail-fast';

describe('Gateway Entities e2e tests - Create Service, Route', () => {
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

    it('should create a service successfully', () => {
        const service_name = CommonFuncs.createUniqueName('test-service');
        const count_alias = 'service_count';
        const service_config = {
            serviceName: service_name,
            serviceUrl: kong_test_services_url,
        };

        // Get current entity counts
        cy.log('Getting current services count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, count_alias);

        // 1. Create service
        // 2. Set context for cleanup after creation
        // 3. Verify service is enabled
        cy.log(`Creating service: ${service_name}`);
        cy.createServiceByExistingServiceCount(service_config, count_alias)
            .setContext(context, 'service_name', service_name)
            .validateServiceIsEnabled();
    });

    it('should create a route and associated with previous service successfully', () => {
        const service_name = context.service_name;
        const route_name = CommonFuncs.createUniqueName('test-route');
        const protocols = routesEnum.protocols.HTTP_HTTPS;
        const path = '/mock';
        const count_alias = 'routes_count';
        const route_config = {
            routeName: route_name,
            serviceName: service_name,
            protocols: protocols,
            path: path,
        };

        // Get current entity counts
        cy.log('Getting current routes count');
        cy.getCurrentEntityCount(overviewEnum.summary.types.ROUTES, count_alias);

        // 1. Create route associate with the service
        // 2. Set context for cleanup after creation
        // 3. Verify route is created
        cy.log(`Creating route: ${route_name} for service: ${service_name}`);
        cy.createRouteAndAssociateWithService(route_config, count_alias)
            .setContext(context, 'route_name', route_name)
            .validateRouteIsCreated();;
    });
});
