import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import ServicesDetail from '../../support/pages/service_detail';
import Overview from '../../support/pages/overview';
import Routes from '../../support/pages/routes';
import RoutesDetail from '../../support/pages/route_detail';
import { overviewEnum, workspaceEnum, workspaceSideBarEnum, routesEnum } from '../../support/config/projectEnum';
import 'cypress-fail-fast';

describe('Gateway Entities e2e tests - Create Service, Route with empty name', () => {
    const kong_test_services_url = Cypress.env('kong_test_services_url');

    let workspace, workspace_sidebar, services, routes, overview, service_detail, route_detail;
    let context = {};

    before(() => {
        cy.log('Starting Test Suite...');
    });

    beforeEach(() => {
        cy.log('Starting test...');
        // Set reasonable viewport
        cy.viewport(1536, 960);

        workspace = new Workspace();
        workspace_sidebar = new WorkSpaceSidebar();
        services = new Services();
        routes = new Routes();
        overview = new Overview();
        service_detail = new ServicesDetail();
        route_detail = new RoutesDetail();

        cy.visit('/workspaces');
    });

    after(() => {
        cy.log('Cleaning up...');
        // Set reasonable viewport
        cy.viewport(1536, 960);
        cy.visit('/workspaces');
        workspace.navigateTo('default');

        // Clean up the route if it exists
        if (context.route_name) {
            cy.log(`Cleaning up: deleting route ${context.route_name}`);
            workspace_sidebar.navigateTo('routes');
            routes.deleteEntity(context.route_name);
        }

        // Clean up the service if it exists
        if (context.service_name) {
            cy.log(`Cleaning up: deleting service ${context.service_name}`);
            workspace_sidebar.navigateTo('services');
            services.deleteEntity(context.service_name);
        }
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            cy.log('Cleaning up on exception...');
            // Set reasonable viewport
            cy.viewport(1536, 960);
            cy.visit('/workspaces');
            workspace.navigateTo('default');

            // Clean up the route if it exists
            if (context.route_name) {
                cy.log(`Cleaning up: deleting route ${context.route_name}`);
                workspace_sidebar.navigateTo('routes');
                routes.deleteEntity(context.route_name);
            }

            // Clean up the service if it exists
            if (context.service_name) {
                cy.log(`Cleaning up: deleting service ${context.service_name}`);
                workspace_sidebar.navigateTo('services');
                services.deleteEntity(context.service_name);
            }
        }
    });

    it('should create service with empty name successfully', () => {
        const service_name = '';
        // Get current services count
        cy.log('Getting current services count');
        overview.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, 'services_count');
        // Create service based on the number of existing services
        cy.get('@services_count').then((services_count) => {
            // Create service
            cy.log(`Creating service with empty name`);
            workspace.navigateTo(workspaceEnum.DEFAULT_WORKSPACE);
            workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.SERVICES);
            services.createNewService(service_name, kong_test_services_url, services_count);

            // Validate service creation
            cy.log('Verifying service is enabled');
            service_detail.validateServiceIsEnabled();

            // Get service ID
            service_detail.getEntityId('service_id');
            cy.get('@service_id').then((service_id) => {
                // Set context for cleanup after creation
                cy.log(`Service Id is ${service_id}`)
                context.service_name = service_id;
            });
        });
    });

    it('should create a service and associated route with empty name successfully', () => {
        const service_name = context.service_name;
        const route_name = '';
        const protocols = routesEnum.protocols.HTTP_HTTPS;
        const path = '/mock';

        // Get current entity counts
        cy.log('Getting current services and routes count');
        overview.getCurrentEntityCount(overviewEnum.summary.types.ROUTES, 'routes_count');

        // Create route associated with the service
        cy.get('@routes_count').then((routes_count) => {
            cy.log(`Creating route: ${route_name} for service: ${service_name}`);
            workspace.navigateTo(workspaceEnum.DEFAULT_WORKSPACE);
            workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.ROUTES);
            routes.createNewRoutes(route_name, service_name, protocols, path, routes_count);

            // Verify route is created
            cy.log('Verifying route is created');
            route_detail.validateEntityIsCreated();

            // Get route ID
            route_detail.getEntityId('route_id');
            cy.get('@route_id').then((route_id) => {
                // Set context for cleanup after creation
                cy.log(`Route Id is ${route_id}`)
                context.route_name = route_id;
            });
        });
    });
});
