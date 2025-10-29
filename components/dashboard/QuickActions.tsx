'use client'

export function QuickActions() {
  const actions = [
    {
      id: 'work',
      title: '💼 Work',
      subtitle: 'Janitor • $50/hr',
      energyCost: 20
    },
    {
      id: 'study',
      title: '📚 Study',
      subtitle: 'Math 101',
      energyCost: 10
    },
    {
      id: 'train',
      title: '💪 Train',
      subtitle: 'Gym • Strength +1',
      energyCost: 15
    }
  ]

  const crimes = [
    { name: 'Pickpocket', energy: 10, reward: '$50-200', success: 95 },
    { name: 'Shoplifting', energy: 15, reward: '$200-500', success: 90 },
    { name: 'Car Theft', energy: 25, reward: '$1K-5K', success: 75 },
    { name: 'House Robbery', energy: 30, reward: '$5K-20K', success: 60 },
    { name: 'Bank Heist', energy: 50, reward: '$50K-200K', success: 40 }
  ]

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="ls-section">
        <div className="ls-section-header">Quick Actions</div>
        <div className="ls-section-content space-y-2">
          {actions.map((action) => (
            <div key={action.id} className="ls-action-item">
              <div className="ls-action-info">
                <div className="ls-action-title">{action.title}</div>
                <div className="ls-action-details">
                  <span>{action.subtitle}</span>
                  <span className="text-warning">-{action.energyCost} Energy</span>
                </div>
              </div>
              <button className="ls-btn ls-btn-primary">START</button>
            </div>
          ))}
        </div>
      </div>

      {/* Crimes */}
      <div className="ls-section">
        <div className="ls-section-header">Commit Crime</div>
        <div className="ls-section-content">
          <table className="ls-table">
            <thead>
              <tr>
                <th>Crime</th>
                <th>Energy</th>
                <th>Reward</th>
                <th>Success</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {crimes.map((crime, index) => (
                <tr key={index}>
                  <td>{crime.name}</td>
                  <td className="text-warning">-{crime.energy}</td>
                  <td className="text-success">{crime.reward}</td>
                  <td className={crime.success >= 70 ? 'text-success' : 'text-warning'}>
                    {crime.success}%
                  </td>
                  <td>
                    <button className="ls-btn ls-btn-danger">GO</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}