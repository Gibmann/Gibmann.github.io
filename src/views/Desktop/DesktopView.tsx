import { useState } from "react";
import TypingIcon from "../../assets/icons/typing.svg?react";
import type { AppConfig } from "../../components/Dock/Dock";
import Dock from "../../components/Dock/Dock";
import Window from "../../components/Window/Window";
import "./DesktopView.css";

const AVAILABLE_APPS: AppConfig[] = [
    { id: "app-1", label: "Window 1", icon: TypingIcon },
    { id: "app-2", label: "Window 2", icon: TypingIcon },
    { id: "app-3", label: "Window 3", icon: TypingIcon },
];

export interface WindowInstance {
    instanceId: string;
    appId: string;
    title: string;
    isMinimized: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
}

const DesktopView = () => {
    const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);

    const handleAppClick = (appId: string, appTitle: string) => {
        setOpenWindows((prev) => {
            const existingWindow = prev.find((w) => w.appId === appId);

            if (!existingWindow) {
                const defaultWidth = 740;
                const defaultHeight = 420;
                const step = 35;

                const visibleWindows = prev.filter((w) => !w.isMinimized);
                const lastWindow = visibleWindows[visibleWindows.length - 1];

                let startX = lastWindow ? lastWindow.x + step : 100;
                let startY = lastWindow ? lastWindow.y + step : 80;

                if (
                    startX + defaultWidth > window.innerWidth - 40 ||
                    startY + defaultHeight > window.innerHeight - 80
                ) {
                    startX = 80;
                    startY = 60;
                }

                const newInstance: WindowInstance = {
                    instanceId: crypto.randomUUID(),
                    appId: appId,
                    title: appTitle,
                    isMinimized: false,
                    x: startX,
                    y: startY,
                    width: defaultWidth,
                    height: defaultHeight,
                };
                return [...prev, newInstance];
            } else {
                if (existingWindow.isMinimized) {
                    const filtered = prev.filter(
                        (w) => w.instanceId !== existingWindow.instanceId,
                    );
                    return [
                        ...filtered,
                        { ...existingWindow, isMinimized: false },
                    ];
                } else {
                    const visibleWindows = prev.filter((w) => !w.isMinimized);
                    const topWindow = visibleWindows[visibleWindows.length - 1];
                    const isCurrentlyFocused =
                        topWindow &&
                        topWindow.instanceId === existingWindow.instanceId;

                    if (isCurrentlyFocused) {
                        return prev.map((w) =>
                            w.instanceId === existingWindow.instanceId
                                ? { ...w, isMinimized: true }
                                : w,
                        );
                    } else {
                        const filtered = prev.filter(
                            (w) => w.instanceId !== existingWindow.instanceId,
                        );
                        return [...filtered, existingWindow];
                    }
                }
            }
        });
    };

    const handleFocus = (instanceId: string) => {
        setOpenWindows((prev) => {
            const windowToMove = prev.find((w) => w.instanceId === instanceId);
            if (!windowToMove) return prev;

            const filtered = prev.filter((w) => w.instanceId !== instanceId);
            return [...filtered, windowToMove];
        });
    };

    const handleClose = (instanceId: string) => {
        setOpenWindows((prev) => {
            const remainingWindows = prev.filter(
                (w) => w.instanceId !== instanceId,
            );
            return remainingWindows;
        });
    };

    const handleMinimize = (instanceId: string) => {
        setOpenWindows((prev) =>
            prev.map((w) =>
                w.instanceId === instanceId ? { ...w, isMinimized: true } : w,
            ),
        );
    };

    const handleDrag = (instanceId: string, newX: number, newY: number) => {
        setOpenWindows((prev) =>
            prev.map((w) =>
                w.instanceId === instanceId
                    ? { ...w, x: newX, y: newY }
                    : w
            )
        );
    };

    return (
        <div className="desktop-view">
            <div className="desktop-workspace">
                {openWindows.map((win, index) => (
                    <Window
                        key={win.instanceId}
                        title={win.title}
                        x={win.x}
                        y={win.y}
                        style={{
                            display: win.isMinimized ? "none" : "flex",
                            zIndex: 10 + index,
                            position: "absolute",
                            left: `${win.x}px`,
                            top: `${win.y}px`,
                            width: `${win.width}px`,
                            height: `${win.height}px`,
                        }}
                        onFocus={() => handleFocus(win.instanceId)}
                        onMinimize={() => handleMinimize(win.instanceId)}
                        onClose={() => handleClose(win.instanceId)}
                        onDrag={(newX, newY) => handleDrag(win.instanceId, newX, newY)}
                    >
                        <p>Contenu de {win.title}</p>
                    </Window>
                ))}
            </div>

            <Dock
                apps={AVAILABLE_APPS}
                openWindows={openWindows}
                onAppClick={handleAppClick}
            />
        </div>
    );
};

export default DesktopView;