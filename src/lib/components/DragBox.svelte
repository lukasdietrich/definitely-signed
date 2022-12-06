<script lang="ts">
    import type {Readable} from 'svelte/store';
	import type {Dimensions, Size, Position} from 'src/types';
	import type {MoveEvent} from 'src/lib/actions/draggable';
    import {getContext} from 'svelte';
	import {draggable} from 'src/lib/actions/draggable';
	import {containerSizeKey} from 'src/lib/components/context';

    export let keepRatio = true;
	export let dimensions: Dimensions = {
		x: 25,
		y: 25,
		w: 100,
		h: 50,
	};

    const container = getContext<Readable<Size>>(containerSizeKey);

    let offset: Position;
    let originalSize: Size;

    function dragMove({detail: {x, y}}: MoveEvent) {
        const maxOffsetX = $container.w - dimensions.w - dimensions.x;
        const maxOffsetY = $container.h - dimensions.h - dimensions.y;

        const minOffsetX = -dimensions.x;
        const minOffsetY = -dimensions.y;

        offset = {
            x: Math.min(maxOffsetX, Math.max(minOffsetX, x)),
            y: Math.min(maxOffsetY, Math.max(minOffsetY, y)),
        };
    }

    function dragEnd({detail: {x, y}}: MoveEvent) {
        const maxX = $container.w - dimensions.w;
        const maxY = $container.h - dimensions.h;

        dimensions.x = Math.min(maxX, Math.max(0, dimensions.x + x));
        dimensions.y = Math.min(maxY, Math.max(0, dimensions.y + y));

        offset = null;
    }

    function resizeStart() {
        originalSize = {w: dimensions.w, h: dimensions.h};
        document.body.classList.add('cursor-resize');
    }

    function resizeMove({detail: {x, y}}: MoveEvent) {
        const maxWidth = $container.w - dimensions.x;
        const maxHeight = $container.h - dimensions.y;

        dimensions.w = Math.min(maxWidth, Math.max(0, originalSize.w + x));

        if (keepRatio) {
            const ratio = originalSize.h / originalSize.w;
            const ratioHeight = dimensions.w * ratio;

            if (ratioHeight > maxHeight) {
                dimensions.h = maxHeight;
                dimensions.h = dimensions.h / ratio;
            } else {
                dimensions.h = Math.min(maxHeight, dimensions.w * ratio);
            }
        } else {
            dimensions.h = Math.min(maxHeight, Math.max(0, originalSize.h + y));
        }
    }

    function resizeEnd(event: MoveEvent) {
        resizeMove(event);
        document.body.classList.remove('cursor-resize');
        originalSize = null;
    }
</script>

<div class="absolute select-none ring rounded-sm"
     style:width={`${dimensions.w}px`}
     style:height={`${dimensions.h}px`}
     style:top={`${dimensions.y}px`}
     style:left={`${dimensions.x}px`}
     style:transform={`translate(${offset?.x ?? 0}px, ${offset?.y ?? 0}px)`}
>
    <slot/>

    <span class="absolute inset-0 cursor-move"
          use:draggable
          on:x-drag-start={dragMove}
          on:x-drag-move={dragMove}
          on:x-drag-end={dragEnd}>
  </span>

    <span class="absolute -bottom-4.2 -right-4.2 w-8 h-8 p-2 cursor-resize"
          use:draggable
          on:x-drag-start={resizeStart}
          on:x-drag-move={resizeMove}
          on:x-drag-end={resizeEnd}
    >
    <span class="block w-full h-full bg-blue-500 rounded-full"></span>
  </span>
</div>
