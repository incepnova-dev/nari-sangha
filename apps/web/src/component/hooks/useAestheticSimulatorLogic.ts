import { useState, useMemo, useCallback } from 'react';

export interface Landmark {
    x: number;
    y: number;
    label: string;
}

export const FACE_LANDMARKS: Record<string, Landmark> = {
    nose: { x: 0.50, y: 0.55, label: "Nose Tip" },
    lips: { x: 0.50, y: 0.72, label: "Lips" },
    jawL: { x: 0.25, y: 0.70, label: "Jaw L" },
    jawR: { x: 0.75, y: 0.70, label: "Jaw R" },
    chin: { x: 0.50, y: 0.85, label: "Chin" },
    cheekL: { x: 0.30, y: 0.55, label: "Cheek L" },
    cheekR: { x: 0.70, y: 0.55, label: "Cheek R" },
    browL: { x: 0.30, y: 0.35, label: "Brow L" },
    browR: { x: 0.70, y: 0.35, label: "Brow R" }
};

export const BODY_LANDMARKS: Record<string, Landmark> = {
    breastL: { x: 0.35, y: 0.35, label: "Breast L" },
    breastR: { x: 0.65, y: 0.35, label: "Breast R" },
    waistL: { x: 0.30, y: 0.55, label: "Waist L" },
    waistR: { x: 0.70, y: 0.55, label: "Waist R" },
    hipL: { x: 0.25, y: 0.70, label: "Hip L" },
    hipR: { x: 0.75, y: 0.70, label: "Hip R" }
};

export const useAestheticSimulatorLogic = () => {
    const [mode, setMode] = useState<'face' | 'body'>('face');
    const [landmarks, setLandmarks] = useState<Record<string, Landmark>>(FACE_LANDMARKS);
    const [params, setParams] = useState<Record<string, number>>({
        nose: 0, lips: 0, jaw: 0, chin: 0, lift: 0, cheeks: 0, // Face
        breast: 0, blift: 0, waist: 0, hips: 0 // Body
    });
    const [sliderPos, setSliderPos] = useState(50);
    const [isUploaded, setIsUploaded] = useState(false);

    const metrics = useMemo(() => {
        let recovery = 0;
        let cost = 0;

        if (params.nose > 0) { recovery = Math.max(recovery, 10); cost += 8000; }
        if (params.lips > 0) { recovery = Math.max(recovery, 3); cost += 800; }
        if (params.jaw > 0) { recovery = Math.max(recovery, 7); cost += 3000; }
        if (params.chin > 0) { recovery = Math.max(recovery, 5); cost += 4000; }
        if (params.cheeks > 0) { recovery = Math.max(recovery, 5); cost += 2500; }
        if (params.lift > 0) { recovery = Math.max(recovery, 14); cost += 12000; }
        if (params.breast > 0) { recovery = Math.max(recovery, 7); cost += 7000; }
        if (params.blift > 0) { recovery = Math.max(recovery, 10); cost += 8500; }
        if (params.waist > 0) { recovery = Math.max(recovery, 14); cost += 9000; }
        if (params.hips > 0) { recovery = Math.max(recovery, 21); cost += 11000; }

        return { recovery, cost };
    }, [params]);

    const handleModeSwitch = useCallback((newMode: 'face' | 'body') => {
        setMode(newMode);
        setLandmarks(newMode === 'face' ? FACE_LANDMARKS : BODY_LANDMARKS);
    }, []);

    const updateParam = useCallback((key: string, val: number) => {
        setParams(prev => ({ ...prev, [key]: val }));
    }, []);

    const resetAll = useCallback(() => {
        setParams({
            nose: 0, lips: 0, jaw: 0, chin: 0, lift: 0, cheeks: 0,
            breast: 0, blift: 0, waist: 0, hips: 0
        });
    }, []);

    return {
        mode,
        landmarks,
        setLandmarks,
        params,
        updateParam,
        sliderPos,
        setSliderPos,
        isUploaded,
        setIsUploaded,
        metrics,
        handleModeSwitch,
        resetAll
    };
};
