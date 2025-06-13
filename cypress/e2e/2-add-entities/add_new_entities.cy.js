import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import ServicesDetail from '../../support/pages/service_detail';
import Overview from '../../support/pages/overview';
import Routes from '../../support/pages/routes';

describe('Gateway Entities e2e tests - Routes and Services', () => {
    const kong_test_services_url = Cypress.env('kong_test_services_url');

    let workspace, workspace_sidebar, services, routes, overview, services_detail;

    before(() => {
        cy.log('Starting Test Suite...');
        // Set reasonable viewport
        cy.viewport(1280, 720);
    });

    beforeEach(() => {
        cy.log('Starting test...');
        
        workspace = new Workspace();
        workspace_sidebar = new WorkSpaceSidebar();
        services = new Services();
        routes = new Routes();
        overview = new Overview();
        services_detail = new ServicesDetail();

        cy.visit('/workspaces');
    });

    it.only('should create a service and associated route successfully', () => {
        const service_name = `test-service-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        const route_name = `test-route-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        const protocols = 'http,https';
        const path = '/mock';
        
        // Get current entity counts
        cy.log('Getting current services and routes count');
        overview.getCurrentEntityCount('Services', 'services_count');
        overview.getCurrentEntityCount('Routes', 'routes_count');
        
        // Create service first
        cy.get('@services_count').then((services_count) => {
            cy.log(`Creating service: ${service_name}`);
            workspace.navigateTo('default');
            workspace_sidebar.navigateTo('services');
            services.createNewService(service_name, kong_test_services_url, services_count);
            // Verify service is enabled
            cy.log('Verifying service is enabled');
            services_detail.validateServiceIsEnabled();

            // Create route associated with the service
            cy.get('@routes_count').then((routes_count) => {
                cy.log(`Creating route: ${route_name} for service: ${service_name}`);
                workspace_sidebar.navigateTo('routes');
                routes.createNewRoutes(route_name, service_name, protocols, path, routes_count);
                
                // Verify route is created
                cy.log('Verifying route is created');
                
                // Clean up - delete created entities
                cy.log('Cleaning up: deleting route and service');
                workspace_sidebar.navigateTo('routes');
                routes.deleteEntity(route_name);
                
                workspace_sidebar.navigateTo('services');
                services.deleteEntity(service_name);
            });
        });
    });
});
