import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { EnvelopeSimple, Lock, SignIn, UserPlus } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-violet/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-cyan/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl border-white/10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent inline-block">
              Bem-vindo
            </h1>
            <p className="text-zinc-400 mt-2">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={login} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="usuario" className="text-sm font-medium text-zinc-300 ml-1">
                E-mail
              </label>
              <div className="relative group">
                <EnvelopeSimple className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="seu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 focus:border-brand-violet/50 transition-all"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="senha" className="text-sm font-medium text-zinc-300">
                  Senha
                </label>
                <a href="#" className="text-xs text-brand-violet hover:text-brand-violet/80 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-violet transition-colors" size={20} />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 focus:border-brand-violet/50 transition-all"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <ClipLoader color="#09090b" size={24} />
              ) : (
                <>
                  <span>Entrar</span>
                  <SignIn size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-zinc-400 text-sm">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-brand-cyan font-bold hover:text-brand-cyan/80 transition-colors inline-flex items-center gap-1">
                <UserPlus size={16} />
                Cadastre-se agora
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;