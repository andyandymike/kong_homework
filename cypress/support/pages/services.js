import CommonFunc from '../functions/common_func';
import Toaster from '../elements/toaster';
import { services } from '../selectors/selector';

class Services {
    constructor() {
        this.common_func = new CommonFunc();
        this.toaster = new Toaster();
    }

    //create new service based on the service name and kong test services url
    createNewService(service_name, kong_test_services_url, count) {
        this.common_func.createNewEntity('gateway-service', count);
        cy.get(services.service_form_name).type(service_name);
        cy.get(services.service_form_url).type(kong_test_services_url);
        cy.get(services.service_create_form_submit).click();
        this.toaster.closeToaster();
    }
}
export default Services;