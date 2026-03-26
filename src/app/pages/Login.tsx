import { useState } from "react";
import { useNavigate } from "react-router";
import { Fingerprint } from "lucide-react";
import logoImage from "figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png";
import backgroundImage from "figma:asset/4880b469a6272c65f7cf4091f2e31e23615e3970.png";
import { setAuthenticated } from "../auth";

const DEFAULT_LOGIN_USER = "neki";
const DEFAULT_LOGIN_PASSWORD = "nekid1000";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validUser = import.meta.env.VITE_LOGIN_USER || DEFAULT_LOGIN_USER;
  const validPassword =
    import.meta.env.VITE_LOGIN_PASSWORD || DEFAULT_LOGIN_PASSWORD;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular autenticação
    setTimeout(() => {
      setLoading(false);
      if (username === validUser && password === validPassword) {
        setAuthenticated();
        navigate("/brand-selection");
      } else {
        setError("Credenciais inválidas");
      }
    }, 1500);
  };

  const isFormValid =
    username.length > 0 && password.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white relative">
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <img
          src={logoImage}
          alt="Rede d1000"
          className="w-74 h-auto mb-12"
        />

        <div className="card-base rounded-[10px] w-full max-w-md p-8">
          <h2 className="mb-6 text-[#006eb4] text-left">
            Bem-vindo ao Connect
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#006eb4] mb-2 font-bold text-[16px]">
                Usuário
              </label>
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none transition-all"
              />
              {error && (
                <p className="text-red-600 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#006eb4] mb-2 font-bold text-[16px]">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full py-4 px-6 rounded-[10px] bg-[#0066cc] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md text-[18px]"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/activation-expired")}
              className="w-full text-[#006eb4] hover:text-[#006eb4] transition-colors font-bold text-[16px]"
            >
              Esqueci minha senha
            </button>
          </form>
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="flex items-center gap-2 text-[#006eb4] hover:text-[#006eb4] transition-colors active:scale-95"
          >
            <div className="w-12 h-12 bg-white rounded-[10px] flex items-center justify-center shadow-md">
              <Fingerprint className="w-6 h-6" />
            </div>
            <span className="font-semibold text-[16px]">
              Login com biometria
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}