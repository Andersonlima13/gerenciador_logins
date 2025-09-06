"use client"
// aqui onde vamos renderizar a lista de alunos
import { useEffect, useState } from "react";
import { List } from "../components/List";
import SidebarComponent from "../components/Sidebar";
import { fetchStudents } from '../lib/api/services/studentService';
import { Student } from "../lib/types/student";
import Navbar from "../components/Navbar";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Erro ao carregar alunos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)', background: 'lightblue' ,marginTop: '60px', backgroundImage: `linear-gradient(rgba(0, 60, 120, 0.7), rgba(, 0, 160, 0.7))`
 }}>
      <Navbar />
      <SidebarComponent />

      
      <div style={{ 
      flex: 1, 
        marginLeft: '242px', // Ajuste conforme a largura da sua sidebar
        padding: '20px',
        
       minHeight: '100vh',
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       



      }}>
        {loading ? (
          <p>Carregando alunos...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <List<Student>
            title="Alunos - Colegio Vila"  
            data={students}
            columns={[
              { key: 'id', label: 'Matrícula' },
              { key: 'nome', label: 'nome' },
              { key: 'serie', label: 'serie' },
              { key: 'unidade', label: 'unidade' },
              { key: 'email', label: 'email' },
            ]}
          />
        )}
        
  



      </div>
    </div>
  );
}