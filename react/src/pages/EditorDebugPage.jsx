import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../components/ui/tooltip';

export default function EditorDebugPage() {
  useEffect(() => {
    // Log all radix portal elements
    const checkPortals = () => {
      const portals = document.querySelectorAll(
        '[data-radix-popper-content-wrapper], [data-radix-portal]'
      );
      console.log('=== RADIX PORTAL DEBUG ===');
      console.log(`Found ${portals.length} portal elements`);
      portals.forEach((portal, index) => {
        const styles = window.getComputedStyle(portal);
        console.log(`Portal ${index}:`, {
          element: portal,
          position: styles.position,
          top: styles.top,
          left: styles.left,
          zIndex: styles.zIndex,
          display: styles.display,
          visibility: styles.visibility,
        });
      });
    };

    // Check portals every 2 seconds
    const interval = setInterval(checkPortals, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-bold text-2xl">Editor Context Debug</h1>

      <div className="rounded border border-yellow-500 bg-yellow-50 p-4">
        <h2 className="mb-2 font-semibold">Instructions:</h2>
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>Open DevTools Console (F12)</li>
          <li>Hover/click the buttons below</li>
          <li>Check console for portal debug info</li>
          <li>Look for position/z-index issues</li>
        </ol>
      </div>

      {/* Test within editor-like structure */}
      <div className="w-full max-w-4xl rounded border border-gray-300 bg-white p-8 shadow-lg">
        <h2 className="mb-4 font-semibold text-lg">
          Simulated Editor Container
        </h2>

        <div className="space-y-4">
          <Tooltip>
            <TooltipTrigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Tooltip Test
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Dropdown Test
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Test with Plate-like structure */}
      <div className="w-full max-w-4xl">
        <div className="relative rounded border border-gray-300 bg-white p-8 shadow-lg">
          <h2 className="mb-4 font-semibold text-lg">
            With Relative Positioning (like Plate editor)
          </h2>

          <div className="space-y-4">
            <Tooltip>
              <TooltipTrigger className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
                Tooltip in Relative Container
              </TooltipTrigger>
              <TooltipContent>
                <p>Does this work?</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                Dropdown in Relative Container
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Item A</DropdownMenuItem>
                <DropdownMenuItem>Item B</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
