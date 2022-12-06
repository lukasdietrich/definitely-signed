export interface Coordinates {
    x: number;
    y: number;
}

export type MoveEvent = CustomEvent<Coordinates>;

export function dragging(node: HTMLElement) {
    let origin: Coordinates;

    function calculateOffset(target: Coordinates): Coordinates {
        return {
            x: target.x - origin.x,
            y: target.y - origin.y,
        };
    }

    function dispatchEvent(type: string, event: MouseEvent) {
        node.dispatchEvent(new CustomEvent(type, {
            detail: calculateOffset(event),
        }));
    }

    function mousedown(event: MouseEvent) {
        event.stopPropagation()

        origin = event;
        dispatchEvent('x-drag-start', event);

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    }

    function mouseup(event: MouseEvent) {
        dispatchEvent('x-drag-end', event);

        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
    }

    function mousemove(event: MouseEvent) {
        dispatchEvent('x-drag-move', event);
    }

    node.addEventListener('mousedown', mousedown);

    return {
        destroy() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            node.removeEventListener('mousedown', mousedown);
        }
    }
}
