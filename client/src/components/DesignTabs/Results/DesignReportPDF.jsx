import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const stylesPDF = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#008080",
  },
  subSectionHeader: {
    fontSize: 10,
    fontWeight: "bold",
    width: "70%",
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
    width: "30%",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: { fontSize: 10, width: "70%" },
  value: { fontSize: 10, width: "30%", textAlign: "right" },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 10,
  },
  date: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 10,
  },
});

// Helper function to properly display special characters
const formatSymbol = (symbol) => {
  switch (symbol) {
    case "γ":
      return "γ";
    case "ρ":
      return "ρ";
    case "σ":
      return "σ";
    default:
      return symbol;
  }
};

const formatValue = (value, unit, decimals = 2) => {
  if (value === undefined || value === null) return "N/A";
  const numValue = typeof value === "number" ? value : parseFloat(value);

  if (unit === "" && Math.abs(numValue) < 0.0001) {
    return numValue.toFixed(4);
  }

  if (Number.isInteger(numValue)) {
    return `${numValue} ${unit}`;
  }

  return `${numValue.toFixed(decimals)} ${unit}`;
};

const ParameterTable = ({
  title,
  subheader,
  items,
  data,
  showResultsHeader = true,
}) => {
  return (
    <View style={stylesPDF.section}>
      {title && <Text style={stylesPDF.sectionTitle}>{title}</Text>}

      {/* Table header row */}
      <View style={stylesPDF.row}>
        {subheader ? (
          <Text style={stylesPDF.subSectionHeader}>{subheader}</Text>
        ) : showResultsHeader ? (
          <Text style={stylesPDF.subSectionHeader}></Text>
        ) : null}
        {showResultsHeader && (
          <Text style={stylesPDF.tableHeaderText}>
            {title === "Input Parameters"
              ? "Inputs"
              : title === "Project Information"
              ? "Type"
              : "Results"}
          </Text>
        )}
      </View>

      {items.map((item) => (
        <View key={item.id} style={stylesPDF.row}>
          <Text style={stylesPDF.label}>
            {item.label
              .replace(/γ/g, "γ")
              .replace(/ρ/g, "ρ")
              .replace(/σ/g, "σ")}
          </Text>
          <Text style={stylesPDF.value}>
            {formatValue(data[item.id], item.unit, item.decimals)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const ReportPDF = ({ data, results }) => {
  // Combine inputs and results for display
  const allData = { ...data.inputs, ...results };

  // Input Parameters items - matches the order from InputParameters.jsx with proper symbols
  const inputParametersItems = [
    // Loads
    { id: "DL", label: "Permanent Load (Gₖ)", unit: "kN" },
    { id: "LL", label: "Variable Load (Qₖ)", unit: "kN" },
    { id: "mxp", label: "Moment X Permanent (Mₓ,Gₖ)", unit: "kNm" },
    { id: "mxv", label: "Moment X Variable (Mₓ,Qₖ)", unit: "kNm" },
    { id: "myp", label: "Moment Y Permanent (Mᵧ,Gₖ)", unit: "kNm" },
    { id: "myv", label: "Moment Y Variable (Mᵧ,Qₖ)", unit: "kNm" },

    // Geometry
    { id: "colx", label: "Column Width X (b)", unit: "mm" },
    { id: "coly", label: "Column Width Y (h)", unit: "mm" },

    // Soil Properties
    { id: "Df", label: "Foundation Depth (Df)", unit: "mm" },
    { id: "CU", label: "Undrained Cohesion (Cu)", unit: "kPa" },
    { id: "gamma", label: "Soil Unit Weight (γ)", unit: "kN/m³" },

    // Material Properties
    { id: "fck", label: "Concrete Strength (fck)", unit: "MPa" },
    { id: "fyk", label: "Steel Strength (fyk)", unit: "MPa" },
    { id: "bar", label: "Rebar Diameter (Ø)", unit: "mm" },
    { id: "covr", label: "Concrete Cover (c)", unit: "mm" },
  ];

  // Geotechnical Design items
  const proportioningItems = [
    { id: "D_final", label: "Footing thickness (D)", unit: "mm" },
    { id: "gamma_conc", label: "Concrete Unit Weight (γconc)", unit: "kN/m³" },
    { id: "SW_conc", label: "Self weight of footing (SWconc)", unit: "kN" },
    { id: "SW_fill", label: "Self weight of fill (SWfill)", unit: "kN" },
    { id: "DL", label: "Permanent Load (Gₖ)", unit: "kN" },
    { id: "LL", label: "Variable Load (Qₖ)", unit: "kN" },
    {
      id: "p_p",
      label: "Service Load (P = [Gₖ + SWconc + SWfill] + Qₖ)",
      unit: "kN",
    },
    { id: "b", label: "Footing Width (B)", unit: "mm" },
    { id: "l", label: "Footing Length (L)", unit: "mm" },
    { id: "area", label: "Footing Area (A)", unit: "m²" },
    { id: "mxp", label: "Moment X (Mₓ = Mₓ,Gₖ + Mₓ,Qₖ)", unit: "kNm" },
    { id: "myp", label: "Moment Y (Mᵧ = Mᵧ,Gₖ + Mᵧ,Qₖ)", unit: "kNm" },
    { id: "ex", label: "Eccentricity X (eₓ)", unit: "mm", decimals: 4 },
    { id: "ey", label: "Eccentricity Y (eᵧ)", unit: "mm", decimals: 4 },
    { id: "qu", label: "Ultimate Bearing Capacity (qu)", unit: "kPa" },
    { id: "fs", label: "Factor of Safety (FS)", unit: "" },
    { id: "sig_p", label: "Maximum Stress (σmax)", unit: "kPa" },
    { id: "qa", label: "Allowable Bearing Capacity (qall)", unit: "kPa" },
  ];

  // Structural Design items
  const structuralDesignItems = [
    { id: "p_s", label: "Design Load (P = 1.35Gₖ + 1.5Qₖ)", unit: "kN" },
    { id: "sig_s", label: "Design Stress (σ)", unit: "kPa" },
    { id: "fck", label: "Concrete Strength (fck)", unit: "MPa" },
    { id: "fyk", label: "Steel Strength (fyk)", unit: "MPa" },
  ];

  // Shear Failure - Punching items
  const shearFailurePunchingItems = [
    { id: "d_punch", label: "Effective Depth (d)", unit: "mm" },
    { id: "k_punch", label: "Size Factor (k)", unit: "" },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    {
      id: "As_punch",
      label: "Critical-Section Surface Area (Acs)",
      unit: "m²",
    },
    {
      id: "Ap2_punch",
      label: "Critical-Section Cross-Sectional Area (Acc)",
      unit: "m²",
    },
    {
      id: "vrd_min_punch",
      label: "Minimum Shear Resistance (vRd,min)",
      unit: "kPa",
    },
    { id: "ved_punch", label: "Design Shear Stress (vEd)", unit: "kPa" },
    { id: "vrd_punch", label: "Shear Resistance (vRd)", unit: "kPa" },
    { id: "D_punch", label: "Required Depth (D)", unit: "mm" },
  ];

  // Shear Failure - Wide Beam items
  const shearFailureWideBeamItems = [
    { id: "d_wide", label: "Effective Depth (d)", unit: "mm" },
    { id: "k_wide", label: "Size Factor (k)", unit: "" },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    { id: "As_wide", label: "Critical-Section Surface Area (Acs)", unit: "m²" },
    {
      id: "Ap2_wide",
      label: "Critical-Section Cross-Sectional Area (Acc)",
      unit: "m²",
    },
    {
      id: "vrd_min_wide",
      label: "Minimum Shear Resistance (vRd,min)",
      unit: "kPa",
    },
    { id: "ved_wide", label: "Design Shear Stress (vEd)", unit: "kPa" },
    { id: "vrd_wide", label: "Shear Resistance (vRd)", unit: "kPa" },
    { id: "D_wide", label: "Required Depth (D)", unit: "mm" },
  ];

  // Bending Moment Failure items
  const bendingMomentItems = [
    { id: "d_final", label: "Effective Depth (d)", unit: "mm" },
    { id: "B_final", label: "Footing Width (B)", unit: "mm" },
    { id: "z", label: "Lever Arm (z)", unit: "mm" },
    {
      id: "rho_min",
      label: "Minimum Reinforcement Ratio (ρmin)",
      unit: "",
      decimals: 4,
    },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    { id: "Asmin", label: "Minimum Reinforcement Area (As,min)", unit: "mm²" },
    { id: "med", label: "Design Moment (MEd)", unit: "kNm" },
    { id: "mrd", label: "Moment Resistance (MRd)", unit: "kNm" },
    { id: "As_old", label: "Required Reinforcement Area (As)", unit: "mm²" },
  ];

  // Final Rounded Values items
  const finalValuesItems = [
    { id: "b", label: "Footing Width (B)", unit: "mm" },
    { id: "l", label: "Footing Length (L)", unit: "mm" },
    { id: "d", label: "Footing Thickness (D)", unit: "mm" },
    { id: "Nxb", label: "Number of bars, x-direction, bottom (Nxb)", unit: "" },
    { id: "Nyb", label: "Number of bars, y-direction, bottom (Nyb)", unit: "" },
    {
      id: "Sxb",
      label: "Spacing between bars, x-direction, bottom (Sxb)",
      unit: "mm",
    },
    {
      id: "Syb",
      label: "Spacing between bars, y-direction, bottom (Syb)",
      unit: "mm",
    },
  ];

  // Get display names for types
  const getFoundationTypeName = (type) => {
    const types = {
      isolated: "Isolated Footing",
      combined: "Combined Footing",
      strap: "Strap Footing",
      retaining: "Retaining Wall",
    };
    return types[type] || type;
  };

  const getSoilTypeName = (type) => {
    const types = {
      CU: "Clay (Undrained)",
      CD: "Clay (Drained)",
      S: "Sand",
      CUST: "Custom Bearing Capacity",
    };
    return types[type] || type;
  };

  const getLoadTypeName = (type) => {
    const types = {
      unfactored: "Unfactored Loads",
      factored: "Factored Loads",
    };
    return types[type] || type;
  };

  return (
    <Document>
      <Page style={stylesPDF.page}>
        <View style={stylesPDF.section}>
          <Text style={stylesPDF.header}>Foundation Design Report</Text>
          <Text style={stylesPDF.date}>
            Generated on {new Date().toLocaleDateString()}
          </Text>

          <View style={stylesPDF.divider} />

          {/* Project Information */}
          <ParameterTable
            title="Project Information"
            items={[
              { id: "foundationType", label: "Foundation Type", unit: "" },
              { id: "soilType", label: "Soil Type", unit: "" },
              { id: "loadType", label: "Load Type", unit: "" },
            ]}
            data={{
              foundationType: getFoundationTypeName(data.foundationType),
              soilType: getSoilTypeName(data.soilType),
              loadType: getLoadTypeName(data.loadType),
            }}
          />

          <View style={stylesPDF.divider} />

          {/* Input Parameters */}
          <ParameterTable
            title="Input Parameters"
            items={inputParametersItems}
            data={allData}
          />

          <View style={stylesPDF.divider} />

          {/* Geotechnical Design */}
          <ParameterTable
            title="Geotechnical Design"
            items={proportioningItems}
            data={allData}
          />

          <View style={stylesPDF.divider} />

          {/* Structural Design */}
          <View style={stylesPDF.section}>
            <Text style={stylesPDF.sectionTitle}>Structural Design</Text>

            {/* First part without subheader */}
            <ParameterTable items={structuralDesignItems} data={allData} />

            {/* Shear Failure - Punching */}
            <ParameterTable
              items={shearFailurePunchingItems}
              data={results}
              subheader="Shear Failure - Punching"
              showResultsHeader={true}
            />

            {/* Shear Failure - Wide Beam */}
            <ParameterTable
              items={shearFailureWideBeamItems}
              data={results}
              subheader="Shear Failure - Vertical/Wide Beam"
              showResultsHeader={true}
            />

            {/* Bending Moment Failure */}
            <ParameterTable
              items={bendingMomentItems}
              data={results}
              subheader="Bending Moment Failure"
              showResultsHeader={true}
            />
          </View>

          <View style={stylesPDF.divider} />

          {/* Final Rounded Values */}
          <ParameterTable
            title="Final Rounded Values"
            items={finalValuesItems}
            data={results}
          />
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
