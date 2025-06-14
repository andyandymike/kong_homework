import EntityConfig from "../base/entity_config";
import { routes } from '../../config/selector';

class RouteConfig extends EntityConfig {
    constructor() {
        super();
        // Allowed input
        this.setters = {
            routeName: this.setRouteName,
            serviceName: this.setServiceName,
            protocols: this.setProtocols,
            path: this.setPath,
        };
    }

    // Set route name
    setRouteName(route_name) {
        if (route_name != '') {
            cy.get(routes.routes_input_name).type(route_name);
        }
    }

    // Set service name
    setServiceName(service_name) {
        cy.get(routes.routes_input_service_id).type(service_name);
    }

    // Set protocols
    setProtocols(protocols) {
        cy.get(routes.routes_input_protocols).click();
        cy.get(`[data-testid="select-item-${protocols}"]`).click();
    }

    // Set path
    setPath(path) {
        cy.get(routes.routes_input_paths).type(path);
    }

    // Save Route
    saveRoute() {
        cy.get(routes.routes_button_submit).click();
        this.toaster.closeToaster();
    }

    // Save route with config
    saveRoute(route_config = {}) {
        Object.keys(route_config).forEach(key => {
            if (key in this.setters) {
                this.setters[key].call(this, route_config[key]);
            } else {
                cy.log(`Invalid property: "${key}". Will ignore.`);
            }
        });
        cy.get(routes.routes_button_submit).click();
        this.toaster.closeToaster();
    }
}

export default RouteConfig;