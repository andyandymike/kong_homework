import Toaster from '../elements/toaster';

class CommonFunc {
    constructor() {
        this.toaster = new Toaster();
    }
    //create new entity based on the type and count
    //if count is 0, click empty state action
    //if count is greater than 0, click add entity button
    createNewEntity(type, count) {
        if (count == 0) {
            cy.get('[data-testid="empty-state-action"]').click();
        } else {
            cy.get(`[data-testid="toolbar-add-${type}"]`).click();
        }
        this.toaster.closeToaster();
    }

    //delete entity based on the entity name
    deleteEntity(entity_name) {
        cy.get(`[data-testid="${entity_name}"]`).find('[data-testid="row-actions-dropdown-trigger"]').click();
        cy.get(`[data-testid="${entity_name}"]`).find('[data-testid="action-entity-delete"]').click();
        cy.get('[data-testid="confirmation-input"]').type(entity_name);
        cy.get('[data-testid="modal-action-button"]').click();
        this.toaster.closeToaster();
    }
}

export default CommonFunc;