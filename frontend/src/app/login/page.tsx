'use client';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
import {login} from "../lib/api/services/authService";
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";





const Container = styled.div`
  height: 100vh;
  background: #475d62 url('/img/star-sky.jpg');
  background-size: cover;
  position: relative;
`;

const Form = styled.form`
  max-width: 320px;
  width: 90%;
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
`;

const Illustration = styled.div`
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #2980ef;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
`;

const Button = styled.button`
  background: #214a80;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;
  width: 100%;

  &:hover {
    background: #1a3b66;
  }
`;

const Footer = styled.div`
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  margin-top: 20px;

  &:hover {
    opacity: 1;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 try {
  await login(email, password);
  toast.success("✅ Login bem-sucedido!");
  setTimeout(() => router.push("/home"), 1000);
} catch (err: any) {
  toast.error(err.response?.data?.error || "❌ Erro ao fazer login");
}
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 className="d-flex justify-content-center text-light">Login</h2>
        <Illustration>
          <i className="icon ion-ios-locked-outline"></i>
        </Illustration>

        <div className="form-group">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <Button className="text-light" type="submit">
            Log In
          </Button>
        </div>

        <Footer className="text-light">
          Direitos Reservados, <b>Colégio Vila</b>
        </Footer>
      </Form>

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
}