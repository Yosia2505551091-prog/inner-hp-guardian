## Fix Badge Tooltip Overflow on Mobile

Problem: On narrow viewports, clicking a badge near the left or right edge causes the fixed-position tooltip to render partially off-screen.

Solution:

1. **Make tooltip width responsive**  
   Change `w-56` to `w-52 sm:w-56` (or similar) so the bubble is slightly smaller on mobile, giving more margin before it hits the edge.

2. **Clamp horizontal position to viewport bounds**  
   In the `handleBadgeClick` and `onMouseEnter` handlers, compute the tooltip width and clamp `left` so the bubble stays fully inside the viewport:
   - Read `window.innerWidth`
   - Calculate left edge: `centerX - tooltipWidth / 2`
   - Clamp: `max(padding, min(leftEdge, viewportWidth - tooltipWidth - padding))`
   - Use the clamped left edge + `tooltipWidth / 2` as the new `left` value for `tipPos`

3. **Add small viewport padding**  
   Keep a `8px` (or `12px`) buffer from the screen edges so the tooltip isn't flush against the bezel.

This keeps the tooltip readable while ensuring it never overflows off-screen, regardless of which badge is tapped.