"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { PanelGroup, Panel, PanelResizer } from "react-resizable-panels";

import { cn } from "@/app/components/ui/utils";

/* Panel Group */
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

/* Panel */
function ResizablePanel(
  props: React.ComponentProps<typeof Panel>
) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

/* Handle */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof PanelResizer> & {
  withHandle?: boolean;
}) {
  return (
    <PanelResizer
      data-slot="resizable-handle"
      className={cn(
        "bg-border relative flex w-px items-center justify-center",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </PanelResizer>
  );
}

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
};
