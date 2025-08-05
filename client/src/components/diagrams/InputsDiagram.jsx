import DiagramHeader from "./DiagramHeader";

const InputsDiagram = () => {
  return (
    <div className="w-full h-full bg-white border border-gray-200 shadow-sm">
      <DiagramHeader title="Input Reference Diagram" subtitle="" />
      <div className="p-4" style={{ height: "calc(100% - 80px)" }}>
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* --- 3D View --- */}
          <polygon
            points="100,50 300,50 320,70 120,70"
            fill="#f5f5f5"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="300,50 300,150 320,170 320,70"
            fill="#e0e0e0"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="100,50 100,150 120,170 120,70"
            fill="#ccc"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="120,70 320,70 320,170 120,170"
            fill="#bdbdbd"
            stroke="#333"
            strokeWidth="1.5"
          />

          {/* Column */}
          <polygon
            points="180,80 220,80 230,90 190,90"
            fill="#aaa"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="220,80 220,130 230,140 230,90"
            fill="#999"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="180,80 180,130 190,140 190,90"
            fill="#888"
            stroke="#333"
            strokeWidth="1.5"
          />
          <polygon
            points="190,90 230,90 230,140 190,140"
            fill="#777"
            stroke="#333"
            strokeWidth="1.5"
          />

          <text x="220" y="190" textAnchor="middle" fontSize="12" fill="#333">
            3D View
          </text>

          {/* --- Plan View --- */}
          <rect
            x="60"
            y="220"
            width="120"
            height="80"
            fill="#f5f5f5"
            stroke="#333"
            strokeWidth="1.5"
          />
          <rect
            x="100"
            y="245"
            width="40"
            height="30"
            fill="#ddd"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text x="120" y="315" textAnchor="middle" fontSize="12" fill="#333">
            Plan View
          </text>

          {/* Dimension line B */}
          <line
            x1="60"
            y1="310"
            x2="180"
            y2="310"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="305"
            x2="60"
            y2="315"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="180"
            y1="305"
            x2="180"
            y2="315"
            stroke="#666"
            strokeWidth="1"
          />
          <text x="120" y="325" textAnchor="middle" fontSize="10" fill="#333">
            B
          </text>

          {/* Dimension line L */}
          <line
            x1="190"
            y1="220"
            x2="190"
            y2="300"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="185"
            y1="220"
            x2="195"
            y2="220"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="185"
            y1="300"
            x2="195"
            y2="300"
            stroke="#666"
            strokeWidth="1"
          />
          <text x="200" y="265" textAnchor="start" fontSize="10" fill="#333">
            L
          </text>

          {/* --- Section View --- */}
          <rect
            x="280"
            y="220"
            width="120"
            height="80"
            fill="#f5f5f5"
            stroke="#333"
            strokeWidth="1.5"
          />
          <rect
            x="310"
            y="200"
            width="60"
            height="40"
            fill="#ddd"
            stroke="#333"
            strokeWidth="1.5"
          />
          <text x="340" y="315" textAnchor="middle" fontSize="12" fill="#333">
            Section View
          </text>

          {/* Dimension line D */}
          <line
            x1="410"
            y1="200"
            x2="410"
            y2="300"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="405"
            y1="200"
            x2="415"
            y2="200"
            stroke="#666"
            strokeWidth="1"
          />
          <line
            x1="405"
            y1="300"
            x2="415"
            y2="300"
            stroke="#666"
            strokeWidth="1"
          />
          <text x="420" y="250" textAnchor="start" fontSize="10" fill="#333">
            D
          </text>
        </svg>
      </div>
    </div>
  );
};

export default InputsDiagram;
