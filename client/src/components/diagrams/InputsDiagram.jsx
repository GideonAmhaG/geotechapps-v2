import DiagramHeader from "./DiagramHeader";
import IsolatedSvg from "../../assets/isolated.svg";

const InputsDiagram = () => {
  return (
    <div className="w-full h-full bg-white border border-gray-200 shadow-sm">
      <DiagramHeader
        title="Input Reference Diagram"
        subtitle="Downward forces and counterclockwise moments are taken as positive"
      />
      <div
        className="p-4 overflow-hidden"
        style={{ height: "calc(100% - 80px)" }}
      >
        <img
          src={IsolatedSvg}
          alt="Input Reference Diagram"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default InputsDiagram;
