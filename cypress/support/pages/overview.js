import { overview } from '../config/selector';

class Overview {
    // Get current entity count and store it in alias
    getCurrentEntityCount(entity_name, output) {
        cy.get(`[data-testid="${entity_name}"]`).find(overview.overview_class_entity_count).invoke('text').then((text) => {
            let services_count = Number(text);
            cy.wrap(services_count).as(output);
        });
    }
}
export default Overview;