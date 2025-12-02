import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockRoutes } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const RoutesPage = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [durationFrom, setDurationFrom] = useState<string>('');
  const [durationTo, setDurationTo] = useState<string>('');

  const filteredRoutes = mockRoutes.filter(route => {
    const difficultyMatch = difficultyFilter === 'all' || route.difficulty === parseInt(difficultyFilter);
    const typeMatch = typeFilter === 'all' || route.type === typeFilter;
    
    const durationFromNum = durationFrom ? parseFloat(durationFrom) : 0;
    const durationToNum = durationTo ? parseFloat(durationTo) : Infinity;
    const durationMatch = route.duration >= durationFromNum && route.duration <= durationToNum;
    
    return difficultyMatch && typeMatch && durationMatch;
  });

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-mountain-green mb-6">Маршруты</h1>

        <Card className="glass-card p-4 mb-6 animate-fade-in">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Фильтры
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Сложность</Label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="1">⭐ Легкий</SelectItem>
                  <SelectItem value="2">⭐⭐ Простой</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ Средний</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ Сложный</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ Очень сложный</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Тип маршрута</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="кольцевой">Кольцевой</SelectItem>
                  <SelectItem value="линейный">Линейный</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Продолжительность от (часов)</Label>
              <Input
                type="number"
                placeholder="0"
                value={durationFrom}
                onChange={(e) => setDurationFrom(e.target.value)}
                min="0"
              />
            </div>

            <div>
              <Label>Продолжительность до (часов)</Label>
              <Input
                type="number"
                placeholder="24"
                value={durationTo}
                onChange={(e) => setDurationTo(e.target.value)}
                min="0"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((route, index) => (
            <Link
              key={route.id}
              to={`/routes/${route.id}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Card className="glass-card overflow-hidden hover:scale-105 transition-all cursor-pointer">
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
              </Card>
            </Link>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <Card className="glass-card p-8 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Маршруты не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoutesPage;
