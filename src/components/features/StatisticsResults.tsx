import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Globe, DollarSign } from 'lucide-react';

interface StatisticsResultsProps {
  data: any;
  type: 'general' | 'religion' | 'financial' | 'political' | 'person' | 'countries' | 'network' | 'unsdg' | 'education' | 'health' | 'environment' | 'crime' | 'labor';
}

export const StatisticsResults = ({ data, type }: StatisticsResultsProps) => {
  if (type === 'general' && data.data) {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant bg-gradient-to-br from-white via-white to-primary/5 dark:from-card dark:via-card dark:to-primary/10">
        <CardHeader className="bg-gradient-primary/10 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">📊 Statistical Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparing {data.country1} {data.country2 && `and ${data.country2}`}
              </p>
            </div>
            <BarChart3 className="h-12 w-12 text-primary/30" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {data.indicators.map((indicator: string, idx: number) => {
            const indicatorData = data.data[idx];
            if (!indicatorData || indicatorData.length === 0) return null;
            
            const latestData = indicatorData[0];
            const previousData = indicatorData[1];
            const trend = previousData ? 
              ((latestData.value - previousData.value) / previousData.value * 100).toFixed(2) : null;
            
            return (
              <div key={indicator} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{indicator}</h3>
                    <p className="text-sm text-muted-foreground">
                      {latestData.country} • {latestData.year}
                    </p>
                  </div>
                  {trend && (
                    <Badge variant={parseFloat(trend) > 0 ? 'default' : 'secondary'} className="ml-2">
                      {parseFloat(trend) > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(parseFloat(trend))}%
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                    <div className="text-2xl font-bold text-primary">
                      {latestData.value.toLocaleString()}
                    </div>
                  </div>
                  
                  {previousData && (
                    <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Previous ({previousData.year})
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">
                        {previousData.value.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-2">Data Source</p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer">
                <Globe className="h-3 w-3 mr-2" />
                World Bank Open Data
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'religion' && data.data) {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardTitle className="text-2xl">🕉️ Religious Demographics Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.religions.join(' vs ')} • {data.country}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {Object.entries(data.data.population).map(([religion, population]: [string, any]) => (
            <div key={religion} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">{religion}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Population</div>
                  <div className="text-xl font-bold">{population.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Growth Rate</div>
                  <div className="text-xl font-bold">{data.data.growthRate[religion]}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Distribution</div>
                  <div className="text-sm font-medium">{data.data.distribution[religion]}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (type === 'financial') {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant">
        <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Financial Power Comparison
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.entities.join(' vs ')} • {data.metric} ({data.year})
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {data.data.map((entity: any) => (
            <div key={entity.name} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">{entity.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Value</div>
                  <div className="text-xl font-bold">${(entity.value / 1e9).toFixed(1)}B</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Global Rank</div>
                  <div className="text-xl font-bold">#{entity.rank}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Growth</div>
                  <div className="text-xl font-bold text-green-600">{entity.growth}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
                  <div className="text-lg font-bold">${(entity.marketCap / 1e9).toFixed(1)}B</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (type === 'political') {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
          <CardTitle className="text-2xl">🏛️ Political Party Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.parties.join(' vs ')} • {data.country}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {data.comparison.map((party: any) => (
            <div key={party.name} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">{party.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Founded</div>
                  <div className="text-xl font-bold">{party.founded}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Ideology</div>
                  <div className="text-xl font-bold">{party.ideology}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Seats</div>
                  <div className="text-xl font-bold">{party.seats}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Vote Share</div>
                  <div className="text-xl font-bold">{party.voteshare}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Key Policies</div>
                <div className="flex flex-wrap gap-2">
                  {party.keyPolicies.map((policy: string) => (
                    <Badge key={policy} variant="secondary">{policy}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (type === 'person') {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant">
        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <CardTitle className="text-2xl">👤 Person Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.people.join(' vs ')} • {data.aspect}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {data.comparison.map((person: any) => (
            <div key={person.name} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">{person.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Net Worth</div>
                  <div className="text-xl font-bold">{person.netWorth}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Age</div>
                  <div className="text-xl font-bold">{person.age}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Industry</div>
                  <div className="text-lg font-bold">{person.industry}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Companies</div>
                  <div className="text-xl font-bold">{person.companies}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Influence Score</div>
                  <div className="text-xl font-bold">{person.influence}/100</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Achievements</div>
                <div className="flex flex-wrap gap-2">
                  {person.achievements.map((achievement: string) => (
                    <Badge key={achievement} variant="secondary">{achievement}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (type === 'countries' && data.countries) {
    return (
      <Card className="overflow-hidden border-0 shadow-elegant">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <CardTitle className="text-2xl">🌍 Countries Comparison</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {data.countries.map((country: any) => (
            <div key={country.name} className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <img src={country.flag} alt={country.name} className="w-16 h-12 object-cover rounded shadow-md" />
                <div>
                  <h3 className="font-semibold text-lg">{country.name}</h3>
                  <p className="text-sm text-muted-foreground">{country.officialName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Capital</div>
                  <div className="text-sm font-bold">{country.capital}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Population</div>
                  <div className="text-sm font-bold">{country.population.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Area (km²)</div>
                  <div className="text-sm font-bold">{country.area.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Region</div>
                  <div className="text-sm font-bold">{country.region}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg col-span-2">
                  <div className="text-xs text-muted-foreground mb-1">Languages</div>
                  <div className="text-sm font-medium">{country.languages}</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg col-span-2">
                  <div className="text-xs text-muted-foreground mb-1">Currencies</div>
                  <div className="text-sm font-medium">{country.currencies}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // For all other new statistics types, use a generic display format
  if (['network', 'unsdg', 'education', 'health', 'environment', 'crime', 'labor'].includes(type)) {
    const typeNames: Record<string, string> = {
      network: '📡 Internet & Network Statistics',
      unsdg: '🌐 UN Sustainable Development Goals',
      education: '🎓 Education Statistics',
      health: '⚕️ Health Statistics',
      environment: '🌿 Environmental Data',
      crime: '🛡️ Crime & Safety Statistics',
      labor: '💼 Labor & Employment Data'
    };

    return (
      <Card className="overflow-hidden border-0 shadow-elegant bg-gradient-to-br from-white via-white to-primary/5 dark:from-card dark:via-card dark:to-primary/10">
        <CardHeader className="bg-gradient-primary/10 border-b border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{typeNames[type]}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Comparing {data.country1 || data.countries?.[0]} {data.country2 && `and ${data.country2}`}
              </p>
            </div>
            <BarChart3 className="h-12 w-12 text-primary/30" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {data.indicators && data.indicators.map((indicator: string, idx: number) => {
            const indicatorData = data.data[idx];
            if (!indicatorData || indicatorData.length === 0) return null;
            
            const latestData = indicatorData[0];
            const previousData = indicatorData[1];
            
            return (
              <div key={indicator} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{indicator}</h3>
                    <p className="text-sm text-muted-foreground">
                      {latestData.country} • {latestData.year}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                    <div className="text-2xl font-bold text-primary">
                      {latestData.value.toLocaleString()}
                    </div>
                  </div>
                  
                  {previousData && (
                    <div className="p-3 bg-white/50 dark:bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Previous ({previousData.year})
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">
                        {previousData.value.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-2">Data Source</p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer">
                <Globe className="h-3 w-3 mr-2" />
                World Bank & UN Data
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
