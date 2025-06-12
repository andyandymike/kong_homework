import { workspace_sidebar } from '../selectors/selector';

class WorkSpaceSidebar {
    navigateTo(sidebar_item) {
        cy.get('[data-testid="sidebar-item-workspaces"]').then(($root) => {
            switch (sidebar_item) {
                case 'overview':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_overview).click();
                    break;
                case 'services':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_services).click();
                    break;
                case 'routes':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_routes).click();
                    break;
                case 'consumers':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_consumers).click();
                    break;
                case 'plugins':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_plugins).click();
                    break;
                case 'redis_configurations':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_redis_configurations).click();
                    break;
                case 'upstreams':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_upstreams).click();
                    break;
                case 'certificates':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_certificates).click();
                    break;
                case 'snis':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_snis).click();
                    break;
                case 'keys':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_keys).click();
                    break;
                case 'vaults':
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_vaults).click();
                    break;
                default:
                    cy.log(`Sidebar item ${sidebar_item} not found`);
                    break;
            }
        });
    }
}

export default WorkSpaceSidebar;