<script lang="ts">
    import type {Readable} from 'svelte/store';
    import type {Coordinates, MoveEvent} from './dragging';
    import type {Container} from './context';
    import {getContext} from 'svelte';
    import {dragging} from './dragging';
    import {key} from './context';

    export let top = 25;
    export let left = 25;
    export let width = 100;
    export let height = 50;
    export let keepRatio = true;

    const container = getContext<Readable<Container>>(key);

    let offset: Coordinates;
    let originalSize: { width: number; height: number };

    function dragMove({detail: {x, y}}: MoveEvent) {
        const maxOffsetX = $container.width - width - left;
        const maxOffsetY = $container.height - height - top;

        const minOffsetX = -left;
        const minOffsetY = -top;

        offset = {
            x: Math.min(maxOffsetX, Math.max(minOffsetX, x)),
            y: Math.min(maxOffsetY, Math.max(minOffsetY, y)),
        };
    }

    function dragEnd({detail: {x, y}}: MoveEvent) {
        const maxLeft = $container.width - width;
        const maxTop = $container.height - height;

        left = Math.min(maxLeft, Math.max(0, left + x));
        top = Math.min(maxTop, Math.max(0, top + y));

        offset = null;
    }

    function resizeStart() {
        originalSize = {width, height};
        document.body.classList.add('cursor-resize');
    }

    function resizeMove({detail: {x, y}}: MoveEvent) {
        const maxWidth = $container.width - left;
        const maxHeight = $container.height - top;

        width = Math.min(maxWidth, Math.max(0, originalSize.width + x));

        if (keepRatio) {
            const ratio = originalSize.height / originalSize.width;
            const ratioHeight = width * ratio;

            if (ratioHeight > maxHeight) {
                height = maxHeight;
                width = height / ratio;
            } else {
                height = Math.min(maxHeight, width * ratio);
            }
        } else {
            height = Math.min(maxHeight, Math.max(0, originalSize.height + y));
        }
    }

    function resizeEnd(event: MoveEvent) {
        resizeMove(event);
        document.body.classList.remove('cursor-resize');
        originalSize = null;
    }
</script>

<div class="absolute select-none ring rounded-sm"
     style:width={`${width}px`}
     style:height={`${height}px`}
     style:top={`${top}px`}
     style:left={`${left}px`}
     style:transform={`translate(${offset?.x ?? 0}px, ${offset?.y ?? 0}px)`}
>
    <slot/>

    <span class="absolute inset-0 cursor-move"
          use:dragging
          on:x-drag-start={dragMove}
          on:x-drag-move={dragMove}
          on:x-drag-end={dragEnd}>
  </span>

    <span class="absolute -bottom-4.2 -right-4.2 w-8 h-8 p-2 cursor-resize"
          use:dragging
          on:x-drag-start={resizeStart}
          on:x-drag-move={resizeMove}
          on:x-drag-end={resizeEnd}
    >
    <span class="block w-full h-full bg-blue-500 rounded-full"></span>
  </span>
</div>