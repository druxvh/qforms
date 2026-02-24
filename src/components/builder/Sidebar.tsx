'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FormElements } from '@/types/form';
import { BrainCog, Grid2x2Plus, ListPlus, Palette, Settings } from 'lucide-react';
import { SidebarFieldElement } from './FormElements';
import { useState } from 'react';

type SidebarItem = 'AI' | 'Fields' | 'Layout' | 'Themes' | 'Setting';

const menubarItems = [
    { id: 1, icon: BrainCog, name: 'AI' },
    { id: 2, icon: ListPlus, name: 'Fields' },
    { id: 3, icon: Grid2x2Plus, name: 'Layout' },
    { id: 4, icon: Palette, name: 'Themes' },
    { id: 5, icon: Settings, name: 'Setting' },
];

export default function Sidebar() {
    // add state for fields and other sidebar btns
    const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>('Fields');

    return (
        <div className="hidden border-r sm:flex">
            {/* 1. Mini Sidebar (Fixed) */}
            <div className="flex w-14 shrink-0 flex-col items-center gap-4 py-4">
                {menubarItems.map((item) => {
                    const Icon = item.icon;

                    return item.name === 'AI' ? (
                        <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() =>
                                        setActiveSidebarItem(item.name as SidebarItem)
                                    }
                                    size={'icon-lg'}
                                    className="group relative bg-amber-600/20 font-mono text-amber-600 hover:bg-amber-600/30"
                                >
                                    AI
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{item.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() =>
                                        setActiveSidebarItem(item.name as SidebarItem)
                                    }
                                    size={'icon-lg'}
                                    className="group relative"
                                >
                                    <Icon className="text-primary-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{item.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>

            {/* 2. Sidebar w/ Fields (Scrollable) */}
            <div className="flex h-full w-full max-w-sm min-w-xs flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Fields */}
                    {activeSidebarItem === 'Fields' && (
                        <div>
                            <p className="font-semibold">Fields</p>
                            <div className="flex flex-col gap-2 py-4">
                                {Object.values(FormElements).map((formElement, idx) => (
                                    <SidebarFieldElement
                                        key={idx}
                                        formElement={formElement}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Layout */}
                    {activeSidebarItem === 'Layout' && (
                        <div className="flex flex-col gap-2 py-4">
                            <p className="font-semibold">Layout options coming soon!</p>
                        </div>
                    )}

                    {/* Themes */}
                    {activeSidebarItem === 'Themes' && (
                        <div className="flex flex-col gap-2 py-4">
                            <p className="font-semibold">Themes options coming soon!</p>
                        </div>
                    )}

                    {/* Settings */}
                    {activeSidebarItem === 'Setting' && (
                        <div className="flex flex-col gap-2 py-4">
                            <p className="font-semibold">Settings options coming soon!</p>
                        </div>
                    )}

                    {/* AI */}
                    {activeSidebarItem === 'AI' && (
                        <div className="flex flex-col gap-2 py-4">
                            <p className="font-semibold">AI features coming soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
