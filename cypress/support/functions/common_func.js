import Toaster from '../elements/toaster';
import { common_func } from '../selectors/selector';

class CommonFunc {
    constructor() {
        this.toaster = new Toaster();
    }
    //create new entity based on the type and count
    //if count is 0, click empty state action
    //if count is greater than 0, click add entity button
    createNewEntity(type, count) {
        if (count == 0) {
            cy.get(common_func.empty_state_action).click();
        } else {
            cy.get(`[data-testid="toolbar-add-${type}"]`).click();
        }
        this.toaster.closeToaster();
    }

    //delete entity based on the entity name
    deleteEntity(entity_name) {
        cy.get(`[data-testid="${entity_name}"]`).find(common_func.entity_actions_dropdown_trigger).click();
        cy.get(`[data-testid="${entity_name}"]`).find(common_func.entity_delete_action).click();
        cy.get(common_func.entity_delete_confirmation_input).type(entity_name);
        cy.get(common_func.entity_delete_confirmation_button).click();
        this.toaster.closeToaster();
    }
}

export default CommonFunc;