import { X, Bell, TrendingUp, Package, Store, AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type NotificationType = 'success' | 'info' | 'warning' | 'alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Meta alcançada!',
    message: 'Você atingiu 120% da meta de vendas do produto Dipirona 500mg na loja Drogasmil Centro.',
    time: 'há 5 min',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Novo produto disponível',
    message: 'O produto Ibuprofeno 600mg está disponível para pedido em 15 lojas da rede.',
    time: 'há 1 hora',
    read: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Estoque baixo',
    message: 'Atenção: O produto Paracetamol 750mg está com estoque crítico em 3 lojas.',
    time: 'há 2 horas',
    read: false
  },
  {
    id: '4',
    type: 'alert',
    title: 'Atualização necessária',
    message: 'Seus dados de contato precisam ser atualizados. Acesse seu perfil.',
    time: 'há 3 horas',
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Relatório disponível',
    message: 'O relatório mensal de vendas de janeiro está disponível para download.',
    time: 'há 5 horas',
    read: true
  },
  {
    id: '6',
    type: 'success',
    title: 'Sugestão aprovada',
    message: 'Sua sugestão de produto para a loja Farmalife foi aprovada pela equipe.',
    time: 'há 1 dia',
    read: true
  },
  {
    id: '7',
    type: 'info',
    title: 'Nova mensagem',
    message: 'Você recebeu uma nova mensagem da equipe de suporte sobre sua última solicitação.',
    time: 'há 2 dias',
    read: true
  }
];

const notificationConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-[#10b981]/10',
    iconColor: 'text-[#10b981]',
    borderColor: 'border-l-[#10b981]'
  },
  info: {
    icon: Package,
    bgColor: 'bg-[#006eb4]/10',
    iconColor: 'text-[#006eb4]',
    borderColor: 'border-l-[#006eb4]'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-[#fbbf24]/10',
    iconColor: 'text-[#fbbf24]',
    borderColor: 'border-l-[#fbbf24]'
  },
  alert: {
    icon: Bell,
    bgColor: 'bg-[#ef4444]/10',
    iconColor: 'text-[#ef4444]',
    borderColor: 'border-l-[#ef4444]'
  }
};

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-[#0066cc] px-6 py-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Notificações</p>
                {unreadCount > 0 && (
                  <p className="text-white/80 text-sm">{unreadCount} não lidas</p>
                )}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] px-4 py-4 space-y-3">
          {mockNotifications.map((notification) => {
            const config = notificationConfig[notification.type];
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                className={`p-4 rounded-[10px] border-l-4 ${config.borderColor} ${
                  notification.read ? 'bg-white' : 'bg-[#F7F9FC]'
                } shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.98]`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-[#006eb4] text-sm">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#006eb4] rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-sm text-[#717171] leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[#717171]/70">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-[10px] bg-[#F7F9FC] text-[#006eb4] font-semibold hover:bg-[#006eb4] hover:text-white transition-all active:scale-95"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>
    </>
  );
}