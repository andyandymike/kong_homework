class Toaster {
    //close toaster if it exists
    closeToaster() {
        cy.get('.k-toaster', { timeout: 0 }).then($el => {
            if ($el.length && $el.is(':visible')) {
                cy.wrap($el).find('[data-testid="kui-icon-svg-close-icon"]').click();
            } else {
                cy.log('Popup is already gone or hidden');
            }
        });
    }
}
export default Toaster;