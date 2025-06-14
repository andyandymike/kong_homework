import { workspace_sidebar } from '../config/selector';
import { workspaceSideBarEnum } from '../config/project_enum';

class WorkSpaceSidebar {
    navigateTo(sidebar_item) {
        cy.get(workspace_sidebar.sidebar_item_workspaces).then(($root) => {
            switch (sidebar_item) {
                case workspaceSideBarEnum.sidebar.types.OVERVIEW:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_overview).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.SERVICES:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_services).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.ROUTES:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_routes).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.CONSUMERS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_consumers).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.PLUGINS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_plugins).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.REDIS_CONFIGURATIONS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_redis_configurations).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.UPSTREAMS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_upstreams).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.CERTIFICATES:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_certificates).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.SNIS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_snis).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.KEYS:
                    cy.wrap($root).find(workspace_sidebar.sidebar_item_keys).click();
                    break;
                case workspaceSideBarEnum.sidebar.types.VAULTS:
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