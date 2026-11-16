import React, { useState, useEffect, useRef } from 'react';
import './Window.css';

interface WindowProps {
    title: string;
    x: number;
    y: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
    onFocus: () => void;
    onMinimize: () => void;
    onClose: () => void;
    onDrag: (newX: number, newY: number) => void;
}

const Window: React.FC<WindowProps> = ({
    title,
    x,
    y,
    style,
    children,
    onFocus,
    onMinimize,
    onClose,
    onDrag,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;

        onFocus();
        setIsDragging(true);
        dragStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            windowX: x,
            windowY: y,
        };
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragStartRef.current.mouseX;
            const deltaY = e.clientY - dragStartRef.current.mouseY;

            const newX = dragStartRef.current.windowX + deltaX;
            const newY = Math.max(0, dragStartRef.current.windowY + deltaY);

            onDrag(newX, newY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, onDrag]);

    return (
        <div 
            className="window" 
            style={style} 
            onMouseDown={onFocus}
        >
            <div 
                className="window-header" 
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
            >
                <span className="window-title">{title}</span>
                <div className="window-controls">
                    <button onClick={onMinimize}></button>
                    <button onClick={onClose}></button>
                </div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
};

export default Window;
