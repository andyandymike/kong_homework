class WorkSpaceSidebar {
    navigateTo(sidebar_item) {
        cy.get('[data-testid="sidebar-item-workspaces"]').then(($root) => {
            switch (sidebar_item) {
                case 'overview':
                    cy.wrap($root).find('[data-testid="sidebar-item-overview"]').click();
                    break;
                case 'services':
                    cy.wrap($root).find('[data-testid="sidebar-item-gateway-services"]').click();
                    break;
                case 'routes':
                    cy.wrap($root).find('[data-testid="sidebar-item-routes"]').click();
                    break;
                case 'consumers':
                    cy.wrap($root).find('[data-testid="sidebar-item-consumers"]').click();
                    break;
                case 'plugins':
                    cy.wrap($root).find('[data-testid="sidebar-item-plugins"]').click();
                    break;
                case 'redis_configurations':
                    cy.wrap($root).find('[data-testid="sidebar-item-redis-configurations"]').click();
                    break;
                case 'upstreams':
                    cy.wrap($root).find('[data-testid="sidebar-item-upstreams"]').click();
                    break;
                case 'certificates':
                    cy.wrap($root).find('[data-testid="sidebar-item-certificates"]').click();
                    break;
                case 'snis':
                    cy.wrap($root).find('[data-testid="sidebar-item-snis"]').click();
                    break;
                case 'keys':
                    cy.wrap($root).find('[data-testid="sidebar-item-keys"]').click();
                    break;
                case 'vaults':
                    cy.wrap($root).find('[data-testid="sidebar-item-vaults"]').click();
                    break;
                default:
                    cy.log(`Sidebar item ${sidebar_item} not found`);
                    break;
            }
        });
    }
}

export default WorkSpaceSidebar;