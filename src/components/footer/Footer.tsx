import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GithubLogo, InstagramLogo, LinkedinLogo, Heart } from "@phosphor-icons/react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { usuario } = useContext(AuthContext);

  if (usuario.token === "") return null;

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-lg font-display font-bold bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
            BlogPessoal
          </p>
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            Feito com <Heart size={14} className="text-red-500 fill-red-500" /> por Ana Beatriz | {currentYear}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/ana-beatriz-carvalho-esmaile/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-brand-violet transition-colors"
          >
            <LinkedinLogo size={24} weight="bold" />
          </a>
          <a
            href="https://www.instagram.com/bia_smaile/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-brand-violet transition-colors"
          >
            <InstagramLogo size={24} weight="bold" />
          </a>
          <a
            href="https://github.com/itsbya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-brand-violet transition-colors"
          >
            <GithubLogo size={24} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;