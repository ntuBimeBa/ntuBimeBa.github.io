const TabSwitcher = ({ tabs, activeKey, onTabChange }) => (
  <div className="flex justify-center space-x-4">
    {tabs.map(tab => (
      <button
        key={tab.key}
        className={`px-4 py-2 font-semibold border-b-2 ${tab.key === activeKey ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
        onClick={() => onTabChange(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabSwitcher;
