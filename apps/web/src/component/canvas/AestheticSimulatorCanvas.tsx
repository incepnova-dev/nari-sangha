import React, { useRef, useEffect, useCallback } from 'react';

interface Landmark {
    x: number;
    y: number;
    label: string;
}

interface AestheticSimulatorCanvasProps {
    image: HTMLImageElement | null;
    params: Record<string, number>;
    landmarks: Record<string, Landmark>;
    mode: 'face' | 'body';
    sliderPos: number;
}

const AestheticSimulatorCanvas: React.FC<AestheticSimulatorCanvasProps> = ({
    image,
    params,
    landmarks,
    mode,
    sliderPos
}) => {
    const canvasOrigRef = useRef<HTMLCanvasElement>(null);
    const canvasModRef = useRef<HTMLCanvasElement>(null);
    const baseImageDataRef = useRef<ImageData | null>(null);

    const warpPixels = useCallback((
        data: ImageData,
        baseData: ImageData,
        pos: Landmark,
        radiusPct: number,
        strength: number,
        width: number,
        height: number
    ) => {
        const src = baseData.data;
        const dst = data.data;

        const cx = pos.x * width;
        const cy = pos.y * height;
        const r = radiusPct * width;
        const rSq = r * r;

        const minX = Math.max(0, Math.floor(cx - r));
        const maxX = Math.min(width, Math.ceil(cx + r));
        const minY = Math.max(0, Math.floor(cy - r));
        const maxY = Math.min(height, Math.ceil(cy + r));

        for (let y = minY; y < maxY; y++) {
            for (let x = minX; x < maxX; x++) {
                const dx = x - cx;
                const dy = y - cy;
                const distSq = dx * dx + dy * dy;

                if (distSq < rSq) {
                    const dist = Math.sqrt(distSq);
                    const t = dist / r;
                    const offset = (1 - t * t) * strength;
                    const factor = 1 - offset;

                    let sx = cx + dx * factor;
                    let sy = cy + dy * factor;

                    sx = Math.min(Math.max(sx, 0), width - 1);
                    sy = Math.min(Math.max(sy, 0), height - 1);

                    const srcIdx = (Math.floor(sy) * width + Math.floor(sx)) * 4;
                    const dstIdx = (y * width + x) * 4;

                    dst[dstIdx] = src[srcIdx];
                    dst[dstIdx + 1] = src[srcIdx + 1];
                    dst[dstIdx + 2] = src[srcIdx + 2];
                }
            }
        }
    }, []);

    const redraw = useCallback(() => {
        if (!image || !canvasOrigRef.current || !canvasModRef.current || !baseImageDataRef.current) return;

        const canvasOrig = canvasOrigRef.current;
        const canvasMod = canvasModRef.current;
        const width = canvasOrig.width;
        const height = canvasOrig.height;

        const outputData = new ImageData(
            new Uint8ClampedArray(baseImageDataRef.current.data),
            width,
            height
        );

        if (mode === 'face') {
            if (params.nose > 0) warpPixels(outputData, baseImageDataRef.current, landmarks.nose, 0.12, -0.4 * (params.nose / 100), width, height);
            if (params.lips > 0) warpPixels(outputData, baseImageDataRef.current, landmarks.lips, 0.12, 0.4 * (params.lips / 100), width, height);
            if (params.jaw > 0) {
                const s = -0.3 * (params.jaw / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.jawL, 0.18, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.jawR, 0.18, s, width, height);
            }
            if (params.chin > 0) warpPixels(outputData, baseImageDataRef.current, landmarks.chin, 0.12, 0.3 * (params.chin / 100), width, height);
            if (params.cheeks > 0) {
                const s = 0.25 * (params.cheeks / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.cheekL, 0.15, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.cheekR, 0.15, s, width, height);
            }
            if (params.lift > 0) {
                const s = 0.2 * (params.lift / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.browL, 0.2, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.browR, 0.2, s, width, height);
            }
        } else if (mode === 'body') {
            if (params.breast > 0) {
                const s = 0.5 * (params.breast / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.breastL, 0.20, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.breastR, 0.20, s, width, height);
            }
            if (params.blift > 0) {
                const s = 0.2 * (params.blift / 100);
                let liftL = { ...landmarks.breastL, y: landmarks.breastL.y - 0.05 };
                let liftR = { ...landmarks.breastR, y: landmarks.breastR.y - 0.05 };
                warpPixels(outputData, baseImageDataRef.current, liftL, 0.20, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, liftR, 0.20, s, width, height);
            }
            if (params.waist > 0) {
                const s = -0.35 * (params.waist / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.waistL, 0.20, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.waistR, 0.20, s, width, height);
            }
            if (params.hips > 0) {
                const s = 0.4 * (params.hips / 100);
                warpPixels(outputData, baseImageDataRef.current, landmarks.hipL, 0.20, s, width, height);
                warpPixels(outputData, baseImageDataRef.current, landmarks.hipR, 0.20, s, width, height);
            }
        }

        canvasMod.getContext('2d')?.putImageData(outputData, 0, 0);
    }, [image, params, landmarks, mode, warpPixels]);

    useEffect(() => {
        if (!image || !canvasOrigRef.current || !canvasModRef.current) return;

        const canvasOrig = canvasOrigRef.current;
        const canvasMod = canvasModRef.current;
        const ctxOrig = canvasOrig.getContext('2d');
        const ctxMod = canvasMod.getContext('2d');

        if (!ctxOrig || !ctxMod) return;

        // Reset canvas size based on parent container
        const parent = canvasOrig.parentElement;
        if (parent) {
            canvasOrig.width = parent.clientWidth;
            canvasOrig.height = parent.clientHeight;
            canvasMod.width = parent.clientWidth;
            canvasMod.height = parent.clientHeight;
        }

        const width = canvasOrig.width;
        const height = canvasOrig.height;

        // Scale & Center Image
        const ratio = Math.max(width / image.width, height / image.height);
        const centerShift_x = (width - image.width * ratio) / 2;
        const centerShift_y = (height - image.height * ratio) / 2;

        ctxOrig.fillStyle = "#000";
        ctxOrig.fillRect(0, 0, width, height);
        ctxOrig.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);

        baseImageDataRef.current = ctxOrig.getImageData(0, 0, width, height);
        redraw();
    }, [image, redraw]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasOrigRef} className="canvas-sim" />
            <canvas
                ref={canvasModRef}
                className="canvas-sim"
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            />
        </div>
    );
};

export default AestheticSimulatorCanvas;
