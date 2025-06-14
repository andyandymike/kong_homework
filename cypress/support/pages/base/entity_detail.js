import { entity_detail } from '../../config/selector';

// Base class for all Entity Detail page
// All entity detail page should inherit from this class
// This class contains the common functions for all Entity Detail pages
class EntityDetail {
    // Validate entity is created
    validateEntityIsCreated() {
        cy.get(entity_detail.entity_detail_property_detail_id).should('exist');
    }

    // Get entity ID
    getEntityId(output) {
        cy.get(entity_detail.entity_detail_property_detail_id).find('.copy-text').invoke('text').then((entity_id) => {
            cy.wrap(entity_id).as(output);
        });
    }
}

export default EntityDetail;