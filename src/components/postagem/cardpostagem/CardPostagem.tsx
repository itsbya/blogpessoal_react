import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import { motion } from "framer-motion";
import { CalendarBlank, User, Tag, Pencil, Trash } from "@phosphor-icons/react";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(postagem.data));

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card flex flex-col h-full overflow-hidden"
    >
      <div className="p-6 flex-1 flex flex-col gap-4">
        {/* Header: Author & Date */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={postagem.usuario?.foto || "https://i.imgur.com/8RK9k6v.png"}
                className="h-10 w-10 rounded-full border border-white/10 object-cover"
                alt={postagem.usuario?.nome}
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-bg-dark rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-100 line-clamp-1">
                {postagem.usuario?.nome}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                <CalendarBlank size={10} />
                {formattedDate}
              </div>
            </div>
          </div>
          
          {postagem.tema && (
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-brand-cyan font-bold uppercase tracking-widest">
              {postagem.tema.descricao}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-violet transition-colors line-clamp-2">
            {postagem.titulo}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
            {postagem.texto}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-2 border-t border-white/5 bg-white/[0.02]">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
        >
          <Pencil size={14} />
          Editar
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <Trash size={14} />
          Deletar
        </Link>
      </div>
    </motion.div>
  );
}

export default CardPostagem;