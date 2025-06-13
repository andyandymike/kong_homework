export const toaster = {
    toaster_class_root: '.k-toaster',
    toaster_icon_close: '[data-testid="kui-icon-svg-close-icon"]',
}

export const workspace_sidebar = {
    sidebar_item_workspaces: '[data-testid="sidebar-item-workspaces"]',
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

export const entities = {
    entities_button_empty_state: '[data-testid="empty-state-action"]',
    entities_button_dropdown_trigger: '[data-testid="row-actions-dropdown-trigger"]',
    entities_button_delete: '[data-testid="action-entity-delete"]',
    entities_input_delete_confirmation: '[data-testid="confirmation-input"]',
    entities_button_delete_confirmation: '[data-testid="modal-action-button"]',
}

export const overview = {
    overview_class_entity_count: '.metric-value-text',
}

export const routes = {
    routes_input_name: '[data-testid="route-form-name"]',
    routes_input_service_id: '[data-testid="route-form-service-id"]',
    routes_input_protocols: '[data-testid="route-form-protocols"]',
    routes_input_paths: '[data-testid="route-form-paths-input-1"]',
    routes_button_submit: '[data-testid="route-create-form-submit"]',
}

export const services = {
    services_input_name: '[data-testid="gateway-service-name-input"]',
    services_input_url: '[data-testid="gateway-service-url-input"]',
    services_button_submit: '[data-testid="service-create-form-submit"]',
}

export const entity_detail = {
    entity_detail_property_detail_id: '[data-testid="id-property-value"]',
}

export const service_detail = {
    service_detail_property_enabled_status: '[data-testid="enabled-badge-status"]',
}