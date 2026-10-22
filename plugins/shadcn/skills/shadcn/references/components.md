# shadcn/ui Component Reference

Categorized component descriptions with key props and usage notes. For CLI commands and project setup, see SKILL.md.

## Form & Input

### button
Standard button with variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`, `sm`, `lg`, `icon`. Use `asChild` to render as a different element (e.g., Next.js `Link`).

### button-group
Groups multiple buttons with shared styling and spacing. Useful for toolbar-style action clusters.

### checkbox
Radix-based checkbox with `checked`, `onCheckedChange`, and indeterminate state support.

### combobox
Searchable dropdown combining `command` + `popover`. Not a standalone component — composed from `Command`, `CommandInput`, `CommandList`, `CommandItem` inside a `Popover`.

### date-picker
Calendar-based date selection using `calendar` + `popover`. Supports single date, date range, and presets.

### field
Form field wrapper providing label, description, and error message layout. Pairs with `label` + any input component.

### input
Standard text input. Extends native `<input>` with consistent styling. Use with `label` and `field` for forms.

### input-group
Groups an input with prefix/suffix elements (icons, buttons, text). Useful for search bars, URL inputs, currency fields.

### input-otp
One-time password input with individual character slots. Configurable length and grouping.

### label
Accessible form label. Automatically associates with form controls via `htmlFor`.

### native-select
Styled wrapper around native `<select>` element. Use when platform-native dropdown behavior is preferred over Radix `select`.

### radio-group
Radix-based radio button group. Items defined with `RadioGroupItem` + `Label`.

### select
Radix-based custom select dropdown. Sub-components: `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`.

### slider
Range slider with single or dual thumbs. Props: `min`, `max`, `step`, `value`, `onValueChange`.

### switch
Toggle switch. Props: `checked`, `onCheckedChange`. Use for boolean settings.

### textarea
Multi-line text input. Extends native `<textarea>` with consistent styling.

### toggle
Pressable toggle button with `pressed` state. Variants: `default`, `outline`. Sizes: `default`, `sm`, `lg`.

### toggle-group
Groups multiple toggles with single or multiple selection modes. Props: `type="single"` or `type="multiple"`.

## Data Display

### avatar
Circular image with fallback initials. Sub-components: `Avatar`, `AvatarImage`, `AvatarFallback`.

### badge
Small label/tag. Variants: `default`, `secondary`, `destructive`, `outline`.

### calendar
Month-view calendar using `react-day-picker`. Supports single select, range select, and multiple select modes.

### card
Container with header, content, and footer sections. Sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### chart
Wrapper around Recharts providing consistent theming via CSS variables. Includes `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`.

### data-table
Full-featured table built on TanStack Table. Not a single component — a composition pattern using `table` + TanStack Table for sorting, filtering, pagination, row selection, and column visibility.

### empty
Empty state placeholder with icon, title, and description. Use when a list/table has no data.

### kbd
Keyboard shortcut display. Renders key combinations with proper styling (e.g., `<Kbd>⌘K</Kbd>`).

### progress
Progress bar. Props: `value` (0-100). Animates on value change.

### skeleton
Loading placeholder with shimmer animation. Use to show content layout before data loads.

### spinner
Loading spinner indicator. Sizes: `sm`, `default`, `lg`.

### table
Styled HTML table. Sub-components: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

### typography
Styled text elements: headings (`h1`-`h4`), paragraph, blockquote, inline code, lead text, list items, and muted text.

## Layout & Navigation

### accordion
Collapsible content sections. Single or multiple open items. Sub-components: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`.

### aspect-ratio
Maintains consistent width-to-height ratio for images/video. Wraps content in a fixed aspect ratio container.

### breadcrumb
Navigation breadcrumb trail. Sub-components: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.

### carousel
Content carousel built on Embla Carousel. Sub-components: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`. Supports horizontal/vertical orientation, autoplay, loop.

### collapsible
Expandable/collapsible content section. Sub-components: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Simpler than accordion for single-item expand/collapse.

### direction
RTL/LTR direction provider for internationalization support.

### navigation-menu
Top-level site navigation with dropdown menus. Sub-components: `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`.

### pagination
Page navigation with previous/next and numbered pages. Sub-components: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationLink`, `PaginationEllipsis`.

### resizable
Resizable panel layout. Sub-components: `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Supports horizontal/vertical direction with min/max constraints.

### scroll-area
Custom scrollbar container. Wraps content with styled scrollbars that match the design system. Supports vertical and horizontal scrolling.

### separator
Visual divider line. Supports horizontal and vertical orientation. Use between content sections.

### sidebar
Application sidebar navigation. Full sidebar system with `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger`. Supports collapsible modes: `offcanvas`, `icon`, `none`.

### tabs
Tabbed content panels. Sub-components: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. Controlled via `value`/`onValueChange` or uncontrolled via `defaultValue`.

## Overlays & Feedback

### alert
Callout/banner for important messages. Variants: `default`, `destructive`. Sub-components: `Alert`, `AlertTitle`, `AlertDescription`.

### alert-dialog
Modal confirmation dialog that requires user action. Sub-components: `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`. Use for destructive confirmations.

### command
Command palette / searchable list (like Cmd+K). Built on `cmdk`. Sub-components: `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`. Often combined with `dialog` for a floating command palette.

### context-menu
Right-click context menu. Sub-components mirror `dropdown-menu`: `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`.

### dialog
Modal overlay dialog. Sub-components: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`. Use for forms, details, or any content that requires focus.

### drawer
Bottom sheet / mobile-friendly drawer built on Vaul. Sub-components: `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`. Supports snap points and nested scrolling.

### dropdown-menu
Dropdown menu triggered by a button. Sub-components: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`.

### hover-card
Content card that appears on hover. Sub-components: `HoverCard`, `HoverCardTrigger`, `HoverCardContent`. Use for preview popups (user profiles, link previews).

### menubar
Horizontal menu bar (desktop app style). Sub-components mirror dropdown-menu: `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, etc.

### popover
Generic floating content anchored to a trigger. Sub-components: `Popover`, `PopoverTrigger`, `PopoverContent`. Use for settings panels, color pickers, or any non-modal floating content.

### sheet
Side panel overlay (slides in from edge). Sub-components: `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`. Supports `side`: `top`, `right`, `bottom`, `left`.

### sonner
Toast notification system (preferred over `toast`). Uses Sonner library. Call `toast()` function directly: `toast.success("Saved")`, `toast.error("Failed")`, `toast.promise(...)`. Add `<Toaster />` to layout root.

### toast
Toast notifications (shadcn native). More verbose than Sonner — requires `useToast` hook and `<Toaster />`. Prefer `sonner` for simpler API.

### tooltip
Hover tooltip. Sub-components: `Tooltip`, `TooltipTrigger`, `TooltipContent`. Requires `<TooltipProvider>` wrapper (typically at layout root).
