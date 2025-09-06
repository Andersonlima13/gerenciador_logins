import { useState } from "react"
import {
  FormContainer,
  Title,
  Label,
  Input,
  Select,
  ButtonRow,
  CancelButton,
  SaveButton
} from "./modalstyle/ModalStyles";
import { TURMAS } from "../interfaces/turma";
import { TURNOS } from "../interfaces/turno";
import { UNIDADES } from "../interfaces/unidade";
import { SERIES } from "../interfaces/serie";
import { emailRegex } from "../validate/emailRegex";
import { matriculaRegex } from "../validate/matriculaRegex";
import { createStudent } from "../lib/api/services/studentService";

interface AddStudentModalContentProps {
  onClose: () => void
  onSubmit: (data: { nome: string; matricula: string; email: string }) => void
}

export default function AddStudentModalContent({
  onClose,
  onSubmit,
}: AddStudentModalContentProps) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [unidade, setUnidade] = useState("");
  const [errors, setErrors] = useState<{ email?: string; matricula?: string }>({});

  const validateEmail = (value: string) => emailRegex.test(value);
  const validateMatricula = (value: string) => matriculaRegex.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: { email?: string; matricula?: string } = {};
    if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
      valid = false;
    }
    if (!validateMatricula(matricula)) {
      newErrors.matricula = "Matrícula deve conter apenas números";
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;
    await createStudent({ nome, matricula, email, senha, serie, turma, turno, unidade });
    onSubmit({ nome, matricula, email, senha, serie, turma, turno, unidade });
    onClose();
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <Title>Adicionar Aluno</Title>
      <div>
        <Label>Nome</Label>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Matrícula</Label>
        <Input
          type="text"
          value={matricula}
          onChange={(e) => {
            // Permite apenas números usando regex importado
            const val = e.target.value.replace(matriculaRegex, "");
            setMatricula(e.target.value.replace(/[^\d]/g, ""));
          }}
          required
        />
        {errors.matricula && (
          <span style={{ color: "#d32f2f", fontSize: "0.9em" }}>{errors.matricula}</span>
        )}
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <span style={{ color: "#d32f2f", fontSize: "0.9em" }}>{errors.email}</span>
        )}
      </div>
      <div>
        <Label>Senha do Email</Label>
        <Input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Série</Label>
        <Select value={serie} onChange={e => setSerie(e.target.value)} required>
          <option value="" disabled>Selecione a série</option>
          {SERIES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Turma</Label>
        <Select value={turma} onChange={e => setTurma(e.target.value)} required>
          <option value="" disabled>Selecione a turma</option>
          {TURMAS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Turno</Label>
        <Select value={turno} onChange={e => setTurno(e.target.value)} required>
          <option value="" disabled>Selecione o turno</option>
          {TURNOS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Unidade</Label>
        <Select value={unidade} onChange={e => setUnidade(e.target.value)} required>
          <option value="" disabled>Selecione a unidade</option>
          {UNIDADES.map(u => (
            <option key={u.value} value={u.value}>{u.label}</option>
          ))}
        </Select>
      </div>
      <ButtonRow>
        <CancelButton type="button" onClick={onClose}>
          Cancelar
        </CancelButton>
        <SaveButton type="submit">Criar</SaveButton>
      </ButtonRow>
    </FormContainer>
  );
}
