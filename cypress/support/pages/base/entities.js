import Toaster from '../../elements/toaster';
import { entities } from '../../config/selector';

// Base class for Entities page
// Entities page should inherit from this class
// This class contains the common functions for Entities pages
class Entities {
    constructor() {
        this.toaster = new Toaster();
    }

    // Create new entity based on the type and count
    // If count is 0, click empty state action
    // If count is greater than 0, click add entity button
    createNewEntity(type, count) {
        if (count == 0) {
            cy.get(entities.entities_button_empty_state).click();
        } else {
            cy.get(`[data-testid="toolbar-add-${type}"]`).click();
        }
        this.toaster.closeToaster();
    }

    // Delete entity based on the entity name
    deleteEntity(entity_name) {
        cy.get(`[data-testid="${entity_name}"], [data-rowid="${entity_name}"]`).find(entities.entities_button_dropdown_trigger).click();
        cy.get(`[data-testid="${entity_name}"], [data-rowid="${entity_name}"]`).find(entities.entities_button_delete).click();
        cy.get(entities.entities_input_delete_confirmation).type(entity_name);
        cy.get(entities.entities_button_delete_confirmation).click();
        this.toaster.closeToaster();
    }
}

export default Entities;