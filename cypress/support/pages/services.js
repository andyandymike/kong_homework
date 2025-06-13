import { services } from '../selectors/selector';
import Entities from './entities';
import { entitiesEnum } from '../selectors/projectEnum';

class Services extends Entities {
    constructor() {
        super();
    }

    // Create new service based on the service name and kong test services url
    createNewService(service_name, kong_test_services_url, count) {
        super.createNewEntity(entitiesEnum.types.SERVICES, count);
        if (service_name != '') {
            cy.get(services.services_input_name).type(service_name);
        }
        cy.get(services.services_input_url).type(kong_test_services_url);
        cy.get(services.services_button_submit).click();
        this.toaster.closeToaster();
    }
}
export default Services;    