import { Document, Page, View, Image } from "@react-pdf/renderer";

const DrawingPDF = ({ imageData }) => {
  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={imageData}
            style={{
              maxWidth: "100%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default DrawingPDF;
