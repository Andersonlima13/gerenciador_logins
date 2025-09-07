// src/app/alunos/[matricula]/page.tsx
'use client'

import { fetchStudentByMatricula, requestStudentCardPDF } from '@/app/lib/api/services/studentService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Student } from '@/app/lib/types/student';
import styled from 'styled-components';
import { FiExternalLink, FiDownload, FiEdit, FiTrash2, FiMenu, FiX } from 'react-icons/fi';
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

const AccessLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  color: blue;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  svg {
    margin-right: 4px;
  }
`;

const Container = styled.div`
  background: rgb(237, 227, 227);  
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  gap: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Card = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const ProfilePic = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
  display: block;
  border: 3px solid #ccc;
`;

const Info = styled.div`
  padding: 10px 0;

  p {
    margin: 5px 0;
    display: flex;
    align-items: center;

    strong {
      margin-right: 5px;
    }
  }
`;

const InfoSection = styled.div<{ title?: string }>`
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;

  &::before {
    content: "${props => props.title || ''}";
    display: inline-block;
    font-weight: bold;
    color: #555;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const InfoItemContainer = styled.div`
  display: flex;
  margin: 0.3rem 0;
  align-items: baseline;
`;

const Label = styled.span`
  font-weight: 600;
  color: #444;
  min-width: 120px;
  font-size: 0.8rem;
`;

const Value = styled.span`
  color: #333;
  word-break: break-word;
  flex-grow: 1;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  min-width: 60px;
  padding: 10px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
`;

const MainActionButton = styled.button`
  border: 2px solid #000;
  background: transparent;
  padding: 8px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;

  &:hover {
    background: #f3f3f3;
  }
`;

const ActionsMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  width: ${props => props.isOpen ? '200px' : '0'};
  margin-top: 15px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  max-height: ${props => props.isOpen ? '300px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
`;

const ActionButton = styled.button`
  border: 2px solid #000;
  background: transparent;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;

  &:hover {
    background: #f3f3f3;
  }
`;

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <InfoItemContainer>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </InfoItemContainer>
);

export default function AlunoDetalhes({ params }: { params: { matricula: string } }) {
  const [aluno, setAluno] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (!/^\d+$/.test(params.matricula)) {
          setError('Matrícula inválida');
          setLoading(false);
          return;
        }

        const data = await fetchStudentByMatricula(params.matricula)
        if (!data?.matricula) {
          setError('Aluno não encontrado');
          setLoading(false);
          return;
        }

        setAluno(data);
        setLoading(false);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Erro ao carregar dados do aluno');
          console.error('Erro detalhado:', err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [params.matricula]);

  const handleDownloadPDF = async () => {
    if (!aluno) return;
    
    setIsDownloadingPDF(true);
    try {
      // Solicita a geração do PDF através do studentService
      await requestStudentCardPDF(aluno.matricula);
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      alert('Erro ao baixar PDF do card');
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <div className="p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p>Carregando dados do aluno...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <div className="p-4 max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <h2 className="font-bold">404 - Aluno não encontrado</h2>
                <p className="mt-1">{error}</p>
                <button 
                  onClick={() => router.push('/home')}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Voltar para lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!aluno) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Container>
            <PageWrapper>
              <MainContent>
                {/* CARD PRINCIPAL */}
                <Card>
                  <ProfilePic src="https://cdn-icons-png.flaticon.com/512/4196/4196591.png" alt="Profile" />

                  <Info>
                    <InfoSection>
                      {aluno.nome && <InfoItem label="NOME" value={aluno.nome} />}
                      {aluno.serie && <InfoItem label="SÉRIE" value={aluno.serie} />}
                      {aluno.unidade && <InfoItem label="UNIDADE" value={aluno.unidade} />}
                    </InfoSection>

                    {/* E-mail */}
                    <InfoSection>
                      <SectionHeader>
                        <span>E-MAIL</span>
                        <AccessLink href={aluno.email ? `mailto:${aluno.email}` : '#'}>
                          <FiExternalLink /> ACESSE AQUI
                        </AccessLink>
                      </SectionHeader>
                      {aluno.email && <InfoItem label="E-MAIL" value={aluno.email} />}
                      {aluno.senha_email && <InfoItem label="SENHA" value={aluno.senha_email} />}
                    </InfoSection>

                    {/* SFB */}
                    <InfoSection>
                      <SectionHeader>
                        <span>SFB</span>
                        <AccessLink href="#" onClick={() => window.open('https://www.sfb.com.br', '_blank')}>
                          <FiExternalLink /> ACESSE AQUI
                        </AccessLink>
                      </SectionHeader>
                      {aluno.sfb && <InfoItem label="USUÁRIO" value={aluno.sfb} />}
                      {aluno.senha_sfb && <InfoItem label="SENHA" value={aluno.senha_sfb} />}
                    </InfoSection>

                    {/* RICHMOND */}
                    <InfoSection>
                      <SectionHeader>
                        <span>RICHMOND</span>
                        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
                          <FiExternalLink /> ACESSE AQUI
                        </AccessLink>
                      </SectionHeader>
                      {aluno.richmond && <InfoItem label="USUÁRIO" value={aluno.richmond} />}
                      {aluno.senha_r && <InfoItem label="SENHA" value={aluno.senha_r} />}
                    </InfoSection>

                    {/* ARVORE */}
                    <InfoSection>
                      <SectionHeader>
                        <span>ARVORE</span>
                        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
                          <FiExternalLink /> ACESSE AQUI
                        </AccessLink>
                      </SectionHeader>
                      {aluno.arvore_senha && <InfoItem label="USUÁRIO" value={aluno.arvore_senha} />}
                    </InfoSection>

                    {/* EVOLUCIONAL */}
                    <InfoSection>
                      <SectionHeader>
                        <span>EVOLUCIONAL</span>
                        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
                          <FiExternalLink /> ACESSE AQUI
                        </AccessLink>
                      </SectionHeader>
                      {aluno.evolucional && <InfoItem label="USUÁRIO" value={aluno.evolucional} />}
                      {aluno.senha_evo && <InfoItem label="SENHA" value={aluno.senha_evo} />}
                    </InfoSection>
                  </Info>
                </Card>
              </MainContent>

              {/* COLUNA DE BOTÕES */}
              <ActionsContainer>
                <MainActionButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <FiX /> : <FiMenu />}
                </MainActionButton>
                
                <ActionsMenu isOpen={isMenuOpen}>
                  <ActionButton onClick={() => router.push('/home')}>
                    Voltar
                  </ActionButton>
                  <ActionButton onClick={handleDownloadPDF} disabled={isDownloadingPDF}>
                    <FiDownload /> {isDownloadingPDF ? 'Gerando PDF...' : 'Download Card'}
                  </ActionButton>
                  <ActionButton><FiEdit /> Editar Card</ActionButton>
                  <ActionButton><FiTrash2 /> Excluir Card</ActionButton>
                </ActionsMenu>
              </ActionsContainer>
            </PageWrapper>
          </Container>
        </div>
      </div>
    </>
  );
}
