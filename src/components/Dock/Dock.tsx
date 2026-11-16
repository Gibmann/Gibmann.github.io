import Widget from "../Widget/Widget";
import "./Dock.css";

export interface AppConfig {
    id: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface WindowState {
    appId: string;
    isMinimized: boolean;
}

interface DockProps {
    apps: AppConfig[];
    openWindows: WindowState[];
    onAppClick: (appId: string, appTitle: string) => void;
}

const Dock = ({ apps, openWindows, onAppClick }: DockProps) => {
    return (
        <div className="dock">
            <div className="dock-apps">
                {apps.map((app) => {
                    const isOpen = openWindows.some(
                        (w) => w.appId === app.id && !w.isMinimized,
                    );
                    return (
                        <Widget
                            key={app.id}
                            icon={app.icon}
                            label={app.label}
                            isActive={isOpen}
                            onClick={() => onAppClick(app.id, app.label)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Dock;
