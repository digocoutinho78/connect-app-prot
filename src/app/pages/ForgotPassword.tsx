import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import logoImage from "figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png";
import backgroundImage from "figma:asset/4880b469a6272c65f7cf4091f2e31e23615e3970.png";

type Step = "identifier" | "token" | "newPassword" | "success";

const RESEND_COOLDOWN_SEC = 30;
/** Token aceito no protótipo (fluxo estático). */
const MOCK_VALID_TOKEN = "123456";

function maskEmailOrHint(identifier: string): string {
  const trimmed = identifier.trim();
  if (!trimmed.includes("@")) {
    return "o e-mail cadastrado";
  }
  const [local, domain] = trimmed.split("@");
  if (!domain) return "o e-mail cadastrado";
  const localTail =
    local.length <= 3 ? local : `*****${local.slice(-3)}`;
  const domainHead = domain.split(".")[0] ?? domain;
  const domainMasked =
    domainHead.length <= 3
      ? `${domainHead}*****`
      : `${domainHead.slice(0, 3)}*****`;
  return `${localTail}@${domainMasked}`;
}

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState("");
  const [maskedDestination, setMaskedDestination] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [resendSeconds, setResendSeconds] = useState(0);
  const [resendNotice, setResendNotice] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const requirements = [
    { label: "Mínimo de 8 caracteres", met: newPassword.length >= 8 },
    { label: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(newPassword) },
    { label: "Pelo menos uma letra minúscula", met: /[a-z]/.test(newPassword) },
    { label: "Pelo menos um número", met: /[0-9]/.test(newPassword) },
    {
      label: "Pelo menos um caractere especial (!@#$%^&*)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];
  const allRequirementsMet = requirements.every((r) => r.met);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const metCount = requirements.filter((r) => r.met).length;
  const strength =
    metCount === 0
      ? { label: "", color: "" }
      : metCount <= 2
        ? { label: "Fraca", color: "#ef4444" }
        : metCount <= 4
          ? { label: "Média", color: "#fbbf24" }
          : { label: "Forte", color: "#10b981" };

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const t = window.setInterval(() => {
      setResendSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [resendSeconds]);

  useEffect(() => {
    if (step !== "success") return;
    const timer = window.setTimeout(() => navigate("/login"), 3000);
    return () => window.clearTimeout(timer);
  }, [step, navigate]);

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setMaskedDestination(maskEmailOrHint(identifier));
    setStep("token");
    setOtp(["", "", "", "", "", ""]);
    setTokenError(false);
    setResendSeconds(RESEND_COOLDOWN_SEC);
    setResendNotice(false);
  };

  const handleOtpChange = (index: number, digit: string) => {
    const d = digit.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = d;
    setOtp(next);
    setTokenError(false);
    if (d && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next: string[] = ["", "", "", "", "", ""];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] ?? "";
    setOtp(next);
    setTokenError(false);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  const handleTokenConfirm = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setTokenError(true);
      return;
    }
    if (code !== MOCK_VALID_TOKEN) {
      setTokenError(true);
      return;
    }
    setStep("newPassword");
    setFormError("");
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;
    setResendSeconds(RESEND_COOLDOWN_SEC);
    setTokenError(false);
    setOtp(["", "", "", "", "", ""]);
    setResendNotice(true);
    window.setTimeout(() => setResendNotice(false), 4000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!allRequirementsMet) {
      setFormError("A nova senha não atende a todos os requisitos de segurança");
      return;
    }
    if (!passwordsMatch) {
      setFormError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1200);
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="self-start mb-4 text-[#006eb4] font-semibold text-[15px] hover:underline"
        >
          ← Voltar ao login
        </button>
        <img src={logoImage} alt="Rede d1000" className="w-74 h-auto mb-8" />
        {children}
      </div>
    </div>
  );

  if (step === "success") {
    return shell(
      <div className="card-base rounded-[10px] w-full p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-[#006eb4] font-bold text-[22px] leading-tight">
          Nova senha cadastrada com sucesso
        </h2>
        <p className="text-[#717171] text-[16px]">
          Você será redirecionado para a tela de login
        </p>
      </div>,
    );
  }

  if (step === "newPassword") {
    return shell(
      <div className="w-full space-y-4 pb-8">
        <div className="card-base rounded-[10px] p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#006EB4]/10 to-[#00509E]/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#006EB4]" />
          </div>
          <div>
            <h2 className="font-bold text-[#006EB4] mb-1 text-[18px]">
              Segurança da sua conta
            </h2>
            <p className="text-[#717171] text-[15px] font-semibold leading-snug">
              Escolha uma senha forte e única para proteger seus dados
            </p>
          </div>
        </div>

        {formError && (
          <p className="text-red-600 text-sm text-center">{formError}</p>
        )}

        <form onSubmit={handleSavePassword} className="space-y-4">
          <div className="card-base rounded-[10px] p-5">
            <label className="block font-bold text-[#006eb4] mb-2 text-[16px]">
              Nova Senha *
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#717171]"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {newPassword ? (
              <div className="mt-3">
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[#717171]">Força da senha:</span>
                  <span className="font-semibold" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(metCount / requirements.length) * 100}%`,
                      backgroundColor: strength.color || "#e5e7eb",
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="card-base rounded-[10px] p-5">
            <h3 className="font-semibold text-[#006eb4] mb-3 text-[15px]">
              Requisitos de Segurança
            </h3>
            <div className="space-y-2">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 text-[14px] ${
                    req.met ? "text-[#10b981]" : "text-[#717171]"
                  }`}
                >
                  {req.met ? (
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{req.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base rounded-[10px] p-5">
            <label className="block font-bold text-[#006eb4] mb-2 text-[16px]">
              Confirmar Nova Senha *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Digite novamente sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#717171]"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
              className="flex-1 py-4 rounded-[10px] border-2 border-[#006eb4] text-[#006eb4] font-semibold disabled:opacity-50"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={
                loading || !allRequirementsMet || !passwordsMatch || !newPassword
              }
              className="flex-1 py-4 rounded-[10px] bg-[#0066cc] text-white font-semibold shadow-md disabled:opacity-30"
            >
              {loading ? "SALVANDO..." : "SALVAR"}
            </button>
          </div>
        </form>
      </div>,
    );
  }

  if (step === "token") {
    return shell(
      <div className="card-base rounded-[10px] w-full p-8 space-y-5">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[#006eb4]/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-11 h-11 text-[#006eb4]" />
          </div>
        </div>
        <h2 className="text-center text-[#006eb4] font-bold text-[20px]">
          Token enviado com sucesso
        </h2>
        <p className="text-center text-[#4b5563] text-[15px] leading-snug">
          Insira abaixo o token de 6 dígitos que foi enviado para o e-mail{" "}
          <span className="font-semibold text-[#006eb4]">{maskedDestination}</span>.
        </p>
        <p className="text-center text-[#717171] text-[14px]">
          Verifique sua caixa de spam
        </p>

        <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                otpRefs.current[i] = el;
              }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-10 h-12 text-center text-xl font-semibold rounded-[8px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none"
            />
          ))}
        </div>

        {tokenError ? (
          <p className="text-red-600 text-center text-sm">
            token inválido ou expirado
          </p>
        ) : null}
        {resendNotice ? (
          <p className="text-green-600 text-center text-sm">novo token enviado</p>
        ) : null}

        <button
          type="button"
          onClick={handleResend}
          disabled={resendSeconds > 0}
          className="w-full text-[#006eb4] font-bold text-[14px] py-2 disabled:opacity-50"
        >
          {resendSeconds > 0
            ? `Solicitar novo token - aguarde (${resendSeconds}s)`
            : "Solicitar novo token"}
        </button>

        <button
          type="button"
          onClick={handleTokenConfirm}
          className="w-full py-4 rounded-[10px] bg-[#0066cc] text-white font-semibold shadow-md text-[18px]"
        >
          Confirmar
        </button>

        {import.meta.env.DEV ? (
          <p className="text-center text-[12px] text-[#9ca3af]">
            Dev: token válido <strong className="text-[#006eb4]">123456</strong>
          </p>
        ) : null}
      </div>,
    );
  }

  return shell(
    <div className="card-base rounded-[10px] w-full p-8">
      <h2 className="mb-6 text-[#006eb4] font-bold text-[22px] text-center">
        Esqueci minha senha
      </h2>
      <form onSubmit={handleIdentifierSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="identifier"
            autoComplete="username"
            placeholder="Digite seu Id ou e-mail cadastrado"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-3 rounded-[10px] border border-gray-300 focus:border-[#006eb4] focus:ring-2 focus:ring-[#006eb4]/10 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!identifier.trim()}
          className="w-full py-4 rounded-[10px] bg-[#0066cc] text-white font-semibold shadow-md text-[18px] disabled:opacity-30"
        >
          Confirmar
        </button>
      </form>
    </div>,
  );
}
