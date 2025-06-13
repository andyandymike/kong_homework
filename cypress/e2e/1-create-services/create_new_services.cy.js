import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import Overview from '../../support/pages/overview';
import ServicesDetail from '../../support/pages/service_detail';
import { overviewEnum, workspaceEnum, workspaceSideBarEnum } from '../../support/config/projectEnum';

describe('Gateway Service e2e tests', () => {
  const kong_test_services_url = Cypress.env('kong_test_services_url');

  let workspace, workspace_sidebar, services, overview, service_detail;

  // Context for the tests to share
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
    overview = new Overview();
    service_detail = new ServicesDetail();

    cy.visit('/workspaces');
  });

  afterEach(() => {
    cy.log('Cleaning up...');
    cy.visit('/workspaces');
    workspace.navigateTo('default');

    // Clean up the service if it exists
    if (context.service_name) {
      cy.log(`Cleaning up: deleting service ${context.service_name}`);
      workspace_sidebar.navigateTo('services');
      services.deleteEntity(context.service_name);
    }
  });

  it('should create service successfully', () => {
    const service_name = `test-service-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    // Get current services count
    cy.log('Getting current services count');
    overview.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, 'services_count');
    // Create service based on the number of existing services
    cy.get('@services_count').then((services_count) => {
      // Create service
      cy.log(`Creating service: ${service_name}`);
      workspace.navigateTo(workspaceEnum.DEFAULT_WORKSPACE);
      workspace_sidebar.navigateTo(workspaceSideBarEnum.sidebar.types.SERVICES);
      services.createNewService(service_name, kong_test_services_url, services_count);
      // Set context for cleanup after creation
      context.service_name = service_name;

      // Validate service creation
      cy.log('Verifying service is enabled');
      service_detail.validateServiceIsEnabled();
    });
  });

  it('should create service with empty name successfully', () => {
    const service_name = '';
    // Get current services count
    cy.log('Getting current services count');
    overview.getCurrentEntityCount(overviewEnum.summary.types.SERVICES, 'services_count');
    // Create service based on the number of existing services
    cy.get('@services_count').then((services_count) => {
      // Create service
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
        context.service_name = service_id;
      });
    });
  });
});
