import EntityDetail from '../base/entity_detail';
import { service_detail } from '../../config/selector';
import { serviceDetailEnum } from '../../config/project_enum';

// Class for Service Detail page
class ServicesDetail extends EntityDetail {
    constructor() {
        super();
    }

    // Validate service is enabled
    validateServiceIsEnabled() {
        cy.get(service_detail.service_detail_property_enabled_status).should('exist');
    }

    // Check is on Service detail page
    isOnServiceDetail() {
        cy.get(service_detail.service_detail_button_header_actions).invoke('text').should('equal', serviceDetailEnum.button.SERVICE_ACTIONS);
    }
}

export default ServicesDetail;