import WorkSpaceSidebar from '../../support/elements/workspace_sidebar';
import Workspace from '../../support/pages/workspace';
import Services from '../../support/pages/services';
import Overview from '../../support/pages/overview';
import CommonFunc from '../../support/functions/common_func';

describe('Gateway Service e2e test action 1', () => {
  // load env
  const kong_ui_base_url = Cypress.env('kong_ui_base_url');
  const kong_test_services_url = Cypress.env('kong_test_services_url');

  //init common elements
  const workspace = new Workspace();
  const workspace_sidebar = new WorkSpaceSidebar();
  const services = new Services();
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

  it('Create a new Service from scratch or on top of existing one', () => {
    const { v4: uuidv4 } = require('uuid');
    var service_name = `test-service-${uuidv4()}`;
    //count existing services number
    cy.log('Count existing services number');
    overview.getCurrentEntityCount('Services', 'services_count');
    //create service based on the number of existing services
    cy.get('@services_count').then((services_count) => {
      //create service
      cy.log('Create service');
      workspace.navigateTo('default');
      workspace_sidebar.navigateTo('services');
      services.createNewService(service_name, kong_test_services_url, services_count);

      //delete what I created for test to clean up
      cy.log('Delete service');
      workspace_sidebar.navigateTo('services');
      common_func.deleteEntity(service_name);
    });
  });
})
