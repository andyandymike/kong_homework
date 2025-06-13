import { entity_detail } from '../config/selector';

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