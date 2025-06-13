import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import Overview from '../../support/pages/overview';
import ServicesDetail from '../../support/pages/service_detail';

describe('Gateway Service e2e tests', () => {
  const kong_test_services_url = Cypress.env('kong_test_services_url');

  let workspace, workspace_sidebar, services, overview, services_detail;

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
    overview = new Overview();
    services_detail = new ServicesDetail();

    cy.visit('/workspaces');
  });

  it('should create and delete a service successfully', () => {
    const service_name = `test-service-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    // Get current services count
    cy.log('Getting current services count');
    overview.getCurrentEntityCount('Services', 'services_count');
    // Create service based on the number of existing services
    cy.get('@services_count').then((services_count) => {
      // Create service
      cy.log(`Creating service: ${service_name}`);
      workspace.navigateTo('default');
      workspace_sidebar.navigateTo('services');
      services.createNewService(service_name, kong_test_services_url, services_count);

      // Validate service creation
      cy.log('Verifying service is enabled');
      services_detail.validateServiceIsEnabled();

      // Clean up - delete the created service
      cy.log(`Cleaning up: deleting service ${service_name}`);
      workspace_sidebar.navigateTo('services');
      services.deleteEntity(service_name);
    });
  });

  it('should create and delete a service with empty name successfully', () => {
    const service_name = '';
    // Get current services count
    cy.log('Getting current services count');
    overview.getCurrentEntityCount('Services', 'services_count');
    // Create service based on the number of existing services
    cy.get('@services_count').then((services_count) => {
      // Create service
      workspace.navigateTo('default');
      workspace_sidebar.navigateTo('services');
      services.createNewService(service_name, kong_test_services_url, services_count);

      // Validate service creation
      cy.log('Verifying service is enabled');
      services_detail.validateServiceIsEnabled();

      // Get service ID
      services_detail.getEntityId('service_id');
      cy.get('@service_id').then((service_id) => {
        // Clean up - delete the created service
        cy.log(`Cleaning up: deleting service ${service_id}`);
        workspace_sidebar.navigateTo('services');
        services.deleteEntity(service_id);
      });
    });
  });
});
