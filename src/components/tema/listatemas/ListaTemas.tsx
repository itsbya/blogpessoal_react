import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { motion } from "framer-motion";
import { Tag } from "@phosphor-icons/react";

function ListaTemas() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h1 className="text-3xl font-bold font-display">Temas</h1>
            <p className="text-sm text-zinc-500">Gerencie as categorias do seu blog</p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4">
              <SyncLoader color="#a78bfa" size={15} margin={5} />
              <p className="text-brand-violet font-medium animate-pulse">Carregando temas...</p>
            </div>
          )}

          {!isLoading && temas.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 text-zinc-500"
            >
              <Tag size={64} strokeWidth={1} />
              <p className="text-xl font-medium">Nenhum tema encontrado</p>
              <p className="text-sm">Comece criando um novo tema para suas postagens.</p>
            </motion.div>
          )}

          {!isLoading && temas.length > 0 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {temas.map((tema) => (
                <motion.div key={tema.id} variants={item}>
                  <CardTema tema={tema} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaTemas;