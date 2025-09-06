// components/ExportStudentsModal.jsx
"use client"
import React, { useState } from "react";
import { FiDownload, FiUpload, FiSend } from "react-icons/fi";
import { GenericModal } from "./GenericModal";
import styled from "styled-components";

const DataContainer = styled.div`
  background: #f3f4f6;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #e5e7eb;
  }
`;

const FileUploadButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const ExportStudentsModal = ({
  isOpen,
  onClose,
  onDownload,
  onUpload,
  isDownloading,
  uploadSuccess,
  uploadError
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Exportar Alunos"
    >
      <DataContainer onClick={onDownload}>
        <FileUploadButton>
          <FiDownload size={20} style={{ marginRight: '10px' }} />
          {isDownloading ? 'Gerando arquivo...' : 'Modelo De Planilha'}
        </FileUploadButton>
      </DataContainer>

      {uploadSuccess ? (
        <div style={{ color: 'green' }}>✅ Planilha enviada com sucesso!</div>
      ) : (
        <>
          <div style={{ marginTop: '15px' }}>
            <FileUploadButton>
              <FiUpload size={20} style={{ marginRight: '8px' }} />
              {selectedFile ? selectedFile.name : 'Escolher arquivo'}
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
            </FileUploadButton>
          </div>

          {uploadError && (
            <div style={{ color: 'red', marginTop: '10px' }}>❌ {uploadError}</div>
          )}

          <DataContainer 
            onClick={() => selectedFile && onUpload(selectedFile)}
            style={{
              opacity: selectedFile ? 1 : 0.6,
              cursor: selectedFile ? 'pointer' : 'not-allowed',
              pointerEvents: !selectedFile ? 'none' : 'auto',
              marginTop: '10px'
            }}
          >
            <FileUploadButton>
              <FiSend size={20} style={{ marginRight: '10px' }} />
              Enviar Planilha
            </FileUploadButton>
          </DataContainer>
        </>
      )}
    </GenericModal>
  );
};