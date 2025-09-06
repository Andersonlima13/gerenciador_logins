import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 24px;
  background: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 60, 120, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #003c78;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #003c78;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.2s;
  &:focus {
    border-color: #003c78;
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.2s;
  &:focus {
    border-color: #003c78;
    outline: none;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #003c78;
  background: #fff;
  color: #003c78;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e3f0fa;
  }
`;

export const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background: #003c78;
  color: #fff;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0050a0;
  }
`;
