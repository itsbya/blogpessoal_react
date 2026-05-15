import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagem";
import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";

function Home() {
  return (
    <div className="min-height-screen pt-28">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-sm font-medium">
              <Sparkle size={16} weight="fill" />
              <span>Bem-vindo ao futuro do seu blog</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Expresse suas <br />
              <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
                ideias ao mundo
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
              Um espaço minimalista e profissional para compartilhar seus pensamentos, 
              tecnologias favoritas e descobertas do dia a dia.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
              <div className="btn-primary flex items-center gap-2 cursor-pointer">
                <ModalPostagem />
              </div>
              <button className="btn-outline">
                Ver Projetos
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Decorative Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-violet/20 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-cyan/10 blur-[100px] rounded-full -z-10 animate-pulse delay-700" />
            
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Hero Illustration"
              className="w-full max-w-md drop-shadow-[0_0_50px_rgba(167,139,250,0.3)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-3xl font-bold">Postagens Recentes</h2>
            <div className="text-sm text-zinc-500">Filtrar por Tema</div>
          </div>
          <ListaPostagens />
        </div>
      </section>
    </div>
  );
}

export default Home;