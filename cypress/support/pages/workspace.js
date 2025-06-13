class Workspace {
    // Navigate to the workspace
    navigateTo(workspace_name) {
        cy.get(`[data-testid="workspace-link-${workspace_name}"`).click();
    }
}
export default Workspace;