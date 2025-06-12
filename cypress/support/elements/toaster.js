import { toaster } from '../selectors/selector';

class Toaster {
    //close toaster if it exists
    closeToaster() {
        //wait for toaster to appear
        cy.wait(1000);
        //close toaster if it exists
        cy.get(toaster.toaster_root_class, { timeout: 0, multiple: true }).each(($el, index, $list) => {
            if ($el.length && $el.is(':visible')) {
                cy.wrap($el).find(toaster.toaster_close_icon).click();
            } else {
                cy.log('Popup is already gone or hidden');
            }
        });
    }
}
export default Toaster;