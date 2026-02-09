# Debugging Tooltips and Dropdowns

If tooltips and dropdowns are not working in the Plate.js editor, follow these debugging steps:

## 1. Check Browser Console

Open DevTools (F12) and look for errors related to:
- `Portal` or `Radix UI`
- `@floating-ui`
- `useFloating` hooks
- CSS variable errors

## 2. Verify Component Structure

In the browser DevTools Elements tab, when you select text or hover over a button:

1. Search for `[data-radix-popper-content-wrapper]` - these should appear in the DOM
2. Check if they have proper positioning styles (should not be `position: fixed; top: 0; left: 0`)
3. Look for `z-index` values - they should be 50 or higher

## 3. Check TooltipProvider

The app must be wrapped with `TooltipProvider`. Verify in `src/App.jsx`:

```jsx
<TooltipProvider delayDuration={0} skipDelayDuration={0}>
  <BrowserRouter>
    {/* routes */}
  </BrowserRouter>
</TooltipProvider>
```

## 4. Verify Dependencies

Ensure these are installed:
```bash
npm list @radix-ui/react-portal @radix-ui/react-tooltip @floating-ui/react
```

All should show installed versions.

## 5. Common Issues

### Issue: Floating toolbar appears in top-left corner
**Cause**: Missing `@floating-ui/react` or incorrect positioning
**Fix**: Ensure `@floating-ui/react` is installed and imported in floating components

### Issue: Tooltips don't appear at all
**Cause**: Missing `TooltipProvider` wrapper or `@radix-ui/react-portal`
**Fix**: Wrap app with `TooltipProvider` and install `@radix-ui/react-portal`

### Issue: Dropdowns don't open
**Cause**: Missing portal dependencies or z-index issues
**Fix**: Install all Radix UI portal packages and check CSS z-index

### Issue: Components.json misconfiguration
**Cause**: `components.json` has `"rsc": true` or `"tsx": true` for non-Next.js/non-TS setup
**Fix**: Set both to `false` and update CSS path to `"src/App.css"`

## 6. Test in Isolation

Create a simple test component:

```jsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function TestTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>I'm a tooltip!</TooltipContent>
    </Tooltip>
  );
}
```

If this works, the issue is in the editor integration. If not, it's a setup issue.

## 7. Nuclear Option

If nothing works:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Restart dev server
