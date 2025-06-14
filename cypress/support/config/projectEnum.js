export const overviewEnum = {
    summary: {
        types: {
            SERVICES: 'Services',
            ROUTES: 'Routes',
            CONSUMERS: 'Consumers',
            PLUGINS: 'Plugins',
        },
    },
}

export const workspaceEnum = {
    DEFAULT_WORKSPACE: 'default',
}

export const workspaceSideBarEnum = {
    sidebar: {
        types: {
            OVERVIEW: 'overview',
            SERVICES: 'services',
            ROUTES: 'routes',
            CONSUMERS: 'consumers',
            PLUGINS: 'plugins',
            REDIS_CONFIGURATIONS: 'redis_configurations',
            UPSTREAMS: 'upstreams',
            CERTIFICATES: 'certificates',
            SNIS: 'snis',
            KEYS: 'keys',
            VAULTS: 'vaults',
        },
    },
}

export const entitiesEnum = {
    types: {
        SERVICES: 'gateway-service',
        ROUTES: 'route',
    },
}

export const routesEnum = {
    protocols: {
        GRPC: 'grpc',
        GRPCS: 'grpcs',
        GRPC_GRPCS: 'grpc,grpcs',
        HTTP: 'http',
        HTTPS: 'https',
        HTTP_HTTPS: 'http,https',
        TCP: 'tcp',
        TLS: 'tls',
        TLS_UDP: 'tls,udp',
        TCP_UDP: 'tcp,udp',
        TCP_TLS: 'tcp,tls',
        TCP_TLS_UDP: 'tcp,tls,udp',
        TLS_PASSTHROUGH: 'tls_passthrough',
        UDP: 'udp',
        WS: 'ws',
        WSS: 'wss',
        WS_WSS: 'ws,wss',
    },
}

export const routeDetailEnum = {
    button: {
        ROUTE_ACTIONS: 'Route actions '
    }
}

export const serviceDetailEnum = {
    button: {
        SERVICE_ACTIONS: 'Gateway Service actions '
    }
}
