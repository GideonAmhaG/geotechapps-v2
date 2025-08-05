import { useEffect, useRef, useState, useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DiagramHeader from "./DiagramHeader";
import DrawingPDF from "./DrawingPDF";

const DIAGRAM_ASPECT_RATIO = 3 / 4;
const MAX_DIAGRAM_WIDTH = 1200;
const MAX_DIAGRAM_HEIGHT = MAX_DIAGRAM_WIDTH / DIAGRAM_ASPECT_RATIO;

const ResultsDiagram = ({ results }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const captureCanvasImage = useCallback(() => {
    if (canvasRef.current) {
      try {
        setImageData(canvasRef.current.toDataURL("image/png"));
      } catch (error) {
        console.error("Error capturing canvas image:", error);
      }
    }
  }, []);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const containerWidth = containerRef.current.clientWidth;
    let width = Math.min(containerWidth, MAX_DIAGRAM_WIDTH);
    let height = width / DIAGRAM_ASPECT_RATIO;

    if (height > MAX_DIAGRAM_HEIGHT) {
      height = MAX_DIAGRAM_HEIGHT;
      width = height * DIAGRAM_ASPECT_RATIO;
    }

    canvas.width = width;
    canvas.height = height;
  }, []);

  const drawArrowhead = useCallback((ctx, startX, startY, endX, endY, size) => {
    const angle = Math.atan2(endY - startY, endX - startX);
    const headLength = size * 4;
    const headWidth = size * 4;
    const arrowX1 = endX - headLength * Math.cos(angle + Math.PI / 3);
    const arrowY1 = endY - headLength * Math.sin(angle + Math.PI / 3);
    const arrowX2 = endX - headLength * Math.cos(angle - Math.PI / 3);
    const arrowY2 = endY - headLength * Math.sin(angle - Math.PI / 3);
    const offsetX1 = headWidth * Math.cos(angle + Math.PI / 2);
    const offsetY1 = headWidth * Math.sin(angle + Math.PI / 2);
    const offsetX2 = headWidth * Math.cos(angle - Math.PI / 2);
    const offsetY2 = headWidth * Math.sin(angle - Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(arrowX1 + offsetX1, arrowY1 + offsetY1);
    ctx.lineTo(arrowX2 + offsetX2, arrowY2 + offsetY2);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }, []);

  const drawDimensionLine = useCallback(
    (ctx, lineData, arrowHeadSize) => {
      const { startX, startY, endX, endY } = lineData;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "black";
      ctx.stroke();
      drawArrowhead(ctx, startX, startY, endX, endY, arrowHeadSize);
      drawArrowhead(ctx, endX, endY, startX, startY, arrowHeadSize);
    },
    [drawArrowhead]
  );

  const drawText = useCallback(
    (ctx, text, x, y, fontScale, rotation = 0, fontFamily = "Arial") => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.font = `${fontScale}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(text.toString(), 0, 0);
      ctx.restore();
    },
    []
  );

  const drawDiagram = useCallback(() => {
    if (!results) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const { b, d, N, s, bar, colx, coly, covr } = results;
    const bMeters = b / 1000;
    const dMeters = d / 1000;
    const colXMeters = colx / 1000;
    const colYMeters = coly / 1000;
    const cov = parseInt(covr);
    const topCov = 75;
    const cur = Math.ceil((dMeters - (cov + topCov) * 0.001) * 100) / 100;
    const barXLen = bMeters - 2 * topCov * 0.001;

    const scaleFactors = [100, 93, 86, 79, 72, 65, 58, 51];
    const breakpoints = [2, 2.5, 3, 3.5, 4, 4.5, 5];
    let mul = 51;
    for (let i = 0; i < breakpoints.length; i++) {
      if (bMeters < breakpoints[i]) {
        mul = scaleFactors[i];
        break;
      }
    }

    const x = mul * bMeters;
    const y1 = mul * bMeters;
    const y2 = mul * dMeters;
    const xCol = mul * colXMeters;
    const yCol = mul * colYMeters;
    const curScaled = mul * cur;
    const horzSpace = 30 + x * 0.4;
    const vertSpace = 50 + y1 * 0.7;
    const colHeight = y1 * 0.23;
    const totalWidth = x + horzSpace;
    const totalHeight = y1 + vertSpace + colHeight + y2;

    const yCorDivs = [6, 5.3, 4.6, 3.9, 3.2, 2.5];
    const yCorDiv =
      bMeters < 2
        ? yCorDivs[0]
        : bMeters < 3
        ? yCorDivs[1]
        : bMeters < 4
        ? yCorDivs[2]
        : bMeters < 5
        ? yCorDivs[3]
        : bMeters < 6
        ? yCorDivs[4]
        : yCorDivs[5];

    const xCor = (canvas.width - totalWidth) / 2;
    const yCor = (canvas.height - totalHeight) / yCorDiv;

    const dotRadius = mul * 0.03;
    const offSet7 = 4;
    const barOff = 4;
    const colBarOff = 4;
    const cOBot = 1.5;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.3;

    const drawMainShapes = () => {
      ctx.beginPath();
      ctx.rect(xCor, yCor, x, y1);
      ctx.fillStyle = "#999999";
      ctx.fillRect(
        xCor + x * 0.5 - xCol * 0.5,
        yCor + y1 * 0.5 - yCol * 0.5,
        xCol,
        yCol
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xCor + x * 0.5 - xCol * 0.5, yCor + y1 + vertSpace);
      ctx.lineTo(
        xCor + x * 0.5 - xCol * 0.5,
        yCor + y1 + vertSpace + colHeight
      );
      ctx.lineTo(xCor, yCor + y1 + vertSpace + colHeight);
      ctx.lineTo(xCor, yCor + y1 + vertSpace + colHeight + y2);
      ctx.lineTo(xCor + x, yCor + y1 + vertSpace + colHeight + y2);
      ctx.lineTo(xCor + x, yCor + y1 + vertSpace + colHeight);
      ctx.lineTo(
        xCor + x * 0.5 + xCol * 0.5,
        yCor + y1 + vertSpace + colHeight
      );
      ctx.lineTo(xCor + x * 0.5 + xCol * 0.5, yCor + y1 + vertSpace);
      ctx.stroke();
    };

    const drawColumnBars = () => {
      ctx.beginPath();
      ctx.moveTo(
        xCor + x * 0.5 - xCol * 0.5 + colBarOff,
        yCor + y1 + vertSpace
      );
      ctx.lineTo(
        xCor + x * 0.5 - xCol * 0.5 + colBarOff,
        yCor +
          y1 +
          vertSpace +
          colHeight +
          y2 -
          barOff -
          offSet7 -
          dotRadius -
          cOBot
      );
      ctx.lineTo(
        xCor + x * 0.5 - xCol * 0.5 + colBarOff - curScaled,
        yCor +
          y1 +
          vertSpace +
          colHeight +
          y2 -
          barOff -
          offSet7 -
          dotRadius -
          cOBot
      );
      ctx.moveTo(
        xCor + x * 0.5 + xCol * 0.5 - colBarOff,
        yCor + y1 + vertSpace
      );
      ctx.lineTo(
        xCor + x * 0.5 + xCol * 0.5 - colBarOff,
        yCor +
          y1 +
          vertSpace +
          colHeight +
          y2 -
          barOff -
          offSet7 -
          dotRadius -
          cOBot
      );
      ctx.lineTo(
        xCor + x * 0.5 + xCol * 0.5 - colBarOff + curScaled,
        yCor +
          y1 +
          vertSpace +
          colHeight +
          y2 -
          barOff -
          offSet7 -
          dotRadius -
          cOBot
      );
      ctx.stroke();

      const numLns = Math.floor(bMeters) + 2;
      const lineLen = xCol - 2 * colBarOff;
      const vertSpacBars = 15;
      const xBSrt = xCor + x * 0.5 - xCol * 0.5 + colBarOff;
      const yBSrt = yCor + y1 + vertSpace + 5;

      ctx.beginPath();
      for (let i = 0; i < numLns; i++) {
        const yPosition = yBSrt + i * vertSpacBars;
        ctx.moveTo(xBSrt, yPosition);
        ctx.lineTo(xBSrt + lineLen, yPosition);
      }
      ctx.stroke();
    };

    const drawRebars = () => {
      const xScale = 0.75;
      const y1Scale = 0.75;
      const vsScaleBar = 0.6;
      const offset1 = 5;

      ctx.beginPath();
      ctx.moveTo(xCor + x * xScale - curScaled, yCor + offset1);
      ctx.lineTo(xCor + x * xScale, yCor + offset1);
      ctx.lineTo(xCor + x * xScale, yCor + y1 - offset1);
      ctx.lineTo(xCor + x * xScale - curScaled, yCor + y1 - offset1);
      ctx.moveTo(xCor + x + horzSpace - curScaled, yCor + offset1);
      ctx.lineTo(xCor + x + horzSpace, yCor + offset1);
      ctx.lineTo(xCor + x + horzSpace, yCor + y1 - offset1);
      ctx.lineTo(xCor + x + horzSpace - curScaled, yCor + y1 - offset1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xCor + offset1, yCor + y1 * y1Scale - curScaled);
      ctx.lineTo(xCor + offset1, yCor + y1 * y1Scale);
      ctx.lineTo(xCor + x - offset1, yCor + y1 * y1Scale);
      ctx.lineTo(xCor + x - offset1, yCor + y1 * y1Scale - curScaled);
      ctx.moveTo(
        xCor + offset1,
        yCor + y1 + vertSpace * vsScaleBar - curScaled
      );
      ctx.lineTo(xCor + offset1, yCor + y1 + vertSpace * vsScaleBar);
      ctx.lineTo(xCor + x - offset1, yCor + y1 + vertSpace * vsScaleBar);
      ctx.lineTo(
        xCor + x - offset1,
        yCor + y1 + vertSpace * vsScaleBar - curScaled
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(
        xCor + offset1,
        yCor + y1 + vertSpace + colHeight + y2 - barOff - curScaled
      );
      ctx.lineTo(
        xCor + offset1,
        yCor + y1 + vertSpace + colHeight + y2 - barOff
      );
      ctx.lineTo(
        xCor + x - offset1,
        yCor + y1 + vertSpace + colHeight + y2 - barOff
      );
      ctx.lineTo(
        xCor + x - offset1,
        yCor + y1 + vertSpace + colHeight + y2 - barOff - curScaled
      );
      ctx.stroke();
    };

    const drawCenterLines = () => {
      const cenLineOff = 15;
      ctx.beginPath();
      ctx.moveTo(xCor + x * 0.5, yCor - cenLineOff);
      ctx.lineTo(xCor + x * 0.5, yCor + y1 + cenLineOff);
      ctx.moveTo(xCor - cenLineOff, yCor + y1 * 0.5);
      ctx.lineTo(xCor + x + cenLineOff, yCor + y1 * 0.5);
      ctx.moveTo(
        xCor + x * 0.5 - xCol * 0.5 + colBarOff - 20,
        yCor + y1 + vertSpace
      );
      ctx.lineTo(
        xCor + x * 0.5 + xCol * 0.5 - colBarOff + 20,
        yCor + y1 + vertSpace
      );
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawReinforcementDots = () => {
      const offset1 = 5;
      const offset5 = 4;
      const xCStart = xCor + offset1 + 4;
      const xCEnd = xCor + x - offset1 - 4;
      const width = xCEnd - xCStart - dotRadius * 2 + offset5;
      const yC = yCor + y1 + vertSpace + colHeight + y2 - barOff - offSet7;
      const spacing = width / (N - 1);

      for (let i = 0; i < N; i++) {
        let xPos = xCStart + spacing * i;
        if (i === N - 1) xPos = xCEnd;
        ctx.beginPath();
        ctx.arc(xPos, yC, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    };

    const drawDimensionLines = () => {
      const arrOff1 = 35;
      const arrOff2 = 8;
      const arrOff3 = 15 * x * 0.009;

      const dimensionLines = [
        {
          startX: xCor + x + arrOff1,
          startY: yCor,
          endX: xCor + x + arrOff1,
          endY: yCor + y1,
        },
        {
          startX: xCor,
          startY: yCor + y1 + arrOff1,
          endX: x + xCor,
          endY: yCor + y1 + arrOff1,
        },
        {
          startX: xCor + x + arrOff2,
          startY: yCor + y1 + vertSpace + colHeight + y2,
          endX: xCor + x + arrOff2,
          endY: yCor + y1 + vertSpace + colHeight,
        },
        {
          startX: xCor + x + arrOff2,
          startY: yCor,
          endX: xCor + x + arrOff2,
          endY: yCor + y1 * 0.5,
        },
        {
          startX: xCor + x + arrOff2,
          startY: yCor + y1 * 0.5,
          endX: xCor + x + arrOff2,
          endY: yCor + y1,
        },
        {
          startX: xCor,
          startY: yCor + y1 + arrOff2,
          endX: xCor + x * 0.5,
          endY: yCor + y1 + arrOff2,
        },
        {
          startX: xCor + x * 0.5,
          startY: yCor + y1 + arrOff2,
          endX: xCor + x,
          endY: yCor + y1 + arrOff2,
        },
        {
          startX: xCor,
          startY: yCor + y1 + vertSpace + arrOff3,
          endX: xCor + x * 0.5 - xCol * 0.5,
          endY: yCor + y1 + vertSpace + arrOff3,
        },
        {
          startX: xCor + x * 0.5 - xCol * 0.5,
          startY: yCor + y1 + vertSpace - arrOff2,
          endX: xCor + x * 0.5 + xCol * 0.5,
          endY: yCor + y1 + vertSpace - arrOff2,
        },
        {
          startX: xCor + x * 0.5 + xCol * 0.5,
          startY: yCor + y1 + vertSpace + arrOff3,
          endX: xCor + x,
          endY: yCor + y1 + vertSpace + arrOff3,
        },
      ];

      dimensionLines.forEach((line) => drawDimensionLine(ctx, line, 5.5));
    };

    const drawTextLabels = () => {
      const scaleFont = 1.4;
      let barFontScale = 1.4;
      const fontFamily = "Arial";
      const fontSize = 12;

      if (bMeters < 2.3) {
        barFontScale = Math.min(barFontScale, x * 0.01);
      }

      const txtOff1 = 20;
      const txtOff2 = 48;
      const txtOff3 = 8;
      const txtOff4 = 12;
      const txtOff5 = 20;
      const arrOff2 = 8;
      const arrOff3 = 15 * x * 0.009;
      const vsScaleBar = 0.6;

      const textLabels = [
        {
          text: d,
          x: xCor + x + txtOff1,
          y: yCor + y1 + vertSpace + colHeight + y2 * 0.5,
          scale: fontSize * scaleFont,
          rotation: 270,
        },
        {
          text: b,
          x: xCor + x + txtOff2,
          y: yCor + y1 * 0.5,
          scale: fontSize * scaleFont,
          rotation: 270,
        },
        {
          text: b * 0.5,
          x: xCor + x + txtOff1,
          y: yCor + y1 * 0.25,
          scale: fontSize * scaleFont,
          rotation: 270,
        },
        {
          text: b * 0.5,
          x: xCor + x + txtOff1,
          y: yCor + y1 * 0.75,
          scale: fontSize * scaleFont,
          rotation: 270,
        },
        {
          text: b,
          x: xCor + x * 0.5,
          y: yCor + y1 + txtOff2,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: b * 0.5,
          x: xCor + x * 0.25,
          y: yCor + y1 + txtOff1,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: b * 0.5,
          x: xCor + x * 0.75,
          y: yCor + y1 + txtOff1,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: Math.round((bMeters * 0.5 - colXMeters * 0.5) * 1000),
          x: xCor + x * 0.21,
          y: yCor + y1 + vertSpace + arrOff3 - txtOff3,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: Math.round((bMeters * 0.5 - colXMeters * 0.5) * 1000),
          x: xCor + x * 0.79,
          y: yCor + y1 + vertSpace + arrOff3 - txtOff3,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: Math.round(colXMeters * 1000),
          x: xCor + x * 0.5,
          y: yCor + y1 + vertSpace - arrOff2 - txtOff4,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: `${N}ϕ${bar}@${s}-${Math.round((2 * cur + barXLen) * 1000)}`,
          x: xCor + x * 0.5,
          y: yCor + y1 + vertSpace * vsScaleBar - txtOff4,
          scale: fontSize * barFontScale,
          rotation: 0,
        },
        {
          text: Math.round(barXLen * 1000),
          x: xCor + x * 0.5,
          y: yCor + y1 + vertSpace * vsScaleBar + txtOff4,
          scale: fontSize * barFontScale,
          rotation: 0,
        },
        {
          text: Math.round(cur * 1000),
          x: xCor - txtOff3,
          y: yCor + y1 + vertSpace * vsScaleBar - curScaled * 0.5,
          scale: fontSize * barFontScale,
          rotation: 270,
        },
        {
          text: Math.round(cur * 1000),
          x: xCor + x + txtOff3,
          y: yCor + y1 + vertSpace * vsScaleBar - curScaled * 0.5,
          scale: fontSize * barFontScale,
          rotation: 270,
        },
        {
          text: `${N}ϕ${bar}@${s}-${Math.round((2 * cur + barXLen) * 1000)}`,
          x: xCor + x + horzSpace - txtOff4,
          y: yCor + y1 * 0.5,
          scale: fontSize * barFontScale,
          rotation: 270,
        },
        {
          text: Math.round(barXLen * 1000),
          x: xCor + x + horzSpace + txtOff4,
          y: yCor + y1 * 0.5,
          scale: fontSize * barFontScale,
          rotation: 270,
        },
        {
          text: Math.round(cur * 1000),
          x: xCor + x + horzSpace - curScaled * 0.5,
          y: yCor - txtOff3,
          scale: fontSize * barFontScale,
          rotation: 0,
        },
        {
          text: Math.round(cur * 1000),
          x: xCor + x + horzSpace - curScaled * 0.5,
          y: yCor + y1 + txtOff3,
          scale: fontSize * barFontScale,
          rotation: 0,
        },
        {
          text: "A",
          x: xCor - txtOff5,
          y: yCor + y1 * 0.5,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: "A",
          x: xCor + x + txtOff5,
          y: yCor + y1 * 0.5,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
        {
          text: "Section A-A",
          x: xCor + x * 0.5,
          y: yCor + y1 + vertSpace + colHeight + y2 + txtOff1,
          scale: fontSize * scaleFont,
          rotation: 0,
        },
      ];

      textLabels.forEach((label) =>
        drawText(
          ctx,
          label.text,
          label.x,
          label.y,
          label.scale,
          label.rotation,
          fontFamily
        )
      );
    };

    drawMainShapes();
    drawColumnBars();
    drawRebars();
    drawCenterLines();
    drawReinforcementDots();
    drawDimensionLines();
    drawTextLabels();

    captureCanvasImage();
  }, [results, captureCanvasImage, drawDimensionLine, drawText]);

  useEffect(() => {
    initializeCanvas();
    drawDiagram();
  }, [initializeCanvas, drawDiagram]);

  return (
    <div className="p-4 w-full h-full overflow-auto" ref={containerRef}>
      <div className="bg-white border border-gray-200 shadow-sm">
        <DiagramHeader
          title="Engineering Drawing"
          subtitle="UNITS: MILLIMETERS (mm)"
        />
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{
            height: "auto",
            aspectRatio: DIAGRAM_ASPECT_RATIO,
            maxWidth: `${MAX_DIAGRAM_WIDTH}px`,
            maxHeight: `${MAX_DIAGRAM_HEIGHT}px`,
          }}
        />
        <div className="flex justify-end gap-4 p-4">
          {imageData && (
            <PDFDownloadLink
              document={<DrawingPDF imageData={imageData} />}
              fileName={`foundation_drawing_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")
                .replace("T", "_")
                .slice(0, 19)}.pdf`}
              className="px-4 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] flex items-center justify-center transition-colors text-[12px] sm:text-[14px] md:text-[16px]"
            >
              {({ loading }) => (
                <>
                  <FiDownload className="mr-2" />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>
          )}
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center transition-colors text-[12px] sm:text-[14px] md:text-[16px]">
            Save to Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDiagram;
