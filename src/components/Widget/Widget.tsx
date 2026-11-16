import "./Widget.css";

interface WidgetProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const Widget = ({ icon: Icon, isActive, onClick }: WidgetProps) => {
    return (
        <div
            className={`widget ${isActive ? "is-active" : ""}`}
            onClick={onClick}
        >
            <div className="widget-bg"></div>
            <Icon />
        </div>
    );
};

export default Widget;
