import RNFS from "react-native-fs";
import { Alert } from "react-native";

// This is the data structure from Main.js that contains all PDF references
// We're duplicating it here to avoid circular dependencies
const data = [
  {
    id: "1",
    title: "Content Page",
    subtitles: [
      {
        id: "sub1",
        text: "App Content",
      },
    ],
  },
  {
    id: "2",
    title: "Guidelines for Paediatric Anaesthesia",
    subtitles: [
      {
        id: "sub2",
        text: "Guidelines for the Provision of Anaesthesia for Paediatric patients",
      },
      {
        id: "sub3",
        text: "Preoperative preparation and induction techniques",
      },
    ],
  },
  {
    id: "3",
    title: "Paediatric Anaesthesia",
    subtitles: [
      { id: "sub4", text: "Perioperative Evaluation" },
      { id: "sub5", text: "Dental injury" },
      { id: "sub6", text: "Nausea & Vomiting" },
      { id: "sub7", text: "Common Medical Conditions" },
      { id: "sub8", text: "Equipment" },
      { id: "sub9", text: "Premedication" },
      { id: "sub10", text: "Emergence Delirium" },
      { id: "sub11", text: "Fasting Guidelines" },
      { id: "sub12", text: "TIVA for children" },
    ],
  },
  {
    id: "4",
    title: "Fluid Guidelines",
    subtitles: [
      {
        id: "sub13",
        text: "Fluid Management",
      },
    ],
  },
  {
    id: "5",
    title: "Neonatal Anaesthesia",
    subtitles: [{ id: "sub14", text: "Neonatal Anaesthesia" }],
  },
  {
    id: "6",
    title: "Cardiac Guidelines",
    subtitles: [
      {
        id: "sub15",
        text: "Prophylaxis for Infective Endocarditis",
      },
      { id: "sub16", text: "ROTEM Algorithm" },
      {
        id: "sub17",
        text: "Paediatric Cardiac Anaesthesia",
      },
      { id: "sub18", text: "Common Cardiac Conditions" },
      {
        id: "sub19",
        text: "Cardiac Catheterization",
      },
    ],
  },
  {
    id: "7",
    title: "Diagnostic Imaging",
    subtitles: [
      { id: "sub20", text: "Diagnostic Imaging" },
      {
        id: "sub21",
        text: "Anaesthesia for Paediatric Oncology Radiotherapy",
      },
    ],
  },
  {
    id: "8",
    title: "Sedation For Oncology Patients",
    subtitles: [
      {
        id: "sub22",
        text: "Sedation for Oncology Children",
      },
    ],
  },
  {
    id: "9",
    title: "Regional Anaesthesia",
    subtitles: [
      { id: "sub23", text: "Central Neuraxial Block" },
      {
        id: "sub24",
        text: "Regional Anaesthesia Workflow",
      },
      { id: "sub25", text: "Current Trends" },
      { id: "sub26", text: "Peripheral Nerve Block" },
      { id: "sub27", text: "Local Anaesthetic Toxicity" },
      { id: "sub28", text: "Ultrasound Guided Blocks" },
    ],
  },
  {
    id: "10",
    title: "Drug Doses in Paediatric Anaesthesia",
    subtitles: [
      { id: "sub29", text: "Miscellaneous Drugs" },
      { id: "sub30", text: "Antibiotics" },
    ],
  },
  {
    id: "11",
    title: "Transfusion in Children",
    subtitles: [
      {
        id: "sub31",
        text: "Paediatric Massive Transfusion Protocol",
      },
      { id: "sub32", text: "Transfusion Guidelines" },
    ],
  },
  {
    id: "12",
    title: "Common Crisis",
    subtitles: [
      {
        id: "sub33",
        text: "Post Adenotonsillectomy Bleeding",
      },
      { id: "sub34", text: "Latex Allergy" },
      { id: "sub35", text: "Suspected Anaphylaxis" },
      { id: "sub36", text: "Local Anaesthetic Toxicity" },
      { id: "sub37", text: "Laryngospasm" },
      { id: "sub38", text: "Epiglottitis" },
      { id: "sub39", text: "Hypercyanotic Tet Spells" },
      { id: "sub40", text: "Malignant Hyperthermia" },
      { id: "sub49", text: "Crisis Algorithms" },
    ],
  },
  {
    id: "13",
    title: "Advanced Paediatric Life Support",
    subtitles: [
      {
        id: "sub42",
        text: "Advanced Paediatric Life Support",
      },
    ],
  },
  {
    id: "14",
    title: "Acute Pain Service",
    subtitles: [
      { id: "sub43", text: "Pain Assessment in Children" },
      {
        id: "sub44",
        text: "Pharmacological Approach To Pain Management",
      },
      {
        id: "sub45",
        text: "Patient Controlled Analgesia",
      },
      { id: "sub46", text: "Post Epidural Care" },
    ],
  },
  {
    id: "15",
    title: "Chronic Pain Service",
    subtitles: [{ id: "sub47", text: "Chronic Pain" }],
  },
  {
    id: "16",
    title: "Normal Laboratory Data",
    subtitles: [{ id: "sub48", text: "e-lab book" }],
  },
];

// Directory to store all PDFs
const PDF_DIRECTORY = `${RNFS.DocumentDirectoryPath}/offline_pdfs`;

// Format file name the same way as in Main.js
const formatFileName = (text) => {
  let text1;
  if (typeof text !== "string") {
    text1 = text.toString();
  } else {
    text1 = text;
  }
  const lowercaseText = text1.toLowerCase();
  const words = lowercaseText.split(" ");
  return words.join(" ");
};

// Get URL for a PDF
const getPdfUrl = (title, subtitle) => {
  return `https://github.com/tedydevmac/aspa/raw/new/assets/kkh-assets/${formatFileName(
    title
  )}/${formatFileName(subtitle)}.pdf`;
};

// Get local path for a PDF
export const getLocalPdfPath = (title, subtitle) => {
  return `${PDF_DIRECTORY}/${formatFileName(title)}/${formatFileName(
    subtitle
  )}.pdf`;
};

// Check if a PDF exists locally
export const checkPdfExists = async (title, subtitle) => {
  const localPath = getLocalPdfPath(title, subtitle);
  try {
    return await RNFS.exists(localPath);
  } catch (error) {
    Alert.alert(`Error checking if PDF exists: ${error}`);
    return false;
  }
};

// Download a single PDF
const downloadSinglePdf = async (title, subtitle) => {
  const url = getPdfUrl(title, subtitle);
  const localPath = getLocalPdfPath(title, subtitle);

  // Create directory if it doesn't exist
  const dir = `${PDF_DIRECTORY}/${formatFileName(title)}`;
  try {
    const dirExists = await RNFS.exists(dir);
    if (!dirExists) {
      await RNFS.mkdir(dir, { NSURLIsExcludedFromBackupKey: true });
    }

    // Download the file
    const options = {
      fromUrl: url,
      toFile: localPath,
      background: true,
      discretionary: true,
      cacheable: true,
    };

    const result = await RNFS.downloadFile(options).promise;
    return result.statusCode === 200;
  } catch (error) {
    Alert.alert(`Error downloading PDF ${title}/${subtitle}: ${error}`);
    return false;
  }
};

// Download all PDFs
export const downloadAllPdfs = async (progressCallback = null) => {
  try {
    // Create main directory if it doesn't exist
    const dirExists = await RNFS.exists(PDF_DIRECTORY);
    if (!dirExists) {
      await RNFS.mkdir(PDF_DIRECTORY, { NSURLIsExcludedFromBackupKey: true });
    }

    // Count total PDFs for progress tracking
    let totalPdfs = 0;
    data.forEach((item) => {
      totalPdfs += item.subtitles.length;
    });

    let downloadedPdfs = 0;
    let failedDownloads = [];

    // Download each PDF
    for (const item of data) {
      for (const subtitle of item.subtitles) {
        const success = await downloadSinglePdf(item.title, subtitle.text);
        downloadedPdfs++;

        if (!success) {
          failedDownloads.push(`${item.title}/${subtitle.text}`);
        }

        if (progressCallback) {
          progressCallback(downloadedPdfs, totalPdfs);
        }
      }
    }

    // Return results
    return {
      success: failedDownloads.length === 0,
      totalPdfs,
      downloadedPdfs,
      failedDownloads,
    };
  } catch (error) {
    Alert.alert(`Error downloading all PDFs: ${error}`);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Delete all downloaded PDFs
export const clearAllPdfs = async () => {
  try {
    const dirExists = await RNFS.exists(PDF_DIRECTORY);
    if (dirExists) {
      await RNFS.unlink(PDF_DIRECTORY);
      return true;
    }
    return false;
  } catch (error) {
    Alert.alert(`Error clearing PDF cache: ${error}`);
    return false;
  }
};
