'use client';

import { useDesignerActions, useDesignerSelectedElement } from '@/hooks/use-designer';
import FieldProperties from './FieldProperties';
import Preview from './Preview';
import { useDevice } from '@/hooks/use-device';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

export default function SidePanel() {
    const { isMobile, isDesktop } = useDevice();
    const selectedElement = useDesignerSelectedElement();
    const { setSelectedElement } = useDesignerActions();

    const isOpen = !!selectedElement;
    const handleClose = () => setSelectedElement(null);

    // For Desktop
    if (isDesktop) {
        return (
            <div className="hidden min-h-0 w-xs shrink-0 rounded-sm border-t border-l lg:block xl:w-sm">
                {selectedElement ? <FieldProperties /> : <Preview />}
            </div>
        );
    }

    // For Tablet/Mobile
    return (
        <Drawer
            open={isOpen}
            onOpenChange={(val) => !val && handleClose()}
            direction={isMobile ? 'bottom' : 'right'}
        >
            <DrawerContent className={isMobile ? 'h-[80vh]' : 'h-full w-xs'}>
                <DialogTitle hidden aria-hidden />
                <DialogDescription hidden aria-hidden />
                <FieldProperties />
            </DrawerContent>
        </Drawer>
    );
}
