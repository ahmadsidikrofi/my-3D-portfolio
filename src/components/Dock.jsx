'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, label, position }) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    const handleKeyDown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`relative inline-flex items-center justify-center rounded-full bg-[#120F17] border-neutral-700 border-2 shadow-md ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-label={label}
        >
            {Children.map(children, child => cloneElement(child, { isHovered, position }))}
        </motion.div>
    );
}

function DockLabel({ children, className = '', ...rest }) {
    const { isHovered, position } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    const isTop = position === 'top';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: isTop ? 10 : -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "absolute left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#120F17] px-2 py-0.5 text-xs text-white",
                        isTop ? "top-full mt-2" : "-top-6",
                        className
                    )}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = '' }) {
    return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 64,
    dockHeight = 256,
    baseItemSize = 50,
    position = 'bottom'
}) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    const isTop = position === 'top';

    return (
        <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={cn(
                    "absolute left-1/2 transform -translate-x-1/2 flex w-fit gap-4 rounded-2xl border-neutral-700 border-2 px-4 z-50",
                    isTop ? "top-5 items-start pt-2" : "bottom-2 items-end pb-2",
                    className
                )}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        label={item.label}
                        position={position}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
