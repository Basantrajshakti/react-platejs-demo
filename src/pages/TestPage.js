import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';

export default function TestPage() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
        <h1 className="font-bold text-2xl">Radix UI Component Tests</h1>

        {/* Test 1: Simple Tooltip */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-lg">Test 1: Tooltip</h2>
          <Tooltip>
            <TooltipTrigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Hover me for tooltip
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip!</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Test 2: Dropdown Menu */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-lg">Test 2: Dropdown Menu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Click me for dropdown
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Test 3: Popover */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-lg">Test 3: Popover</h2>
          <Popover>
            <PopoverTrigger className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
              Click me for popover
            </PopoverTrigger>
            <PopoverContent>
              <p>This is a popover with some content!</p>
            </PopoverContent>
          </Popover>
        </div>

        {/* Instructions */}
        <div className="mt-8 max-w-md rounded border border-gray-300 bg-gray-50 p-4">
          <h3 className="mb-2 font-semibold">Instructions:</h3>
          <ol className="list-inside list-decimal space-y-1 text-sm">
            <li>Hover over the blue button - tooltip should appear near it</li>
            <li>Click the green button - dropdown should open below it</li>
            <li>Click the purple button - popover should open near it</li>
            <li>Open DevTools (F12) and check Console for errors</li>
            <li>
              In Elements tab, search for "radix" to see if portal elements
              exist
            </li>
          </ol>
        </div>
      </div>
    </TooltipProvider>
  );
}
