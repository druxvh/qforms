'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BrainCog, ListPlus } from 'lucide-react';
import { useState } from 'react';
import AISidebar from './AISidebar';
import FieldSidebar from './FieldSidebar';

// type SidebarItem = 'AI' | 'Fields' | 'Style' | 'Setting';
type SidebarItem = 'AI' | 'Fields';

const menubarItems = [
    { id: 1, icon: BrainCog, name: 'AI' },
    { id: 2, icon: ListPlus, name: 'Fields' },
    // { id: 3, icon: Palette, name: 'Style' },
    // { id: 4, icon: Settings, name: 'Setting' },
];

export default function Sidebar() {
    const [activeSidebarItem, setActiveSidebarItem] = useState<SidebarItem>('Fields');

    return (
        <div className="hidden border-r sm:flex">
            {/* 1. Mini Sidebar */}
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

            {/* 2. Sidebar w/ Fields */}
            <div className="flex h-full w-full max-w-sm min-w-xs flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Fields */}
                    {activeSidebarItem === 'Fields' && <FieldSidebar />}

                    {/* AI */}
                    {activeSidebarItem === 'AI' && <AISidebar />}

                    {/* Style */}
                    {/* {activeSidebarItem === 'Style' && (
                        <div className="h-full space-y-4">
                            <h2 className="font-semibold">Style</h2>
                            <Tabs defaultValue="themes" className="w-full">
                                <TabsList className="h-fit w-full bg-gray-300">
                                    <TabsTrigger value="themes" className="">
                                        Themes
                                    </TabsTrigger>
                                    <TabsTrigger value="custom">Custom</TabsTrigger>
                                </TabsList>
                                <TabsContent value="themes" className="h-full">
                                    <div className="flex flex-col gap-2">
                                        themes coming soon!
                                    </div>
                                </TabsContent>
                                <TabsContent value="custom">
                                    <FormSidebar />
                                </TabsContent>
                            </Tabs>
                        </div>
                    )} */}

                    {/* Settings */}
                    {/* {activeSidebarItem === 'Setting' && (
                        <div className="h-full">
                            <h2 className="font-semibold">
                                Settings options coming soon!
                            </h2>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
