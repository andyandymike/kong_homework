describe('create new services e2e test', () => {
  it.only('Create a new Service from scratch', () => {
    // load env
    const kong_ui_base_url = Cypress.env('kong_ui_base_url')
    const kong_test_services_url = Cypress.env('kong_test_services_url')
    var service_name
    //set browser
    cy.viewport(1280, 720);
    //go to base url
    cy.visit(kong_ui_base_url)
    //get current services number
    cy.get('[data-testid="Services"]').find('[class="metric-value-text"').invoke('text').then((text) => {
      let services_count = Number(text);
      cy.wrap(services_count).as('services_count');
    });
    //create service
    cy.get('@services_count').then((services_count) => {
      //if no service, let's create a new one
      if (services_count === 0) {
        service_name = 'test-service'
        cy.get('[data-testid="workspace-link-default"').click()
        cy.get('[data-testid="sidebar-item-gateway-services"]').click()
        cy.get('[data-testid="empty-state-action"]').click()
        cy.get('[data-testid="gateway-service-name-input"]').type(service_name)
        cy.get('[data-testid="gateway-service-url-input"]').type(kong_test_services_url)
        cy.get('[data-testid="service-create-form-submit"]').click()
      }
      //if already services there, let's add a new one
      if (services_count > 0) {
        service_name = 'test-service-new'
        cy.get('[data-testid="workspace-link-default"').click()
        cy.get('[data-testid="sidebar-item-gateway-services"]').click()
        cy.get('[data-testid="toolbar-add-gateway-service"]').click()
        cy.get('[data-testid="gateway-service-name-input"]').type(service_name)
        cy.get('[data-testid="gateway-service-url-input"]').type(kong_test_services_url)
        cy.get('[data-testid="service-create-form-submit"]').click()
      }

      //delete what I created for test to clean up
      cy.get('[data-testid="sidebar-item-gateway-services"]').click()
      cy.get(`[data-testid="${service_name}"]`).find('[data-testid="row-actions-dropdown-trigger"]').click()
      cy.get(`[data-testid="${service_name}"]`).find('[data-testid="action-entity-delete"]').click()
      cy.get('[data-testid="confirmation-input"]').type(service_name)
      cy.get('[data-testid="modal-action-button"]').click()
    })
  })
})
