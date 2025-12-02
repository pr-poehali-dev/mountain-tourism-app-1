import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

const HomePage = () => {
  const handleEmergencyCall = () => {
    window.location.href = 'tel:112';
  };

  const sections = [
    { path: '/routes', icon: 'Mountain', label: 'Маршруты', color: 'text-mountain-green' },
    { path: '/animals', icon: 'PawPrint', label: 'Животные', color: 'text-earth-brown' },
    { path: '/safety', icon: 'ShieldCheck', label: 'Безопасность', color: 'text-sky-blue' },
    { path: '/favorites', icon: 'Star', label: 'Избранное', color: 'text-accent' }
  ];

  return (
    <div 
      className="min-h-screen p-4 pt-6 bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(https://cdn.poehali.dev/projects/789cfedd-2e12-4572-a1ee-a892e56fc4a5/files/043f43dc-07cc-4ef3-9242-ee1867fb2226.jpg)` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      <div className="max-w-screen-xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-mountain-green mb-2">Горный туризм</h1>
        <p className="text-muted-foreground mb-8">Краснодарский край</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="CloudSun" size={32} className="text-sky-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Погода</p>
                <p className="text-2xl font-bold">+18°C</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Ясно, ветер 3 м/с</p>
          </Card>

          <Card 
            className="glass-card p-6 bg-emergency-red/20 border-emergency-red/40 cursor-pointer hover:scale-105 transition-transform animate-fade-in"
            onClick={handleEmergencyCall}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Icon name="Phone" size={32} className="text-emergency-red" />
              <p className="font-bold text-emergency-red text-center">Экстренный вызов 112</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <Link
              key={section.path}
              to={section.path}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="glass-card p-6 hover:scale-105 transition-all cursor-pointer h-32 flex flex-col items-center justify-center gap-3">
                <Icon name={section.icon as any} size={40} className={section.color} />
                <p className="font-semibold text-lg">{section.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 glass-card p-6 rounded-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Info" size={24} className="text-sky-blue" />
            Важная информация
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Всегда сообщайте близким о маршруте и времени возвращения</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Проверьте прогноз погоды перед выходом</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Берите с собой заряженный телефон и powerbank</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Не ходите в одиночку на сложные маршруты</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;