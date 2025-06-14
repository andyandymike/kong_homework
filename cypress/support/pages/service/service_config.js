import EntityConfig from "../base/entity_config";
import { services } from '../../config/selector';

// Class for service configuration page
class ServiceConfig extends EntityConfig {
    constructor() {
        super();
        // Allowed input
        this.setters = {
            serviceName: this.setServiceName,
            serviceUrl: this.setServiceUrl,
        };
    }

    // Set service Name
    setServiceName(service_name) {
        if (service_name != '') {
            cy.get(services.services_input_name).type(service_name);
        }
    }

    // Set service url
    setServiceUrl(service_url) {
        cy.get(services.services_input_url).type(service_url);
    }

    // Save service
    saveService() {
        cy.get(services.services_button_submit).click();
        this.toaster.closeToaster();
    }

    // Save service with config
    saveService(service_config = {}) {
        Object.keys(service_config).forEach(key => {
            if (key in this.setters) {
                this.setters[key].call(this, service_config[key]);
            } else {
                cy.log(`Invalid property: "${key}". Will ignore.`);
            }
        });
        cy.get(services.services_button_submit).click();
        this.toaster.closeToaster();
    }
}

export default ServiceConfig;