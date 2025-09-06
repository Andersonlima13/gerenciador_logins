"use client"
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { logout } from "../lib/api/services/authService"; // importa logout
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledLinkText = styled.a`
  color: #ffff;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.3);
  }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background:rgb(0, 60, 120);
  opacity: 0.8;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LeftSection = styled(NavSection)`
  justify-content: flex-start;
  width: 250px;
`;

const RightSection = styled(NavSection)`
  margin-left: auto;
  padding-right: 50px;
`;

const NavTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function Navbar() {
  const handleLogout = () => {
    toast.info("👋 O usuário deslogou");
    setTimeout(() => logout(), 1500); // espera o toast antes de redirecionar
  };

  return (
    <>
      <NavContainer>
        <LeftSection>
          <NavTitle>Colégio Vila</NavTitle>
          <Link href="/home" passHref>
            <StyledLinkText><FaHouseChimney/></StyledLinkText>
          </Link>
        </LeftSection>
        
        <RightSection>
          <Link href="/profile" title="Perfil" passHref>
            <StyledLinkText><FaUser/></StyledLinkText>
          </Link>
          <StyledLinkText title="Sair" onClick={handleLogout}>
            <LuLogOut/>
          </StyledLinkText>
        </RightSection>
      </NavContainer>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}
