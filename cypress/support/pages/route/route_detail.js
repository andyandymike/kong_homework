import { route_detail } from '../../config/selector';
import { routeDetailEnum } from '../../config/project_enum';
import EntityDetail from '../base/entity_detail';

// Class for Route Detail page
class RouteDetail extends EntityDetail {
    constructor() {
        super();
    }

    // Check is on route detail page
    isOnRouteDetail() {
        cy.get(route_detail.route_detail_button_header_actions).invoke('text').should('equal', routeDetailEnum.button.ROUTE_ACTIONS);
    }
}

export default RouteDetail;