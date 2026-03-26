import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import logoImage from 'figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

export function ActivationSuccess() {
  const navigate = useNavigate();

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

      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      
      <div className="text-center space-y-4 mb-8">
        <h1 className="font-bold text-gray-800 text-[20px]">ACESSO ATIVADO!</h1>
        <p className="text-gray-600 text-lg">Seu acesso foi ativado com sucesso.</p>
      </div>

      <Button fullWidth onClick={() => navigate('/brand-selection')}>
        CONTINUAR
      </Button>
    </div>
  );
}