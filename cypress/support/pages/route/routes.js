import Entities from '../base/entities';
import { entitiesEnum } from '../../config/project_enum';
import RouteConfig from './route_config';

// Class for Routes page
class Routes extends Entities {
    constructor() {
        super();
    }

    // Create new route based on the service name and kong test services url
    createNewRoute(route_config = {}, count) {
        super.createNewEntity(entitiesEnum.types.ROUTES, count);
        let route_config_page = new RouteConfig();
        route_config_page.saveRoute(route_config);
    }
}
export default Routes;