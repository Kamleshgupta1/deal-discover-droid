export const HomeStats = () => {
  const stats = [
    { value: '10M+', label: 'Happy Users', color: 'text-white' },
    { value: '500+', label: 'Platforms', color: 'text-white/90' },
    { value: '25+', label: 'Categories', color: 'text-white/90' },
    { value: '99.9%', label: 'Uptime', color: 'text-white' }
  ];

  return (
    <div className="bg-gradient-primary rounded-3xl p-8 text-white text-center shadow-elegant">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Trusted by Millions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="space-y-2"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-white/80 text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};