import { useParams, useNavigate } from 'react-router-dom';
import { mockRoutes } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const RouteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const route = mockRoutes.find(r => r.id === id);

  if (!route) {
    return (
      <div className="min-h-screen p-4 pt-6 flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <Icon name="MapOff" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">Маршрут не найден</h2>
          <Button onClick={() => navigate('/routes')}>Вернуться к маршрутам</Button>
        </Card>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRoutes') || '[]');
    const isFavorite = favorites.includes(route.id);
    
    if (isFavorite) {
      const newFavorites = favorites.filter((fId: string) => fId !== route.id);
      localStorage.setItem('favoriteRoutes', JSON.stringify(newFavorites));
      toast({ title: 'Удалено из избранного' });
    } else {
      favorites.push(route.id);
      localStorage.setItem('favoriteRoutes', JSON.stringify(favorites));
      toast({ title: 'Добавлено в избранное' });
    }
  };

  const isFavorite = JSON.parse(localStorage.getItem('favoriteRoutes') || '[]').includes(route.id);

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/routes')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div 
          className="h-64 md:h-96 rounded-lg bg-cover bg-center mb-6 animate-fade-in"
          style={{ backgroundImage: `url(${route.image})` }}
        />

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-mountain-green mb-2">{route.name}</h1>
            <p className="text-muted-foreground">{route.description}</p>
          </div>
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="icon"
            onClick={handleFavoriteToggle}
            className="animate-scale-in"
          >
            <Icon name={isFavorite ? "Star" : "StarOff"} size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card p-4 text-center animate-fade-in">
            <Icon name="Star" size={24} className="mx-auto mb-2 text-yellow-500" />
            <p className="text-sm text-muted-foreground">Сложность</p>
            <p className="font-bold">{'⭐'.repeat(route.difficulty)}</p>
          </Card>
          <Card className="glass-card p-4 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Icon name="Route" size={24} className="mx-auto mb-2 text-mountain-green" />
            <p className="text-sm text-muted-foreground">Длина</p>
            <p className="font-bold">{route.length} км</p>
          </Card>
          <Card className="glass-card p-4 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-earth-brown" />
            <p className="text-sm text-muted-foreground">Набор высоты</p>
            <p className="font-bold">{route.elevation} м</p>
          </Card>
          <Card className="glass-card p-4 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Icon name="Clock" size={24} className="mx-auto mb-2 text-sky-blue" />
            <p className="text-sm text-muted-foreground">Время</p>
            <p className="font-bold">{route.duration} ч</p>
          </Card>
        </div>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="FileText" size={24} className="text-mountain-green" />
            Описание маршрута
          </h2>
          <p className="text-muted-foreground whitespace-pre-line">{route.detailedDescription}</p>
        </Card>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Backpack" size={24} className="text-earth-brown" />
            Необходимое снаряжение
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {route.equipment.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-mountain-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Bus" size={24} className="text-sky-blue" />
            Логистика
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Bus" size={18} />
                Общественный транспорт
              </h3>
              <p className="text-muted-foreground">{route.logistics.publicTransport}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Car" size={18} />
                На автомобиле
              </h3>
              <p className="text-muted-foreground">{route.logistics.car}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="MapPin" size={24} className="text-emergency-red" />
            Достопримечательности
          </h2>
          <ul className="space-y-2">
            {route.attractions.map((attraction, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-mountain-green" />
                <span>{attraction}</span>
              </li>
            ))}
          </ul>
        </Card>

        {route.gpxFile && (
          <Card className="glass-card p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Icon name="Download" size={24} className="text-sky-blue" />
              GPS-трек
            </h2>
            <p className="text-muted-foreground mb-4">
              Скачайте GPX-файл для навигации на маршруте
            </p>
            <Button asChild>
              <a href={route.gpxFile} download>
                <Icon name="Download" size={18} className="mr-2" />
                Скачать GPX
              </a>
            </Button>
          </Card>
        )}

        {route.mapImage && (
          <Card className="glass-card p-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Icon name="Map" size={24} className="text-mountain-green" />
              Карта маршрута
            </h2>
            <img 
              src={route.mapImage} 
              alt="Карта маршрута" 
              className="w-full rounded-lg"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default RouteDetailPage;
