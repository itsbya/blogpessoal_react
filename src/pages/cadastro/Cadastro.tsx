import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { motion } from "framer-motion";
import { User, EnvelopeSimple, Image, Lock, UserPlus, XCircle, CheckCircle } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Usuário Cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta("Dados do usuário estão inconsistentes! Verifique a senha (mínimo 8 caracteres).", "info");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
    setIsLoading(false);
  }

  function retornar() {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden py-20">
      {/* Background Decorative Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-violet/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-cyan/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl border-white/10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent inline-block">
              Criar Conta
            </h1>
            <p className="text-zinc-400 mt-2">Junte-se à nossa comunidade tecnológica</p>
          </div>

          <form onSubmit={cadastrarNovoUsuario} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium text-zinc-300 ml-1">Nome Completo</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all"
                  value={usuario.nome}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="usuario" className="text-sm font-medium text-zinc-300 ml-1">E-mail (Usuário)</label>
              <div className="relative group">
                <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="email"
                  id="usuario"
                  name="usuario"
                  placeholder="email@provedor.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all"
                  value={usuario.usuario}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="foto" className="text-sm font-medium text-zinc-300 ml-1">URL da Foto de Perfil</label>
              <div className="relative group">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  placeholder="https://imagem.com/foto.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all"
                  value={usuario.foto}
                  onChange={atualizarEstado}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium text-zinc-300 ml-1">Senha (min. 8 caracteres)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all"
                  value={usuario.senha}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmarSenha" className="text-sm font-medium text-zinc-300 ml-1">Confirmar Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 transition-all"
                  value={confirmarSenha}
                  onChange={handleConfirmarSenha}
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                onClick={retornar}
                className="flex-1 btn-outline py-4 flex justify-center items-center gap-2"
              >
                <XCircle size={20} />
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary py-4 flex justify-center items-center gap-2 disabled:opacity-70 group"
              >
                {isLoading ? (
                  <ClipLoader color="#09090b" size={24} />
                ) : (
                  <>
                    <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Criar Conta</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Cadastro;