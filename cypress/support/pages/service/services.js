import Entities from '../base/entities';
import { entitiesEnum } from '../../config/project_enum';
import ServiceConfig from './service_config';

// Class for Services page
class Services extends Entities {
    constructor() {
        super();
    }

    // Create new service based on the service name and kong test services url
    createNewService(service_config = {}, count) {
        super.createNewEntity(entitiesEnum.types.SERVICES, count);
        let service_config_page = new ServiceConfig();
        service_config_page.saveService(service_config);
    }
}
export default Services;    