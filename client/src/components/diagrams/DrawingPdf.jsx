import { Document, Page, View, Image, Text } from "@react-pdf/renderer";

const DrawingPDF = ({ imageData }) => {
  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Image
            src={imageData}
            style={{
              maxWidth: "1500px",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </View>
        <View
          style={{
            border: "1pt solid #ccc",
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "#eee",
            borderRadius: 2,
            alignSelf: "flex-end",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#555" }}>
            UNITS: MILLIMETERS (mm)
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DrawingPDF;
