import CommonFunc from '../functions/common_func';
import Toaster from '../elements/toaster';

class Services {
    constructor() {
        this.common_func = new CommonFunc();
        this.toaster = new Toaster();
    }

    //create new service based on the service name and kong test services url
    createNewService(service_name, kong_test_services_url, count) {
        this.common_func.createNewEntity('gateway-service', count);
        cy.get('[data-testid="gateway-service-name-input"]').type(service_name);
        cy.get('[data-testid="gateway-service-url-input"]').type(kong_test_services_url);
        cy.get('[data-testid="service-create-form-submit"]').click();
        this.toaster.closeToaster();
    }
}
export default Services;