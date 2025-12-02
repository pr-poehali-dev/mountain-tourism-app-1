import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAnimals } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const AnimalsPage = () => {
  const [dangerFilter, setDangerFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredAnimals = mockAnimals.filter(animal => {
    const dangerMatch = dangerFilter === 'all' || animal.danger === dangerFilter;
    const typeMatch = typeFilter === 'all' || animal.type === typeFilter;
    return dangerMatch && typeMatch;
  });

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'не опасен':
        return 'bg-mountain-green/20 text-mountain-green';
      case 'потенциально опасен':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'опасен':
        return 'bg-orange-500/20 text-orange-600';
      case 'очень опасен':
        return 'bg-emergency-red/20 text-emergency-red';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-mountain-green mb-6">Животные Кавказа</h1>

        <Card className="glass-card p-4 mb-6 animate-fade-in">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Фильтры
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Уровень опасности</Label>
              <Select value={dangerFilter} onValueChange={setDangerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="не опасен">Не опасен</SelectItem>
                  <SelectItem value="потенциально опасен">Потенциально опасен</SelectItem>
                  <SelectItem value="опасен">Опасен</SelectItem>
                  <SelectItem value="очень опасен">Очень опасен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Тип животного</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="зверь">Зверь</SelectItem>
                  <SelectItem value="птица">Птица</SelectItem>
                  <SelectItem value="рептилия">Рептилия</SelectItem>
                  <SelectItem value="насекомое">Насекомое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimals.map((animal, index) => (
            <Link
              key={animal.id}
              to={`/animals/${animal.id}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Card className="glass-card overflow-hidden hover:scale-105 transition-all cursor-pointer">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${animal.image})` }}
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{animal.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDangerColor(animal.danger)}`}>
                      {animal.danger}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                      {animal.type}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {animal.shortDescription}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <Card className="glass-card p-8 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Животные не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnimalsPage;
