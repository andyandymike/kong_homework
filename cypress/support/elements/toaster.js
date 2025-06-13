import { toaster } from '../config/selector';

// Toaster element is not always present, so we need to wait for it to appear
// If it appears, close it
// If it does not appear, do nothing
class Toaster {
    // Close toaster if it exists
    closeToaster() {
        cy.wait(1000);
        cy.get(toaster.toaster_class_root, { timeout: 0, multiple: true }).each(($el, index, $list) => {
            if ($el.length && $el.is(':visible')) {
                cy.wrap($el).find(toaster.toaster_icon_close).click();
            } else {
                cy.log('No toaster present to close');
            }
        });
    }
}
export default Toaster;