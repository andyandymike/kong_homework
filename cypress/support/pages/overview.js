class Overview {
    //get current entity count
    getCurrentEntityCount(entity_name, output) {
        cy.get(`[data-testid="${entity_name}"]`).find('[class="metric-value-text"').invoke('text').then((text) => {
            let services_count = Number(text);
            cy.wrap(services_count).as(output);
        });
    }
}
export default Overview;