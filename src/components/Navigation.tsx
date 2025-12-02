import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: 'Home', label: 'Главная' },
    { path: '/routes', icon: 'Mountain', label: 'Маршруты' },
    { path: '/animals', icon: 'PawPrint', label: 'Животные' },
    { path: '/safety', icon: 'ShieldCheck', label: 'Безопасность' },
    { path: '/favorites', icon: 'Star', label: 'Избранное' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive 
                  ? 'text-mountain-green scale-110' 
                  : 'text-muted-foreground hover:text-foreground hover:scale-105'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
