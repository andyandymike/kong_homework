export const toaster = {
    toaster_root_class: '.k-toaster',
    toaster_close_icon: '[data-testid="kui-icon-svg-close-icon"]',
}

export const workspace_sidebar = {
    sidebar_item_overview: '[data-testid="sidebar-item-overview"]',
    sidebar_item_services: '[data-testid="sidebar-item-gateway-services"]',
    sidebar_item_routes: '[data-testid="sidebar-item-routes"]',
    sidebar_item_consumers: '[data-testid="sidebar-item-consumers"]',
    sidebar_item_plugins: '[data-testid="sidebar-item-plugins"]',
    sidebar_item_redis_configurations: '[data-testid="sidebar-item-redis-configurations"]',
    sidebar_item_upstreams: '[data-testid="sidebar-item-upstreams"]',
    sidebar_item_certificates: '[data-testid="sidebar-item-certificates"]',
    sidebar_item_snis: '[data-testid="sidebar-item-snis"]',
    sidebar_item_keys: '[data-testid="sidebar-item-keys"]',
    sidebar_item_vaults: '[data-testid="sidebar-item-vaults"]',
}

export const common_func = {
    empty_state_action: '[data-testid="empty-state-action"]',
    entity_actions_dropdown_trigger: '[data-testid="row-actions-dropdown-trigger"]',
    entity_delete_action: '[data-testid="action-entity-delete"]',
    entity_delete_confirmation_input: '[data-testid="confirmation-input"]',
    entity_delete_confirmation_button: '[data-testid="modal-action-button"]',
}

export const overview = {
    entity_count: '[class="metric-value-text"]',
}

export const routes = {
    route_form_name: '[data-testid="route-form-name"]',
    route_form_service_id: '[data-testid="route-form-service-id"]',
    route_form_protocols: '[data-testid="route-form-protocols"]',
    route_form_paths_input: '[data-testid="route-form-paths-input-1"]',
    route_create_form_submit: '[data-testid="route-create-form-submit"]',
}

export const services = {
    service_form_name: '[data-testid="gateway-service-name-input"]',
    service_form_url: '[data-testid="gateway-service-url-input"]',
    service_create_form_submit: '[data-testid="service-create-form-submit"]',
}