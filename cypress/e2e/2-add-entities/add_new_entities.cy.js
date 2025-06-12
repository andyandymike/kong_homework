import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import Overview from '../../support/pages/overview';
import Routes from '../../support/pages/routes';
import CommonFunc from '../../support/functions/common_func';

describe('Gateway Service e2e test action 2', () => {
    // load env
    const kong_ui_base_url = Cypress.env('kong_ui_base_url');
    const kong_test_services_url = Cypress.env('kong_test_services_url');

    //init common elements
    const workspace = new Workspace();
    const workspace_sidebar = new WorkSpaceSidebar();
    const services = new Services();
    const routes = new Routes();
    const overview = new Overview();
    const common_func = new CommonFunc();

    before(() => {
        cy.log('Starting Test Suite...');
        //set browser
        cy.viewport(1280, 720);
    });

    after(() => {
        cy.log('Test Suite Completed');
    });

    beforeEach(() => {
        cy.log('Starting test...');
        //go to base url
        cy.visit(kong_ui_base_url);
    });

    it('Add additional entities associated with a service', () => {
        const { v4: uuidv4 } = require('uuid');
        var service_name = `test-service-${uuidv4()}`;
        var route_name = `test-route-${uuidv4()}`;
        var protocols = 'http,https';
        var path = '/mock';
        //count existing services number
        cy.log('Count existing services number');
        overview.getCurrentEntityCount('Services', 'services_count');
        //count existing routes number
        cy.log('Count existing routes number');
        overview.getCurrentEntityCount('Routes', 'routes_count');
        //create service based on the number of existing services
        cy.get('@services_count').then((services_count) => {
            //create service
            cy.log('Create service');
            workspace.navigateTo('default');
            workspace_sidebar.navigateTo('services');
            services.createNewService(service_name, kong_test_services_url, services_count);
        });
        //create route based on the number of existing routes
        cy.get('@routes_count').then((routes_count) => {
            cy.log('Create route');
            workspace_sidebar.navigateTo('routes');
            routes.createNewRoutes(route_name, service_name, protocols, path, routes_count);
        });

        //delete what I created for test to clean up
        cy.log('Delete service and route');
        workspace_sidebar.navigateTo('services');
        common_func.deleteEntity(service_name);
        workspace_sidebar.navigateTo('routes');
        common_func.deleteEntity(route_name);
    });
})
