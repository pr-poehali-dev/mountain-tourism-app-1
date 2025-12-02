import { mockSafetyArticles } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const SafetyPage = () => {
  const firstAidArticles = mockSafetyArticles.filter(a => a.category === 'firstAid');
  const survivalArticles = mockSafetyArticles.filter(a => a.category === 'survival');

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-mountain-green mb-2">Безопасность</h1>
        <p className="text-muted-foreground mb-6">Первая помощь и выживание в горах</p>

        <Card className="glass-card p-6 mb-6 bg-emergency-red/10 border-emergency-red/40 animate-fade-in">
          <div className="flex items-start gap-3">
            <Icon name="Phone" size={32} className="text-emergency-red flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">Экстренные службы</h2>
              <p className="text-lg font-bold text-emergency-red mb-1">112 - Единый номер экстренных служб</p>
              <p className="text-sm text-muted-foreground">
                Работает даже без сети и SIM-карты. Назовите ваши координаты и опишите ситуацию.
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="firstAid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="firstAid" className="flex items-center gap-2">
              <Icon name="Cross" size={18} />
              Первая помощь
            </TabsTrigger>
            <TabsTrigger value="survival" className="flex items-center gap-2">
              <Icon name="Tent" size={18} />
              Выживание
            </TabsTrigger>
          </TabsList>

          <TabsContent value="firstAid">
            <Card className="glass-card p-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                {firstAidArticles.map((article, index) => (
                  <AccordionItem key={article.id} value={article.id}>
                    <AccordionTrigger className="text-left hover:text-mountain-green">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emergency-red/20 text-emergency-red font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-semibold">{article.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 pt-2">
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="survival">
            <Card className="glass-card p-6 animate-fade-in">
              <Accordion type="single" collapsible className="w-full">
                {survivalArticles.map((article, index) => (
                  <AccordionItem key={article.id} value={article.id}>
                    <AccordionTrigger className="text-left hover:text-mountain-green">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-mountain-green/20 text-mountain-green font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-semibold">{article.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 pt-2">
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="glass-card p-6 mt-6 bg-sky-blue/10 border-sky-blue/40 animate-fade-in">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="Info" size={24} className="text-sky-blue" />
            Общие правила безопасности
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Всегда сообщайте кому-то о своем маршруте и времени возвращения</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Берите с собой аптечку первой помощи</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Изучите маршрут заранее и проверьте прогноз погоды</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Заряженный телефон и powerbank обязательны</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Запас воды и еды всегда должен быть больше расчетного</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Одевайтесь слоями - погода в горах меняется быстро</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-mountain-green mt-1" />
              <span>Не переоценивайте свои силы - разворот не поражение</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SafetyPage;
