import EntityDetail from './entity_detail';
import { service_detail } from '../config/selector';

class ServicesDetail extends EntityDetail {
    constructor() {
        super();
    }

    // Validate service is enabled
    validateServiceIsEnabled() {
        cy.get(service_detail.service_detail_property_enabled_status).should('exist');
    }
}

export default ServicesDetail;