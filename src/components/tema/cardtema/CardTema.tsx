import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { motion } from "framer-motion";
import { Pencil, Trash, Hash } from "@phosphor-icons/react";

interface CardTemaProps {
  tema: Tema;
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card flex flex-col h-full overflow-hidden"
    >
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet border border-brand-violet/20">
          <Hash size={24} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Tema
          </h3>
          <p className="text-2xl font-bold text-zinc-100">{tema.descricao}</p>
        </div>
      </div>

      <div className="flex border-t border-white/5 bg-white/[0.02]">
        <Link
          to={`/editartema/${tema.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-all border-r border-white/5"
        >
          <Pencil size={14} />
          Editar
        </Link>
        <Link
          to={`/deletartema/${tema.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <Trash size={14} />
          Deletar
        </Link>
      </div>
    </motion.div>
  );
}

export default CardTema;