import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { cn } from '../../lib/utils';

const Separator = React.forwardRef(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
        className
      )}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';
export { Separator };
