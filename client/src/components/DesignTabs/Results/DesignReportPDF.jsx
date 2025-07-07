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
  sectionTitle: { fontSize: 14, marginBottom: 8, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: { fontSize: 10, width: "60%" },
  value: { fontSize: 10, width: "40%", textAlign: "right" },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  tableCell: {
    fontSize: 10,
    padding: 2,
    flex: 1,
  },
});

const formatValue = (value, unit) => {
  if (value === undefined || value === null) return "N/A";
  const numValue = typeof value === "number" ? value : parseFloat(value);
  return `${numValue.toFixed(2)} ${unit}`;
};

const InputParametersTable = ({ data }) => {
  const { inputs, foundationType, soilType, loadType } = data;

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
    <View style={stylesPDF.section}>
      <Text style={stylesPDF.sectionTitle}>1. Input Parameters</Text>

      <View style={stylesPDF.tableHeader}>
        <Text style={[stylesPDF.tableCell, { flex: 2 }]}>Parameter</Text>
        <Text style={stylesPDF.tableCell}>Value</Text>
      </View>

      <View style={stylesPDF.tableRow}>
        <Text style={[stylesPDF.tableCell, { flex: 2 }]}>Foundation Type</Text>
        <Text style={stylesPDF.tableCell}>
          {getFoundationTypeName(foundationType)}
        </Text>
      </View>

      <View style={stylesPDF.tableRow}>
        <Text style={[stylesPDF.tableCell, { flex: 2 }]}>Soil Type</Text>
        <Text style={stylesPDF.tableCell}>{getSoilTypeName(soilType)}</Text>
      </View>

      <View style={stylesPDF.tableRow}>
        <Text style={[stylesPDF.tableCell, { flex: 2 }]}>Load Type</Text>
        <Text style={stylesPDF.tableCell}>{getLoadTypeName(loadType)}</Text>
      </View>

      {Object.entries(inputs).map(([key, value]) => (
        <View key={key} style={stylesPDF.tableRow}>
          <Text style={[stylesPDF.tableCell, { flex: 2 }]}>{key}</Text>
          <Text style={stylesPDF.tableCell}>
            {typeof value === "number" ? value.toFixed(2) : value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const ResultsTable = ({ results, title, items }) => {
  return (
    <View style={stylesPDF.section}>
      <Text style={stylesPDF.sectionTitle}>{title}</Text>

      <View style={stylesPDF.tableHeader}>
        <Text style={[stylesPDF.tableCell, { flex: 2 }]}>Parameter</Text>
        <Text style={stylesPDF.tableCell}>Value</Text>
      </View>

      {items.map((item) => (
        <View key={item.id} style={stylesPDF.tableRow}>
          <Text style={[stylesPDF.tableCell, { flex: 2 }]}>{item.label}</Text>
          <Text style={stylesPDF.tableCell}>
            {formatValue(results[item.id], item.unit)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export const ReportPDF = ({ data, results }) => (
  <Document>
    <Page style={stylesPDF.page}>
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.header}>Foundation Design Report</Text>
        <Text style={{ textAlign: "center", marginBottom: 15 }}>
          Generated on {new Date().toLocaleDateString()}
        </Text>

        <InputParametersTable data={data} />
        <View style={stylesPDF.divider} />

        <ResultsTable
          results={results}
          title="2. Main Design Results"
          items={[
            { id: "b", label: "Width (B)", unit: "mm" },
            { id: "l", label: "Length (L)", unit: "mm" },
            { id: "d", label: "Thickness (D)", unit: "mm" },
            {
              id: "Nxb",
              label: "Number of bars, x-direction, bottom (Nxb)",
              unit: "",
            },
            {
              id: "Nyb",
              label: "Number of bars, y-direction, bottom (Nyb)",
              unit: "",
            },
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
          ]}
        />
        <View style={stylesPDF.divider} />

        <ResultsTable
          results={results}
          title="3. Additional Results"
          items={[
            { id: "As", label: "Reinforcement Area (As)", unit: "mm²" },
            { id: "qu", label: "Ultimate Bearing Capacity (qu)", unit: "kPa" },
            { id: "qa", label: "Allowable Bearing Capacity (qa)", unit: "kPa" },
            { id: "fs", label: "Factor of Safety (FS)", unit: "" },
            { id: "sig_p", label: "Maximum Stress (σmax)", unit: "kPa" },
            { id: "vrd", label: "Shear Resistance (vRd)", unit: "kPa" },
            { id: "mrd", label: "Moment Resistance (MRd)", unit: "kNm" },
            { id: "SW_conc", label: "Self weight of concrete", unit: "kN" },
            { id: "SW_fill", label: "Self weight of fill", unit: "kN" },
          ]}
        />
        <View style={stylesPDF.divider} />

        <ResultsTable
          results={results}
          title="4. Verification Checks"
          items={[
            { id: "ved_wide", label: "Wide Beam Shear (vEd)", unit: "kPa" },
            {
              id: "vrd_wide",
              label: "Wide Beam Resistance (vRd)",
              unit: "kPa",
            },
            { id: "ved_punch", label: "Punching Shear (vEd)", unit: "kPa" },
            {
              id: "vrd_punch",
              label: "Punching Resistance (vRd)",
              unit: "kPa",
            },
            { id: "med", label: "Design Moment (MEd)", unit: "kNm" },
            { id: "mrd", label: "Moment Resistance (MRd)", unit: "kNm" },
          ]}
        />
      </View>
    </Page>
  </Document>
);
