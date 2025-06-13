import { routes } from '../selectors/selector';
import Entities from './entities';
import { entitiesEnum } from '../selectors/projectEnum';

class Routes extends Entities {
    constructor() {
        super();
    }

    // Create new route based on the service name and kong test services url
    createNewRoutes(route_name, service_name, protocols, path, count) {
        super.createNewEntity(entitiesEnum.types.ROUTES, count);
        cy.get(routes.routes_input_name).type(route_name);
        cy.get(routes.routes_input_service_id).type(service_name);
        cy.get(routes.routes_input_protocols).click();
        cy.get(`[data-testid="select-item-${protocols}"]`).click();
        cy.get(routes.routes_input_paths).type(path);
        cy.get(routes.routes_button_submit).click();
        this.toaster.closeToaster();
    }
}
export default Routes;