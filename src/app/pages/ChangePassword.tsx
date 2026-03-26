import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Eye, EyeOff, CheckCircle, AlertCircle, Check, X, Lock, ShieldCheck } from 'lucide-react';
import backgroundImage from 'figma:asset/ca44b9278ade571ce23c788ab07a7af85c0382b9.png';

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
  met: boolean;
}

export function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Auto-retorno após 3 segundos quando showSuccess for true
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/profile');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  // Password requirements validation
  const requirements: PasswordRequirement[] = [
    {
      label: 'Mínimo de 8 caracteres',
      validator: (password) => password.length >= 8,
      met: formData.newPassword.length >= 8,
    },
    {
      label: 'Pelo menos uma letra maiúscula',
      validator: (password) => /[A-Z]/.test(password),
      met: /[A-Z]/.test(formData.newPassword),
    },
    {
      label: 'Pelo menos uma letra minúscula',
      validator: (password) => /[a-z]/.test(password),
      met: /[a-z]/.test(formData.newPassword),
    },
    {
      label: 'Pelo menos um número',
      validator: (password) => /[0-9]/.test(password),
      met: /[0-9]/.test(formData.newPassword),
    },
    {
      label: 'Pelo menos um caractere especial (!@#$%^&*)',
      validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  // Calculate password strength
  const getPasswordStrength = () => {
    const metRequirements = requirements.filter((req) => req.met).length;
    if (metRequirements === 0) return { label: '', color: '' };
    if (metRequirements <= 2) return { label: 'Fraca', color: '#ef4444' };
    if (metRequirements <= 4) return { label: 'Média', color: '#fbbf24' };
    return { label: 'Forte', color: '#10b981' };
  };

  const strength = getPasswordStrength();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mark all fields as touched
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    // Validate current password is not empty
    if (!formData.currentPassword) {
      setError('Por favor, digite sua senha atual');
      return;
    }

    // Validate all requirements are met
    if (!allRequirementsMet) {
      setError('A nova senha não atende a todos os requisitos de segurança');
      return;
    }

    // Validate passwords match
    if (!passwordsMatch) {
      setError('As senhas não coincidem');
      return;
    }

    // Validate new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      setError('A nova senha deve ser diferente da senha atual');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In production, verify current password with backend
      // For now, simulate a check
      const isCurrentPasswordCorrect = true; // This would come from API

      if (!isCurrentPasswordCorrect) {
        setError('Senha atual incorreta');
        setLoading(false);
        return;
      }

      // Success
      setLoading(false);
      setShowSuccess(true);

      // Redirect after success (handled by useEffect now)
    }, 1500);
  };

  const isFormValid = 
    formData.currentPassword && 
    allRequirementsMet && 
    passwordsMatch &&
    formData.confirmPassword;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header pageTitle="ALTERAR SENHA" />

      <div className="p-4 max-w-2xl mx-auto pb-6">
        {/* Security Info Card */}
        <div className="card-base p-5 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#006EB4]/10 to-[#00509E]/10 rounded-sm flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#006EB4]" />
          </div>
          <div>
            <h2 className="font-bold text-[#006EB4] mb-1 text-[18px]">Segurança da sua conta</h2>
            <p className="text-auxiliary text-[#717171] text-[16px] font-bold">
              Escolha uma senha forte e única para proteger seus dados
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="card-base p-4 mb-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-[15px]">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[20px]">
              Senha Atual *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                placeholder="Digite sua senha atual"
                value={formData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                onBlur={() => handleBlur('currentPassword')}
                required
                className="w-full text-[#006EB4] bg-transparent border-none outline-none placeholder:text-gray-300 text-[16px] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#717171] hover:text-[#006EB4] transition-colors"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.currentPassword && !formData.currentPassword && (
              <p className="text-red-600 text-[13px] mt-2 flex items-center gap-1">
                <X className="w-3.5 h-3.5" />
                Campo obrigatório
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[20px]">
              Nova Senha *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                onBlur={() => handleBlur('newPassword')}
                required
                className="w-full text-[#006EB4] bg-transparent border-none outline-none placeholder:text-gray-300 font-medium pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#717171] hover:text-[#006EB4] transition-colors"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] text-[#717171]">Força da senha:</span>
                  <span 
                    className="text-[13px] font-semibold"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ 
                      width: `${(requirements.filter(r => r.met).length / requirements.length) * 100}%`,
                      backgroundColor: strength.color 
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Password Requirements */}
          {formData.newPassword && (
            <div className="card-base p-5">
              <h3 className="font-semibold text-[#006EB4] mb-3 text-[15px]">Requisitos de Segurança</h3>
              <div className="space-y-2">
                {requirements.map((req, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-2 text-[14px] transition-colors ${
                      req.met ? 'text-[#10b981]' : 'text-[#717171]'
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
          )}

          {/* Confirm Password */}
          <div className="card-base p-5">
            <label className="block font-medium text-[#006EB4] mb-2 text-[20px]">
              Confirmar Nova Senha *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                placeholder="Digite novamente sua nova senha"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                required
                className="w-full text-[#006EB4] bg-transparent border-none outline-none placeholder:text-gray-300 font-medium pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#717171] hover:text-[#006EB4] transition-colors"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.confirmPassword && formData.confirmPassword && !passwordsMatch && (
              <p className="text-red-600 text-[13px] mt-2 flex items-center gap-1">
                <X className="w-3.5 h-3.5" />
                As senhas não coincidem
              </p>
            )}
            {touched.confirmPassword && formData.confirmPassword && passwordsMatch && (
              <p className="text-[#10b981] text-[13px] mt-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                As senhas coincidem
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              disabled={loading}
              className="flex-1 py-4 px-6 rounded-[10px] border-2 border-[#006EB4] text-[#006EB4] font-semibold hover:bg-[#006EB4]/5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="flex-1 py-4 px-6 rounded-[10px] bg-gradient-to-r from-[#006EB4] to-[#00509E] text-white font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'ALTERANDO...' : 'ALTERAR SENHA'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[10px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#006eb4] mb-2">
                Senha alterada com sucesso!
              </h3>
              <p className="text-[#717171] mb-1">
                Sua senha foi atualizada com segurança
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}