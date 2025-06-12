import CommonFunc from '../functions/common_func';
import Toaster from '../elements/toaster';
import { routes } from '../selectors/selector';

class Routes {
    constructor() {
        this.common_func = new CommonFunc();
        this.toaster = new Toaster();
    }

    //create new route based on the service name and kong test services url
    createNewRoutes(route_name, service_name, protocols, path, count) {
        this.common_func.createNewEntity('route', count);
        cy.get(routes.route_form_name).type(route_name);
        cy.get(routes.route_form_service_id).type(service_name);
        cy.get(routes.route_form_protocols).click();
        cy.get(`[data-testid="select-item-${protocols}"]`).click();
        cy.get(routes.route_form_paths_input).type(path);
        cy.get(routes.route_create_form_submit).click();
        this.toaster.closeToaster();
    }
}
export default Routes;