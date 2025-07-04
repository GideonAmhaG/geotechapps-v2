import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { styles } from "../../../styles";
import {
  MAIN_RESULTS,
  ADDITIONAL_RESULTS,
  VERIFICATION_CHECKS,
} from "./constants";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";

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
});

const ReportPDF = ({ data, results }) => (
  <Document>
    <Page style={stylesPDF.page}>
      <View style={stylesPDF.section}>
        <Text style={stylesPDF.header}>Foundation Design Report</Text>
        <Text style={{ textAlign: "center", marginBottom: 15 }}>
          Generated on {new Date().toLocaleDateString()}
        </Text>

        {/* Project Information */}
        <Text style={stylesPDF.sectionTitle}>1. Project Information</Text>
        <View style={stylesPDF.row}>
          <Text style={stylesPDF.label}>Foundation Type:</Text>
          <Text style={stylesPDF.value}>{data.foundationType}</Text>
        </View>
        <View style={stylesPDF.row}>
          <Text style={stylesPDF.label}>Soil Type:</Text>
          <Text style={stylesPDF.value}>{data.soilType}</Text>
        </View>
        <View style={stylesPDF.divider} />

        {/* Main Results */}
        <Text style={stylesPDF.sectionTitle}>2. Design Results</Text>
        {MAIN_RESULTS.map((item) => (
          <View key={item.id} style={stylesPDF.row}>
            <Text style={stylesPDF.label}>{item.label}:</Text>
            <Text style={stylesPDF.value}>
              {results[item.id]} {item.unit}
            </Text>
          </View>
        ))}
        <View style={stylesPDF.divider} />

        {/* Additional Results */}
        <Text style={stylesPDF.sectionTitle}>3. Additional Results</Text>
        {ADDITIONAL_RESULTS.map((item) => (
          <View key={item.id} style={stylesPDF.row}>
            <Text style={stylesPDF.label}>{item.label}:</Text>
            <Text style={stylesPDF.value}>
              {results[item.id]} {item.unit}
            </Text>
          </View>
        ))}
        <View style={stylesPDF.divider} />

        {/* Verification Checks */}
        <Text style={stylesPDF.sectionTitle}>4. Verification Checks</Text>
        {VERIFICATION_CHECKS.map((item) => (
          <View key={item.id} style={stylesPDF.row}>
            <Text style={stylesPDF.label}>{item.label}:</Text>
            <Text style={stylesPDF.value}>
              {results[item.id]} {item.unit}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const DesignReport = ({ data, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={isExpanded}
        aria-controls="design-report-content"
      >
        <div className="flex items-center text-[#145da0] hover:text-black">
          <span className="font-medium md:text-[18px] sm:text-[16px] text-[14px]">
            Design Report
          </span>
          <span className="ml-2 md:text-[18px] sm:text-[16px] text-[14px]">
            {isExpanded ? (
              <IoChevronDown className="inline" />
            ) : (
              <IoChevronForward className="inline" />
            )}
          </span>
        </div>
      </button>

      <div
        id="design-report-content"
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? "max-h-[var(--content-height)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isExpanded}
        style={{ "--content-height": "500px" }}
      >
        <div className="bg-white p-6 rounded-b-lg border border-t-0 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className={`${styles.cardTitle} mb-4`}>Additional Results</h4>
              <div className="space-y-4">
                {ADDITIONAL_RESULTS.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className={`${styles.cardDescription}`}>
                      {item.label}
                    </span>
                    <span className={`${styles.cardDescription} font-medium`}>
                      {results[item.id]} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`${styles.cardTitle} mb-4`}>
                Verification Checks
              </h4>
              <div className="space-y-4">
                {VERIFICATION_CHECKS.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className={`${styles.cardDescription}`}>
                      {item.label}
                    </span>
                    <span className={`${styles.cardDescription} font-medium`}>
                      {results[item.id]} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <PDFDownloadLink
              document={<ReportPDF data={data} results={results} />}
              fileName={`foundation_design_${
                new Date().toISOString().split("T")[0]
              }.pdf`}
              className="px-4 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] flex items-center"
            >
              {({ loading }) => (
                <>
                  <FiDownload className="mr-2" />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
              Save to Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignReport;
