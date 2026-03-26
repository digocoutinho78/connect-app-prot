import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/Input';
import logoImage from 'figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

export function ActivationExpired() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleRequestCode = () => {
    setShowCodeInput(true);
    setCode('');
    setError('');
  };

  const handleActivate = () => {
    if (!code || code.length !== 6) {
      setError('Código de ativação incorreto');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/activation-success');
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <img 
        src={logoImage}
        alt="Rede d1000"
        className="w-64 h-auto mb-8"
      />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="font-bold text-gray-800 uppercase text-[20px]">
            Seu acesso está expirado
          </h1>
          <p className="text-gray-600">
            {!showCodeInput 
              ? 'Clique no botão abaixo e solicite um novo código de ativação.'
              : 'Digite abaixo o código que você recebeu no email cadastrado.'}
          </p>
        </div>

        {!showCodeInput ? (
          <button
            type="button"
            onClick={handleRequestCode}
            className="w-full py-4 px-6 rounded-[10px] bg-[#0066cc] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md text-[18px]"
          >
            SOLICITAR CÓDIGO
          </button>
        ) : (
          <>
            <Input
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />

            <button
              type="button"
              onClick={handleActivate}
              disabled={loading}
              className="w-full py-4 px-6 rounded-[10px] bg-[#0066cc] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md text-[18px]"
            >
              {loading ? "Ativando..." : "ATIVAR"}
            </button>

            {error && (
              <p className="text-red-500 text-center text-sm italic">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}