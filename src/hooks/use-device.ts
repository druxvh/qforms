'use client';

import { useSyncExternalStore } from 'react';

/**
Type-Safe hook to determine the current device type based on viewport width.
Returns an object with boolean flags for isMobile, isTablet, and isDesktop.
*/

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

type DeviceState = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

const BREAKPOINTS = {
    mobile: `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    tablet: `(min-width:  ${MOBILE_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`,
    desktop: `(min-width: ${DESKTOP_BREAKPOINT}px)`,
} as const;

const SERVER_SNAPSHOT: DeviceState = {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
};

// Internal cache to ensure referential stability
let cachedSnapshot: DeviceState = SERVER_SNAPSHOT;

export function useDevice(): DeviceState {
    return useSyncExternalStore(
        // subscribe function: React calls this to listen for changes
        (cb) => {
            const mqls = Object.values(BREAKPOINTS).map((q) => window.matchMedia(q));
            mqls.forEach((mql) => mql.addEventListener('change', cb));
            return () => {
                mqls.forEach((mql) => mql.removeEventListener('change', cb));
            };
        },

        // getSnapshot function: to get the current value on the client
        () => {
            const isMobile = window.matchMedia(BREAKPOINTS.mobile).matches;
            const isTablet = window.matchMedia(BREAKPOINTS.tablet).matches;
            const isDesktop = window.matchMedia(BREAKPOINTS.desktop).matches;

            // Only update the object reference if values actually changed
            if (
                cachedSnapshot.isMobile !== isMobile ||
                cachedSnapshot.isTablet !== isTablet ||
                cachedSnapshot.isDesktop !== isDesktop
            ) {
                cachedSnapshot = { isMobile, isTablet, isDesktop };
            }
            return cachedSnapshot;
        },

        // getServerSnapshot function: for SSR, defualts to isDesktop
        () => SERVER_SNAPSHOT,
    );
}
