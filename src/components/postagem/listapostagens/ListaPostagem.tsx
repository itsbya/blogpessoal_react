import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { motion } from "framer-motion";
import { MagnifyingGlass } from "@phosphor-icons/react";

function ListaPostagens() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);
      await buscar("/postagens", setPostagens, {
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
    <>
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4">
          <SyncLoader color="#a78bfa" size={15} margin={5} />
          <p className="text-brand-violet font-medium animate-pulse">Carregando postagens...</p>
        </div>
      )}

      {!isLoading && postagens.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 text-zinc-500"
        >
          <MagnifyingGlass size={64} strokeWidth={1} />
          <p className="text-xl font-medium">Nenhuma postagem encontrada</p>
          <p className="text-sm">Seja o primeiro a compartilhar algo hoje!</p>
        </motion.div>
      )}

      {!isLoading && postagens.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
        >
          {postagens.map((postagem) => (
            <motion.div key={postagem.id} variants={item}>
              <CardPostagem postagem={postagem} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

export default ListaPostagens;