import { UploadCloud, FileText } from "lucide-react";

function UploadBox({ file, files, onFileChange, onFilesChange, multiple = false }) {
  const selectedFiles = Array.isArray(files) ? files : file ? [file] : [];

  const handleFileSelection = (event) => {
    const chosenFiles = Array.from(event.target.files || []);

    if (multiple) {
      if (onFilesChange) {
        onFilesChange(chosenFiles);
      } else if (onFileChange) {
        onFileChange(chosenFiles[0] || null);
      }
      return;
    }

    if (onFileChange) {
      onFileChange(chosenFiles[0] || null);
    } else if (onFilesChange) {
      onFilesChange(chosenFiles.slice(0, 1));
    }
  };

  return (
    <label
      className="card"
      style={{
        border: "2px dashed rgba(31, 77, 122, 0.35)",
        padding: 26,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        multiple={multiple}
        hidden
        onChange={handleFileSelection}
      />
      <UploadCloud size={32} color="#1F4D7A" />
      <h4 style={{ marginTop: 8 }}>
        {multiple ? "Drag & Drop or Click to Upload Files" : "Drag & Drop or Click to Upload"}
      </h4>
      <p style={{ marginTop: 8 }}>Supported: PDF, PNG, JPG</p>
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: 8, justifyItems: "center" }}>
          {selectedFiles.map((selectedFile) => (
            <p
              key={`${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`}
              style={{ color: "#111111", display: "inline-flex", gap: 8, alignItems: "center" }}
            >
              <FileText size={16} /> {selectedFile.name}
            </p>
          ))}
        </div>
      )}
    </label>
  );
}

export default UploadBox;
