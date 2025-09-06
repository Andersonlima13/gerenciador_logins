import {
  FormContainer,
  Title,
  ButtonRow,
  CancelButton,
  SaveButton
} from "./modalstyle/ModalStyles";

interface ExportStudentsModalContentProps {
  onClose: () => void
  onExport: (format: "csv" | "xlsx") => void
}

export default function ExportStudentsModalContent({
  onClose,
  onExport,
}: ExportStudentsModalContentProps) {
  return (
    <FormContainer>
      <Title>Exportar Alunos</Title>
      <p style={{ fontSize: "0.95rem", color: "#666", marginBottom: 12 }}>
        Selecione o formato para exportar a lista de alunos.
      </p>
      <ButtonRow>
        <SaveButton onClick={() => onExport("csv")} style={{ background: "#16a34a" }}>
          Exportar CSV
        </SaveButton>
        <SaveButton onClick={() => onExport("xlsx")} style={{ background: "#4338ca" }}>
          Exportar XLSX
        </SaveButton>
      </ButtonRow>
      <ButtonRow>
        <CancelButton type="button" onClick={onClose}>
          Fechar
        </CancelButton>
      </ButtonRow>
    </FormContainer>
  );
}
