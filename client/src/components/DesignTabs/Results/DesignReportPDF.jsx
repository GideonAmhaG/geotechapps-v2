import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import InterRegular from "../../../assets/fonts/Inter_18pt-Regular.ttf";
import {
  PROJECT_INFO_ITEMS,
  INPUT_PARAMETERS_ITEMS,
  GEOTECHNICAL_ITEMS,
  STRUCTURAL_ITEMS,
  SHEAR_PUNCHING_ITEMS,
  SHEAR_WIDE_BEAM_ITEMS,
  BENDING_MOMENT_ITEMS,
  FINAL_VALUES_ITEMS,
  TYPE_MAPPINGS,
  FIELD_FORMATTING,
} from "./constants";

Font.register({
  family: "Inter",
  src: InterRegular,
});

const stylesPDF = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  withSymbols: {
    fontFamily: "Inter",
  },
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

const formatValue = (value, unit, decimals = FIELD_FORMATTING.decimals) => {
  if (value === undefined || value === null) return "N/A";
  const numValue = typeof value === "number" ? value : parseFloat(value);

  if (
    unit === "" &&
    Math.abs(numValue) < FIELD_FORMATTING.smallNumberThreshold
  ) {
    return numValue.toFixed(FIELD_FORMATTING.smallNumberDecimals);
  }

  if (Number.isInteger(numValue)) {
    return `${numValue} ${unit}`;
  }

  return `${numValue.toFixed(decimals)} ${unit}`;
};

const renderLabel = (item) => {
  if (!item.symbol) return item.label;

  if (typeof item.label === "string") {
    // Find the position of the symbol in the label
    const symbolPos = item.label.indexOf(item.symbol);

    if (symbolPos === -1) return item.label;

    // Split the label into parts before, at, and after the symbol
    const before = item.label.substring(0, symbolPos);
    const after = item.label.substring(symbolPos + item.symbol.length);

    return (
      <Text>
        {before}
        <Text style={stylesPDF.withSymbols}>{item.symbol}</Text>
        {after}
      </Text>
    );
  }

  return item.label;
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
          <Text style={stylesPDF.label}>{renderLabel(item)}</Text>
          <Text style={stylesPDF.value}>
            {formatValue(data[item.id], item.unit, item.decimals)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const ReportPDF = ({ data, results }) => {
  const allData = { ...data.inputs, ...results };

  const getProjectInfoValue = (item) => {
    switch (item.id) {
      case "foundationType":
        return (
          TYPE_MAPPINGS.foundation[data.foundationType] || data.foundationType
        );
      case "soilType":
        return TYPE_MAPPINGS.soil[data.soilType] || data.soilType;
      case "loadType":
        return TYPE_MAPPINGS.load[data.loadType] || data.loadType;
      default:
        return allData[item.id];
    }
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

          <View style={stylesPDF.section}>
            <Text style={stylesPDF.sectionTitle}>Project Information</Text>
            <View style={stylesPDF.row}>
              <Text style={stylesPDF.subSectionHeader}></Text>
              <Text style={stylesPDF.tableHeaderText}>Type</Text>
            </View>
            {PROJECT_INFO_ITEMS.map((item) => (
              <View key={item.id} style={stylesPDF.row}>
                <Text style={stylesPDF.label}>{item.label}</Text>
                <Text style={stylesPDF.value}>{getProjectInfoValue(item)}</Text>
              </View>
            ))}
          </View>

          <View style={stylesPDF.divider} />

          <ParameterTable
            title="Input Parameters"
            items={INPUT_PARAMETERS_ITEMS}
            data={allData}
          />

          <View style={stylesPDF.divider} />

          <ParameterTable
            title="Geotechnical Design"
            items={GEOTECHNICAL_ITEMS}
            data={allData}
          />

          <View style={stylesPDF.divider} />

          <View style={stylesPDF.section}>
            <Text style={stylesPDF.sectionTitle}>Structural Design</Text>
            <ParameterTable items={STRUCTURAL_ITEMS} data={allData} />
            <ParameterTable
              items={SHEAR_PUNCHING_ITEMS}
              data={results}
              subheader="Shear Failure - Punching"
              showResultsHeader={true}
            />
            <ParameterTable
              items={SHEAR_WIDE_BEAM_ITEMS}
              data={results}
              subheader="Shear Failure - Vertical/Wide Beam"
              showResultsHeader={true}
            />
            <ParameterTable
              items={BENDING_MOMENT_ITEMS}
              data={results}
              subheader="Bending Moment Failure"
              showResultsHeader={true}
            />
          </View>

          <View style={stylesPDF.divider} />

          <ParameterTable
            title="Final Rounded Values"
            items={FINAL_VALUES_ITEMS}
            data={results}
          />
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
