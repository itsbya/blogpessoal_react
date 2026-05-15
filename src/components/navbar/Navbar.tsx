import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, SignOut, User, SquaresFour, Tag, Article } from "@phosphor-icons/react";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  const navLinks = [
    { to: "/postagens", label: "Postagens", icon: <Article size={18} /> },
    { to: "/temas", label: "Temas", icon: <Tag size={18} /> },
    { to: "/cadastrartema", label: "Novo Tema", icon: <SquaresFour size={18} /> },
    { to: "/perfil", label: "Perfil", icon: <User size={18} /> },
  ];

  if (usuario.token === "") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="container glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl shadow-black/50">
        <Link to="/home" className="text-xl font-display font-bold bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
          BlogPessoal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-100 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass rounded-2xl p-4 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-zinc-300 hover:text-white"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
            >
              <SignOut size={18} />
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;