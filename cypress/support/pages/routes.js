import CommonFunc from '../functions/common_func';
import Toaster from '../elements/toaster';

class Routes {
    constructor() {
        this.common_func = new CommonFunc();
        this.toaster = new Toaster();
    }

    //create new route based on the service name and kong test services url
    createNewRoutes(route_name, service_name, protocols, path, count) {
        this.common_func.createNewEntity('route', count);
        cy.get('[data-testid="route-form-name"]').type(route_name);
        cy.get('[data-testid="route-form-service-id"]').type(service_name);
        cy.get('[data-testid="route-form-protocols"]').click();
        cy.get(`[data-testid="select-item-${protocols}"]`).click();
        cy.get('[data-testid="route-form-paths-input-1"]').type(path);
        cy.get('[data-testid="route-create-form-submit"]').click();
        this.toaster.closeToaster();
    }
}
export default Routes;