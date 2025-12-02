import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockRoutes } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favoriteRoutes') || '[]');
    setFavoriteIds(stored);
  }, []);

  const favoriteRoutes = mockRoutes.filter(route => favoriteIds.includes(route.id));

  const handleRemoveFavorite = (routeId: string) => {
    const newFavorites = favoriteIds.filter(id => id !== routeId);
    setFavoriteIds(newFavorites);
    localStorage.setItem('favoriteRoutes', JSON.stringify(newFavorites));
    toast({ title: 'Удалено из избранного' });
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-mountain-green mb-2">Избранное</h1>
        <p className="text-muted-foreground mb-6">Ваши сохраненные маршруты</p>

        {favoriteRoutes.length === 0 ? (
          <Card className="glass-card p-8 text-center animate-fade-in">
            <Icon name="Star" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Нет избранных маршрутов</h2>
            <p className="text-muted-foreground mb-6">
              Добавьте маршруты в избранное, чтобы быстро находить их здесь
            </p>
            <Button asChild>
              <Link to="/routes">
                <Icon name="Mountain" size={20} className="mr-2" />
                Посмотреть маршруты
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteRoutes.map((route, index) => (
              <Card 
                key={route.id} 
                className="glass-card overflow-hidden animate-scale-in relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRemoveFavorite(route.id)}
                >
                  <Icon name="X" size={18} />
                </Button>

                <Link to={`/routes/${route.id}`}>
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${route.image})` }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{route.name}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500" />
                        {'⭐'.repeat(route.difficulty)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Route" size={16} />
                        {route.length} км
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="TrendingUp" size={16} />
                        {route.elevation} м
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {route.duration} ч
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm mb-3">
                      <span className={`px-2 py-1 rounded-full ${
                        route.type === 'кольцевой' 
                          ? 'bg-sky-blue/20 text-sky-blue' 
                          : 'bg-earth-brown/20 text-earth-brown'
                      }`}>
                        {route.type}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {route.description}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
