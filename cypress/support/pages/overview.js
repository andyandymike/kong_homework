import { overview } from '../selectors/selector';

class Overview {
    //get current entity count
    getCurrentEntityCount(entity_name, output) {
        cy.get(`[data-testid="${entity_name}"]`).find(overview.entity_count).invoke('text').then((text) => {
            let services_count = Number(text);
            cy.wrap(services_count).as(output);
        });
    }
}
export default Overview;