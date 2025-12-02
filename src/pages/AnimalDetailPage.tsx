import { useParams, useNavigate } from 'react-router-dom';
import { mockAnimals } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AnimalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = mockAnimals.find(a => a.id === id);

  if (!animal) {
    return (
      <div className="min-h-screen p-4 pt-6 flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <Icon name="PawPrint" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">Животное не найдено</h2>
          <Button onClick={() => navigate('/animals')}>Вернуться к списку</Button>
        </Card>
      </div>
    );
  }

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'не опасен':
        return 'bg-mountain-green/20 text-mountain-green border-mountain-green/40';
      case 'потенциально опасен':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/40';
      case 'опасен':
        return 'bg-orange-500/20 text-orange-600 border-orange-500/40';
      case 'очень опасен':
        return 'bg-emergency-red/20 text-emergency-red border-emergency-red/40';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/animals')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div 
          className="h-64 md:h-96 rounded-lg bg-cover bg-center mb-6 animate-fade-in"
          style={{ backgroundImage: `url(${animal.image})` }}
        />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-mountain-green mb-3">{animal.name}</h1>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDangerColor(animal.danger)}`}>
              ⚠️ {animal.danger.toUpperCase()}
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-muted text-muted-foreground">
              {animal.type}
            </span>
          </div>
        </div>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="FileText" size={24} className="text-mountain-green" />
            Описание
          </h2>
          <p className="text-muted-foreground whitespace-pre-line">{animal.detailedDescription}</p>
        </Card>

        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Calendar" size={24} className="text-sky-blue" />
            Сезон активности
          </h2>
          <p className="text-muted-foreground">{animal.activeSeason}</p>
        </Card>

        <Card className={`glass-card p-6 border-2 animate-fade-in ${getDangerColor(animal.danger)}`}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="ShieldAlert" size={24} />
            Действия при встрече
          </h2>
          <p className="whitespace-pre-line font-medium">{animal.encounterAction}</p>
        </Card>

        <Card className="glass-card p-6 mt-6 bg-sky-blue/10 border-sky-blue/40 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Info" size={24} className="text-sky-blue" />
            Важно помнить
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Не кормите диких животных</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Держите дистанцию и наблюдайте издалека</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Не приближайтесь к детенышам</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Храните еду в герметичных контейнерах</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>При опасности звоните 112</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
